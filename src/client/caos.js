// caOS
// (c) 2022 Star Inc.
"use strict";

const { create: createAxios } = require('axios');

const client = createAxios({
    baseURL: 'https://client.startw.cf/metastar_caos/cloud',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'CAOS': process.env.CAOS_API_KEY,
    },
});

module.exports = client;
