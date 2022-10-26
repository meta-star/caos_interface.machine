// caOS
// (c) 2022 Star Inc.
"use strict";

// Create context storage
const ctx = {
    now: () => Math.floor(new Date().getTime() / 1000),
};

// Load kernel modules
require('./src/kernel')(ctx);

// Load server modules if enabled
if (process.env.ENABLE_SERVER === 'yes') {
    require('./src/server')(ctx);
}

// Load browser modules if enabled
if (process.env.ENABLE_BROWSER === "yes") {
    require('./src/browser')(ctx);
}

// Show status message
console.info(
    "index.linux - The UI System for caOS",
    "\n====",
    `\nStarted: ${ctx.now()}`,
    `\nPID: ${process.pid}`,
    `\nUnixPlatform: ${process.platform}`,
    `\nDaemon UnixSocket: ${process.env.DAEMON_UNIX_SOCKET_PATH}`,
);
