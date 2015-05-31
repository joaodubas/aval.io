"use strict";

var path = require("path");

module.exports = {
  entrypoint: path.resolve(path.join(
    __dirname,
    "..",
    "client",
    "script",
    "app.js"
  )),
  output: {
    path: path.resolve(path.join(
      __dirname,
      "..",
      "client",
      "dist"
    )),
    filename: "index.js"
  },
  loaders: [
    {
      test: /src\/.+\.js$/,
      exclude: /node_modules/,
      loader: "babel"
    }
  ]
};