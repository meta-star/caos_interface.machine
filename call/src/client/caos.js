// interface.machine - caOS
// (c) 2023 Star Inc.
"use strict";

const { create: createAxios } = require('axios');

const client = createAxios({
    baseURL: 'https://caos-api.startw.cf/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'CAOS': process.env.CAOS_API_KEY,
    },
});

module.exports = client;
