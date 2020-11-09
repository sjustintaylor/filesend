const path = require("path");

module.exports = ({ config }) => {
  // a bunch of other rules here

  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "../src"),
  };
  return config;
};
