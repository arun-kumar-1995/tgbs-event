"use strict";

import app from "./app/app.js";

const port = 5500;

const startServer = async () => {
  console.log("===  Server Startup Initiated... ===");
  try {
    app.listen(port, (err) => {
      if (err) {
        console.error(`Error ${err.message}`);
        process.exit(1);
      }
      console.log(`[Server started]:\n http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err.message);
    process.exit(1);
  }
};

startServer();
