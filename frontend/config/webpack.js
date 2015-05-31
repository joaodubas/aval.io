var path = require("path");

module.exports = {
  entry: path.resolve(path.join(
    __dirname,
    "..",
    "src",
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
  module: {
    loaders: [
      {
        test: /.+\.js$/,
        include: [
          path.resolve(path.join(
            __dirname,
            "..",
            "src"
          ))
        ],
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  }
};