const express = require('express');
const app = express();

const { join: pathJoin } = require('path');

app.get('/', (_, res) => {
    res.sendFile(pathJoin(__dirname, '..', '..', 'web', 'index.html'));
});

app.use('/static', express.static(
    path.join(__dirname, '..', '..', 'web', static)
));

module.exports = (ctx) => {
    app.listen(8000, () => {
        console.log('Listening on port 8000');
    });
}
