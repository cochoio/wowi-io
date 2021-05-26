const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 8080;

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server Runnint On PORT: ${port}`);
});
