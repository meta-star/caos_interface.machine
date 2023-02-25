// interface.machine - caOS
// (c) 2023 Star Inc.
"use strict";

// Create context storage
const ctx = {
    now: () => Math.floor(new Date().getTime() / 1000),
};

// Load kernel
require('./src/kernel')(ctx);

// Load modules
(() => {
    const modules = {
        'daemon': process.env.ENABLE_DAEMON,
        'server': process.env.ENABLE_SERVER,
        'browser': process.env.ENABLE_BROWSER,
    };
    Object.entries(modules).forEach(([name, isEnabled]) => {
        if (isEnabled !== "yes") return;
        require(`./src/${name}`)(ctx);
    });
})();

// Show status message
console.info(
    "index.linux - The UI System for caOS",
    "\n====",
    `\nStarted: ${ctx.now()}`,
    `\nPID: ${process.pid}`,
    `\nUnixPlatform: ${process.platform}`,
);
if (process.env.CAOS_DEV === "1") {
    console.warn("[Development Mode Enabled]");
}
