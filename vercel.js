{
    "version": 2,
    "builds": [
      {
        // Specify file to convert to a serverless function
        "src": "server.js",
        // Specify the NPM module that is used for the build
        "use": "@now/node"
      }
    ]
  }