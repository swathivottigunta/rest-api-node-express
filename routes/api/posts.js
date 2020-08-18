const express = require('express');
const axios = require('axios');
const router = express.Router();
const mcache = require('memory-cache');

const validateQuery = (req, res, next) => {
  const sortByOptions = ['id', 'reads', 'likes', 'popularity'];
  const directonOptions = ['asc', 'desc'];
  const errorMsg = {
    tags: 'Tags parameter is required',
    sortBy: 'sortBy parameter is invalid',
    direction: 'direction parameter is invalid',
  };
  const errors = [];

  try {
    const { tags, sortBy, direction } = req.query;

    if (tags === undefined) errors.push(errorMsg.tags);
    if (sortBy && !sortByOptions.includes(sortBy.toLowerCase().trim(' ')))
      errors.push(errorMsg.sortBy);
    if (
      direction &&
      !directonOptions.includes(direction.toLowerCase().trim(' '))
    )
      errors.push(errorMsg.direction);

    if (errors.length == 1)
      return res
        .status(400)
        .type('json')
        .send(JSON.stringify({ error: errors[0] }, undefined, 2));
    else if (errors.length > 0)
      return res
        .status(400)
        .type('json')
        .send(JSON.stringify({ errors }, undefined, 2));

    next();
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const sortByDirection = (posts, sortBy, direction) => {
  if (direction === 'asc') return posts.sort((a, b) => a[sortBy] - b[sortBy]);
  else return posts.sort((a, b) => b[sortBy] - a[sortBy]);
};

const removeDuplicatePosts = (nRequests, ...allData) => {
  let posts = [],
    uniquePosts = [];

  for (i = 0; i < nRequests; i++) posts.push(...allData[i].data.posts);

  uniquePosts = posts.reduce(function (result, elem) {
    if (!result.some((o) => o.id === elem.id)) {
      result.push(elem);
    }
    return result;
  }, []);
  return uniquePosts;
};

const getPosts = (tagsArray, sortBy, direction, cacheKey, res) => {
  let promiseArray = [];
  let uniquePosts = [];
  let sortedPosts = [];

  tagsArray.forEach((tag) => {
    promiseArray.push(
      axios.get(`https://hatchways.io/api/assessment/blog/posts?tag=${tag}`)
    );
  });

  axios
    .all(promiseArray)
    .then(
      axios.spread((...allData) => {
        uniquePosts = removeDuplicatePosts(tagsArray.length, ...allData);

        // Set Data
        mcache.put(cacheKey, JSON.stringify(uniquePosts), 30000);

        sortedPosts = sortByDirection(uniquePosts, sortBy, direction);

        res
          .type('json')
          .send(JSON.stringify({ posts: sortedPosts }, undefined, 2));
      })
    )
    .catch(function (error) {
      res.status(500).send('Server Error');
    });
};

// @route  get api/posts
// @desc   posts
// @access public

router.get('/', validateQuery, (req, res) => {
  try {
    let tagsArray = [];

    // Query Parameters
    let { tags, sortBy, direction } = req.query;

    tagsArray = tags.split(',').map((tag) => tag.trim(' ').toLowerCase());
    tagsArray = tagsArray.sort();
    sortBy = sortBy ? sortBy.trim(' ').toLowerCase() : 'id';
    direction = direction ? direction.trim(' ').toLowerCase() : 'asc';

    //Get Data from cache
    const cacheKey = tagsArray.join('-');

    let cachedData = mcache.get(cacheKey);
    if (cachedData !== null) {
      let sortedPosts = [];
      sortedPosts = sortByDirection(JSON.parse(cachedData), sortBy, direction);

      return res
        .type('json')
        .send(JSON.stringify({ posts: sortedPosts }, undefined, 2));
    } else {
      // API CALL
      getPosts(tagsArray, sortBy, direction, cacheKey, res);
    }
  } catch (error) {
    res.send('Server Error');
  }
});

module.exports = router;
