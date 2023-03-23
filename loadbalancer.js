const express = require("express");
const path = require("path");
const axios = require("axios");

// Make app instance
const app = express();
// Web servers for the loadbalancer to use
const webServers = ["http://localhost:3000", "http://localhost:3001"];
// Track current web server for sending requests
let current = 0;

// Forward to web server
const handler = async (req, res) => {
  // Adding headers to request to disable caching
  req.headers["Cache-Control"] = "no-cache";
  req.headers["Pragma"] = "no-cache";
  req.headers["Expires"] = "0";
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

  try {
    // Requesting to web server
    const response = await axios({
      url: `${server}${url}`,
      method: method,
      headers: headers,
      data: body,
    });

    // Send the response from the web server back to the client
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
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
