const express = require('express');
const app = express();
// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
app.get('/', (req, res) => {
    console.log(`Received request from ${req.ip} for ${req.path}`);
    res.send('Hello World!');
});