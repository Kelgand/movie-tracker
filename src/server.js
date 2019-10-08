const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const mockdata = require('./mockdata');
const password = "Test";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('../dist'));

app.get('/movies/get', (req, res) => res.send(mockdata));

app.post(['/movies/delete', '/movies/add'], (req, res) => {
	if(req.body.password === password){
		res.send("Success");
	} else {
		res.send("Failure");
	}
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));