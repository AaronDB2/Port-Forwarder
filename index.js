const express = require("express");
const NodeCache = require("node-cache");

const cache = new NodeCache();

// Initialize web server 1
const app1 = express();

// Initialize web server 2
const app2 = express();

// Initialize web server 3
const app3 = express();

// Middleware for serving static files
app1.use(express.static("public1"));
app2.use(express.static("public2"));
app3.use(express.static("public3"));

// Handler method that sends responses and caches
const handler = (num) => (req, res) => {
  // Make a response
  const response = `Response from server ${num}`;

  // Check if there is a cached response with url and portnumber as key
  const cachedResponse = cache.get(req.headers.host);

  // Compare response and cachedResponse
  if (response !== cachedResponse) {
    console.log("Did not find cache key");
    // Set cache with url and port number as key
    cache.set(req.headers.host, response);
    res.setHeader("Cache-Control", "public, max-age=3600");

    // Send response as json
    res.json({ message: response });
  } else {
    console.log("Found cache key");
    // Send cachedResponse as json
    return res.json({ message: cachedResponse });
  }
};

// Handle GET requests
app1.get("*", handler(1));
app2.get("*", handler(2));
app3.get("*", handler(3));

// Start server on PORT 3000
app1.listen(3000, (err) => {
  err
    ? console.log("Failed to listen on PORT 3000")
    : console.log("Web Server " + "listening on PORT 3000");
});

// Start server on PORT 3001
app2.listen(3001, (err) => {
  err
    ? console.log("Failed to listen on PORT 3001")
    : console.log("Web Server " + "listening on PORT 3001");
});

// Start server on PORT 3002
app3.listen(3002, (err) => {
  err
    ? console.log("Failed to listen on PORT 3002")
    : console.log("Web Server " + "listening on PORT 3002");
});
