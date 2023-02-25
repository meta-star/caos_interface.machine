// interface.machine - caOS
// (c) 2023 Star Inc.
"use strict";

const express = require('express');
const proxy = require('express-http-proxy');

const { join: pathJoin } = require('path');

const apiRouter = require("./api");

const app = express();

app.use(express.json());

app.get('/*', (req, res, next) => {
    if (process.env.CAOS_DEV === "1") {
        proxy(process.env.VIEW_DEV_URL)(req, res, next);
        return;
    }
    next();
}, express.static(
    pathJoin(__dirname, '..', '..', 'web')
));

app.use("/api", apiRouter);

module.exports = (ctx) => {
    ctx.uiServer = {};
    ctx.uiServer.host = process.env.SERVER_HOST || "localhost";
    ctx.uiServer.port = process.env.SERVER_PORT || 8000;

    app.listen(ctx.uiServer.port, ctx.uiServer.host, () => {
        console.log(
            'UI Server is listening on',
            `http://${ctx.uiServer.host}:${ctx.uiServer.port}`
        );
    });
};
