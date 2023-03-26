const express = require("express");
const morgan = require("morgan");
const NodeCache = require("node-cache");

const cache = new NodeCache();

// Make app instance
const app = express();

// Middleware for logging
app.use(morgan("dev"));

// Web servers for the loadbalancer to use
const webServers = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

// Track current web server for sending requests
let current = 0;

// Forward to web server
const handler = async (req, res) => {
  // Destruct properties from request body
  const { method, url, headers, body } = req;

  // Select the server to forward request to
  const server = webServers[current];

  // Update tracker to select next server
  if (current != webServers.length - 1) {
    current++;
  } else {
    current = 0;
  }

  // Check if there is a cached response with current server
  const cachedResponse = cache.get(server);

  // If there is a cache found for the server key send the cached result and return the fuction
  if (cachedResponse) {
    console.log(`Found cache with ${server} as key`);
    res.send(cachedResponse);
    return;
  }

  console.log(`didnt find cache with ${server} as key`);
  if (req.url === "/index.html") {
    fetch(`${server}/index.html`)
      .then((response) => response.text())
      .then((data) => {
        cache.set(server, data);
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// Get request for sending favicon
app.get("/favicon.ico", (req, res) => res.sendFile("/favicon.ico"));

// Get request for serving html file
app.get("/index.html", (req, res) => handler(req, res));

//Listen on PORT 8080
app.listen(8080, (err) => {
  err
    ? console.log("Failed to listen on PORT 8080")
    : console.log("Load Balancer Server " + "listening on PORT 8080");
});
