const express = require("express");

// Initialize web server 1
const app1 = express();

// Initialize web server 2
const app2 = express();

// Handler method
const handler = (num) => (req, res) => {
  // Deconstruct request properties
  const { method, url, headers, body } = req;

  // Send response
  res.send("Response from server " + num);
};

// Handle GET and POST requests
app1.get("*", handler(1)).post("*", handler(1));
app2.get("*", handler(2)).post("*", handler(2));

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
