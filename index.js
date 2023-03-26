const express = require("express");

// Initialize web server 1
const app1 = express();

// Initialize web server 2
const app2 = express();

// Initialize web server 3
const app3 = express();

// Set EJS as render engine
app1.set("view engine", "ejs");
app1.set("views", __dirname + "/views");
app2.set("view engine", "ejs");
app2.set("views", __dirname + "/views");
app3.set("view engine", "ejs");
app3.set("views", __dirname + "/views");

// Serve the index.html file with some arguments
app1.get("/index.html", (req, res) => {
  const title = "Server1";
  const message = "Welcome to my website! This website is loaded from server 1";
  const style = "body { background-color: red; }";

  res.render("index", { title, message, style });
});

// Serve the index.html file with some arguments
app2.get("/index.html", (req, res) => {
  const title = "Server2";
  const message = "Welcome to my website! This website is loaded from server 2";
  const style = "body { background-color: yellow; }";

  res.render("index", { title, message, style });
});

// Serve the index.html file with some arguments
app3.get("/index.html", (req, res) => {
  const title = "Server3";
  const message = "Welcome to my website! This website is loaded from server 3";
  const style = "body { background-color: green; }";

  res.render("index", { title, message, style });
});

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
