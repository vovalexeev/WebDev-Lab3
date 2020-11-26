const express = require('express')
const app = express()
const port = 3000
const request = require('request');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// var cors = require('cors')
// app.use(cors())

const apiKey = 'f0b947c783873ab1a7c905ad26e85162'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const connectionString = 'mongodb+srv://dbUser:1029384756@cluster0.3papj.mongodb.net/web_lab3_db?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, database) => {
	if (err) {
		return console.log(err)
	}

	console.log('Connected to Database')
	app.use(bodyParser.urlencoded({ extended: true }));
	
	app.get('/weather/city', (req, res) => {
		request(`${baseURL}?q=${req.query.q}&appid=${apiKey}&units=metric`, (err, response, body) => {
			return sendResult(res, err, body);
		});
	});	

	app.get('/weather/coordinates', (req, res) => {
		request(`${baseURL}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`, (err, response, body) => {
			return sendResult(res, err, body);
		});
	});

	app.post('/favourites', (req, res) => {
		db = database.db();
		db.collection('cities').insertOne(req.body, (err, results) => {
			sendResult(res, err, err ? null : results.ops[0])
		});
	});


	app.get('/favourites', (req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('content-type', 'application/json; charset=utf-8');
		db = database.db();
		db.collection('cities').find({}).toArray((err, items) => {
			results = null;
			if (!err) {
				results = [];
				for (item of items) {
					results.push(item.name)
				}
			}
			sendResult(res, err, results);	
		});
	});

	app.delete('/favourites', (req, res) => {
		db = database.db();
		db.collection('cities').deleteOne(
			{ name: req.body.name }
		)
	});

	app.options('*', (req, res) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Headers', 'Content-Type');
		res.set('Access-Control-Allow-Methods', '*');
		res.setHeader('content-type', 'application/json; charset=utf-8');
		res.send('ok');
	});

	app.listen(port, () => {
		console.log('Listening on port ' + port);
	});               
})

function sendResult(res, err, ok) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type', 'application/json; charset=utf-8');
	if(err) {
		return res.status(500).send({message: err});
	}
	return res.send(ok);	
}