# REST API in Node.Js with Express using Mocha and Chai and Memory Cache

Created an back-end applcation that validates the query parameters and fetches the data using AXIOS API call. But the Rest API can handle one query parameter at a time, Performing multiple requests to the API and removing the duplicate entries. Testing the application using Mocha & Chai. Caching the API response using Memoy Cache in the server.

<ol>
  <li>An /api/posts route that handles the following query parameters:
    <ul>
      <li>tags (mandatory) : any number of comma-separated strings</li>
      <li>sortBy (optional) : one of 'id', 'reads', 'likes', 'popularity', defaults to 'id'</li>
      <li>direction (optional) : one of 'asc', 'desc', defaults to 'asc'</li>
  </ul>
   </li>
  <li>Error handling: Return an error message if:
    <ul>
      <li> tags parameter is missing</li>
      <li> sortBy or direction has an invalid value</li>
  </ul>
    </li>
  <li>Testing the application using Mocha Chai</li>
  <li>Caching the response using Memory Cache</li>
</ol>

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
