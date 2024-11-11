module.exports = function override(config, env) {
    return {
        ...config,
        ignoreWarnings: [{
           module: /node_modules/,
           message: /Failed to parse source map/,
        }],
      }
   }