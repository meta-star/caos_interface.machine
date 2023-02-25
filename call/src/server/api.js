// interface.machine - caOS
// (c) 2023 Star Inc.
"use strict";

const { Router: expressRouter } = require("express");

const router = expressRouter("/call");
const caosApiClient = require('../client/caos');

router.get("/state", (_, res) => {
    res.send(webState);
})

router.get("/weather", async (_, res) => {
    const { data: online } = await caosApiClient.get("weather/ip");
    const offline = {
        "humidity": -1,
        "temperature": -1,
    };
    res.send({ online, offline });
})

router.get("/automate/devices", async (req, res) => {
    const { data } = await caosApiClient.get("automate/devices");
    res.send(data);
})

router.post("/automate/device", async (req, res) => {
    const { machine_id, assign_code } = req.body;
    const { data } = await caosApiClient.post(
        "automate/device",
        { machine_id, assign_code }
    );
    res.send(data);
})

router.get("/automate/device/:device_id", async (req, res) => {
    const { device_id } = req.params;
    const { data } = await caosApiClient.get(`automate/device/${device_id}`);
    res.send(data);
})

router.put("/automate/device/:device_id", async (req, res) => {
    const { state } = req.body;
    const { device_id } = req.params;
    const { data } = await caosApiClient.put(
        `automate/device/${device_id}`,
        { "message": state ? "ON" : "OFF" }
    );
    res.send(data);
})

router.delete("/automate/device/:device_id", async (req, res) => {
    const { device_id } = req.params;
    const { data } = await caosApiClient.delete(`automate/device/${device_id}`);
    res.send(data);
})

module.exports = router;
