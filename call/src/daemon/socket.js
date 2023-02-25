// interface.machine - caOS
// (c) 2023 Star Inc.
"use strict";

const net = require('net');
const crypto = require('crypto');

const getMessageHash = (data) => {
    const secret = process.env.DAEMON_UNIX_SOCKET_SECRET;
    return crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(data))
        .digest('hex');
};

const SocketClient = function (client) {
    this.client = client;
};

SocketClient.prototype.emit = function (event, data) {
    data.hash = getMessageHash(data);
    this.client.emit(event, data);
};

SocketClient.prototype.on = function (event, callback) {
    this.client.on(event, (...args) => {
        if (!data || !data.hash) {
            throw new Error("Invalid data");
        }
        const hash = getMessageHash(data);
        if (hash !== data.hash) {
            throw new Error("Invalid hash");
        }
        callback(...args);
    });
};

module.exports = (ctx) => {
    const client = net.createConnection(process.env.DAEMON_UNIX_SOCKET_PATH);
    if (!client) {
        throw new Error("Failed to connect to daemon");
    }
    ctx.unixSocketClient = new SocketClient(client);
}
