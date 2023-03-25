const express = require("express");
const morgan = require("morgan");

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
  // Requesting to web server
  fetch(`${server}${url}`)
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error);
    });
};

// Get request for sending favicon
app.get("/favicon.ico", (req, res) => res.sendFile("/favicon.ico"));

//Pass new requests to handler method
app.use((req, res) => {
  handler(req, res);
});

//Listen on PORT 8080
app.listen(8080, (err) => {
  err
    ? console.log("Failed to listen on PORT 8080")
    : console.log("Load Balancer Server " + "listening on PORT 8080");
});
