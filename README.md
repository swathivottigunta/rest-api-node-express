# REST API in Node.Js with Express using Mocha and Chai and Memory Cache

Created an back-end applcation that validates the query parameters and fetches the data using AXIOS API call. But the Rest API can handle one query parameter at a time, Performing multiple requests to the API and removing the duplicate entries. Testing the application using Mocha & Chai. Caching the API response using Memoy Cache in the server.


1. An /api/posts route that handles the following query parameters:
  tags (mandatory) : any number of comma-separated strings
  sortBy (optional) : one of 'id', 'reads', 'likes', 'popularity', defaults to 'id'
  direction (optional) : one of 'asc', 'desc', defaults to 'asc'
2 Error handling: Return an error message if:
    tags parameter is missing
    sortBy or direction has an invalid value
3 Testing the application using Mocha Chai
4 Caching the response using Memory Cache

## Prerequisites
In order to run this project node.js and npm both need to have been installed.

## Dependencies
"axios": "^0.19.2",
"chai-http": "^4.3.0",
"express": "^4.17.1",
"memory-cache": "^0.2.0"

## Dev Dependencies
"chai": "^4.2.0",
"mocha": "^8.1.1",
"nodemon": "^2.0.4"

## Deployment
<ol>
<li>To run the application - npm run server</li>
<li>http://localhost/api/posts?tags=health,tech&sortBy=id&direction=desc</li>
<li>To test the application - npm test</li>
</ol>
