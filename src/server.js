const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mockdata = require('./mockdata');

app.use(express.static('../dist'));

app.get('/movies/get', (req, res) => res.send(mockdata));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));