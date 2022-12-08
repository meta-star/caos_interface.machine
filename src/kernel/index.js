// caOS
// (c) 2022 Star Inc.
"use strict";

module.exports = (ctx) => {
    const modules = ["init"];
    modules.forEach((module) => {
        require(`./${module}`)(ctx);
    });
};
