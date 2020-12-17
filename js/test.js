const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const sinon = require('sinon');
require('sinon-mongo');
const server = require('./index') 
const MongoClient = require('mongodb').MongoClient;
const Collection = require('mongodb/lib/collection');
chai.use(chaiHttp);

const apiKey = 'f0b947c783873ab1a7c905ad26e85162'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const connectionString = 'mongodb+srv://dbUser:1029384756@cluster0.3papj.mongodb.net/web_lab3_db?retryWrites=true&w=majority'

describe('BACKEND: GET /weather/coordinates', () => {
	
	it('should return ok response', (done) => {
		
		const responseObject = {
			statusCode: 200,
		};
		const responseBody = {"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":-5,"feels_like":-9.82,"temp_min":-5,"temp_max":-5,"pressure":1024,"humidity":92},"visibility":1500,"wind":{"speed":3,"deg":250},"clouds":{"all":90},"dt":1608104795,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1608098060,"sunset":1608123377},"timezone":10800,"id":524901,"name":"Moscow","cod":200}
		const lon = 37.62;
		const lat = 55.75;

		requestMock = sinon.mock(request);
		requestMock.expects("get").once()
			.withArgs(`${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
			.yields(null, responseObject, JSON.stringify(responseBody));

		chai.request(server) 
			.get(`/weather/coordinates?lat=${lat}&lon=${lon}`)
			.end((err, res) => {
				res.should.have.status(200);
				const info = res.body
				flag_coord = info.hasOwnProperty('coord')
				flag_weather = info.hasOwnProperty('weather')
				flag_name = info.hasOwnProperty('name')
				flag_clouds = info.hasOwnProperty('clouds')
				flag_wind = info.hasOwnProperty('wind')
				flag_cod = info.hasOwnProperty('cod')
				flag_coord.should.eql(true)
				flag_weather.should.eql(true)
				flag_name.should.eql(true)
				flag_clouds.should.eql(true)
				flag_wind.should.eql(true)
				flag_cod.should.eql(true)
                requestMock.verify();
                requestMock.restore();
                done();
        });
	})

	it('should return error response', (done) => {
		
		const lon = 139.69;
	 	const lat = 35.69;

		requestMock = sinon.mock(request);
		requestMock.expects("get")
			.once()
			.withArgs(`${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
			.yields(new Error(), null, null);

		chai.request(server) 
			.get(`/weather/coordinates?lat=${lat}&lon=${lon}`)
			.end((err, res) => {
				res.should.have.status(500);
                requestMock.verify();
                requestMock.restore();
                done();
        });
	})
})

describe('BACKEND: GET /weather/city', () => {
	
	it('should return ok response', (done) => {
		
		const responseObject = {
			statusCode: 200,
		};
		const responseBody = {"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":-5,"feels_like":-9.82,"temp_min":-5,"temp_max":-5,"pressure":1024,"humidity":92},"visibility":1500,"wind":{"speed":3,"deg":250},"clouds":{"all":90},"dt":1608104795,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1608098060,"sunset":1608123377},"timezone":10800,"id":524901,"name":"Moscow","cod":200}
		const city = 'Moscow'

		requestMock = sinon.mock(request);
		requestMock.expects("get")
			.once()
			.withArgs(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`)
			.yields(null, responseObject, JSON.stringify(responseBody));

		chai.request(server) 
			.get('/weather/city?q=' + city)
			.end((err, res) => {
				res.should.have.status(200);
                const info = res.body
				flag_coord = info.hasOwnProperty('coord')
				flag_weather = info.hasOwnProperty('weather')
				flag_name = info.hasOwnProperty('name')
				flag_clouds = info.hasOwnProperty('clouds')
				flag_wind = info.hasOwnProperty('wind')
				flag_cod = info.hasOwnProperty('cod')
				flag_coord.should.eql(true)
				flag_weather.should.eql(true)
				flag_name.should.eql(true)
				flag_clouds.should.eql(true)
				flag_wind.should.eql(true)
				flag_cod.should.eql(true)
                requestMock.verify();
                requestMock.restore();
                done();
        });
    })
    
    it('should return error response', (done) => {
		
		const city = 'Tokyo'

		requestMock = sinon.mock(request);
		requestMock.expects("get")
			.once()
			.withArgs(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`)
			.yields(new Error(), null, null);

		chai.request(server) 
			.get('/weather/city?q=' + city)
			.end((err, res) => {
				res.should.have.status(500);
                requestMock.verify();
                requestMock.restore();
                done();
        });
	})
})

describe('BACKEND: POST /favourites', () => {

	it('should return ok response', (done) => {

		body = `name=Bejing`

		mockCollectionCities = sinon.mongo.collection();
		mockCollectionCities.insertOne.yields(null, { ops: [{ name: 'Bejing' }]});
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.post('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(200);
				sinon.assert.calledOnce(mockCollectionCities.insertOne);
                done();
        });
	})
	
	it('should return error response', (done) => {

		body = `name=Bejing`

		mockCollectionCities = sinon.mongo.collection();
		mockCollectionCities.insertOne.yields(new Error(), null);
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.post('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(500);
				sinon.assert.calledOnce(mockCollectionCities.insertOne);
                done();
        });
	})
})

describe('BACKEND: DELETE /favourites', () => {

	it('should return ok response', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		body = `name=Bejing`
		mockCollectionCities.deleteOne.yields(null, { name: 'Bejing' });
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.delete('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(200);
				sinon.assert.calledOnce(mockCollectionCities.deleteOne);
                done();
        });
	})

	it('should return error response', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		body = `name=Bejing`
		mockCollectionCities.deleteOne.yields(new Error(), null);
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.delete('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(500);
				sinon.assert.calledOnce(mockCollectionCities.deleteOne);
                done();
        });
	})
})

describe('BACKEND: GET /favourites', () => {

	it('should return ok response', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		cities = [{name: 'Tokyo'}, {name: 'Moscow'}, {name: 'Paris'}]
		mockCollectionCities.find.returns(sinon.mongo.documentArrayCallback(null, cities));
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.get('/favourites')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.eql(['Tokyo', 'Moscow', 'Paris'])
				sinon.assert.calledOnce(mockCollectionCities.find);
                done();
        });
	})
	
	it('should return error response', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		mockCollectionCities.find.returns(sinon.mongo.documentArrayCallback(new Error(), null));
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.get('/favourites')
			.end((err, res) => {
				res.should.have.status(500);
				sinon.assert.calledOnce(mockCollectionCities.find);
                done();
        });
	})
})

sinon.mongo.documentArrayCallback = (err, result) => {
    if (!result) result = [];
    if (result.constructor !== Array) result = [result];

    return {
      	sort: sinon.stub().returnsThis(),
     	toArray: function f() {
        	var callback = arguments[arguments.length - 1];
       		callback.apply(null, [err, result]);
    	}
 	}
}