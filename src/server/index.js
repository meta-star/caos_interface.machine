// caOS
// (c) 2022 Star Inc.
"use strict";

const express = require('express');
const { join: pathJoin } = require('path');
const caosApiClient = require('../client/caos');

const webState = {};

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.sendFile(pathJoin(__dirname, '..', '..', 'web', 'index.html'));
});

app.use('/static', express.static(
    pathJoin(__dirname, '..', '..', 'web', 'static')
));

app.get("/state", (_, res) => {
    res.send(webState);
})

app.get("/weather", async (_, res) => {
    const { data: online } = await caosApiClient.get("weather/ip");
    const offline = {
        "humidity": -1,
        "temperature": -1,
    };
    res.send({ online, offline });
})

app.get("/automate/devices", async (req, res) => {
    const { data } = await caosApiClient.get("automate/devices");
    res.send(data);
})

app.post("/automate/device", async (req, res) => {
    const { machine_id, assign_code } = req.body;
    const { data } = await caosApiClient.post(
        "automate/device",
        { machine_id, assign_code }
    );
    res.send(data);
})

app.get("/automate/device/:device_id", async (req, res) => {
    const { device_id } = req.params;
    const { data } = await caosApiClient.get(`automate/device/${device_id}`);
    res.send(data);
})

app.put("/automate/device/:device_id", async (req, res) => {
    const { state } = req.body;
    const { device_id } = req.params;
    const { data } = await caosApiClient.put(
        `automate/device/${device_id}`,
        { "message": state ? "ON" : "OFF" }
    );
    res.send(data);
})

app.delete("/automate/device/:device_id", async (req, res) => {
    const { device_id } = req.params;
    const { data } = await caosApiClient.delete(`automate/device/${device_id}`);
    res.send(data);
})

module.exports = (ctx) => {
    app.listen(8000, () => {
        console.log('Listening on port 8000');
    });
};
