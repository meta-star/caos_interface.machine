// interface.machine - caOS
// (c) 2023 Star Inc.
"use strict";

const { existsSync } = require("fs");
const { join: pathJoin } = require("path");

module.exports = () => {
    // Force the app only to run on Linux
    if (process.platform !== "linux") {
        console.error("caOS only runs on Linux.");
        process.exit(1);
    }

    // Load config
    const dotenvPath = pathJoin(__dirname, '..', '..', '.env');
    if (!existsSync(dotenvPath) && !process.env.APP_CONFIGURED) {
        throw new Error(".env not exists");
    }
    require('dotenv').config();
}
