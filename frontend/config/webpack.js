var path = require("path");

module.exports = {
  entrypoint: path.resolve(path.join(
    __dirname,
    "..",
    "client",
    "script",
    "client.js"
  )),
  output: {
    path: path.resolve(path.join(
      __dirname,
      "..",
      "dist"
    )),
    filename: "index.js"
  },
  loaders: [
    {
      test: /.+\.js$/,
      exclude: /node_modules/,
      loader: "babel"
    }
  ]
};