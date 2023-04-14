const express = require("express");

const servers = [];
const colors = ["red", "yellow", "blue"];

for (var i = 0; i < colors.length; i++) {
  const serverNumber = i + 1;
  const backgroundColor = colors[i];

  // Initialize web server
  const app = express();

  // Set EJS as render engine
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/views");

  // Serve the index.html file with some arguments
  app.get("/index.html", (req, res) => {
    const title = `Server ${serverNumber}`;
    const message = `Welcome to my website! This website is loaded from server ${serverNumber}`;
    const style = `body { background-color: ${backgroundColor}; }`;

    res.render("index", { title, message, style });
  });

  const PORT = 3000 + i;
  console.log(colors[i]);

  // Start server on PORT
  app.listen(PORT, (err) => {
    err
      ? console.log(`Failed to listen on PORT ${PORT}`)
      : console.log("Web Server " + `listening on PORT ${PORT}`);
  });

  // Push an app reference to the servers array
  servers[i] = app;
}
