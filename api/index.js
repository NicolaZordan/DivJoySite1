require("dotenv").config();
const express = require("express");
const path = require("path");
const user = require("./user.js");
const item = require("./item.js");
const items = require("./items.js");

// Port to run your server on
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "./../build")));

app.use("/api/user", user);
app.use("/api/item", item);
app.use("/api/items", items);

// Catchall for any request that doesn't match an API route or static file.
// Point to index.html so user is served the client-side web app.
// React Router will handle displaying the correct page based on path.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
