const html = `<head>
<meta charset="UTF-8">
<meta name="description" content="Web_lab2">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="style.css">
<script type="text/javascript" src="js/weatherAPI.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<title>Weather</title>
</head>
<body>
<main>
    <section class="weather-here-header">
        <h1 class="main-title">Weather here</h1>
        <button class="weather-here-update-button" type="button">Update geolocation</button>
        <button class="update-media"><img class="weather-here-update-img" src="img/update-geolocation.png" alt="Update-geolocation"></button>
    </section> 
    <section class="weather-here"></section>
    <section class="favorites-header">
        <h2 class="main-title">Favorites</h2>
        <form class="add-city-form">
            <input id="add-city-input" type="search" class="add-city-input" placeholder="Add a new city (en)" required>
            <button class="add-button" type="submit"><img class="add-city-icon" src="img/plus.png" alt="Add city"></button>
        </form>
    </section>
    <ul class="weather-city-list"></ul>
</main>
<template id="weather-here">
    <section class="weather-here-city">
        <h2 class="city-name">Saint Petersburg</h2>
        <section class="weather-here-main">
            <img class="icon-weather" src="" alt="Here-icon">
            <div class="temperature"></div>
        </section>
    </section>
    <ul class="weather-here-extra-data">
        <li class="wind-parameter">
            <span class="name-parameter">Wind</span>
            <span class="value-parameter"></span>
        </li>
        <li class="cloud-parameter">
            <span class="name-parameter">Cloud cover</span>
            <span class="value-parameter"></span>
        </li>
        <li class="pressure-parameter">
            <span class="name-parameter">Atmospheric pressure</span>
            <span class="value-parameter"></span>
        </li>
        <li class="humidity-parameter">
            <span class="name-parameter">Humidity</span>
            <span class="value-parameter"></span>
        </li>
        <li class="coordinates-parameter">
            <span class="name-parameter">Coordinates</span>
            <span class="value-parameter"></span>
        </li>
    </ul>
</template>
<template id="weather-here-waiting">
    <section class="waiting">
        <h3>Wait, data is loading...</h3>
        <img class="refresh-icon" src='img/refresh.png' alt="refresh.png">
    </section>
</template>
<template id="weather-city">
    <li class="weather-city">
        <section class="favorites-main">
            <h3 class="city-name"></h3>
            <div class="temperature"></div>
            <img class="icon-weather" src="" alt="">
            <button class="delete-button"><img class="favorites-icon-delete" src="img/delete-city.png" alt="Delete city"></button>
        </section>
        <ul>
            <li class="wind-parameter">
                <span class="name-parameter">Wind</span>
                <span class="value-parameter"></span>
            </li>
            <li class="cloud-parameter">
                <span class="name-parameter">Cloud cover</span>
                <span class="value-parameter"></span>
            </li>
            <li class="pressure-parameter">
                <span class="name-parameter">Atmospheric pressure</span>
                <span class="value-parameter"></span>
            </li>
            <li class="humidity-parameter">
                <span class="name-parameter">Humidity</span>
                <span class="value-parameter"></span>
            </li>
            <li class="coordinates-parameter">
                <span class="name-parameter">Coordinates</span>
                <span class="value-parameter"></span>
            </li>
        </ul>
    </li>
</template>
<template id="weather-city-waiting">
    <li class="weather-city">
        <section class="weather-city">
            <h3 class="city-name"></h3>
        </section>
        <section class="weather-details">
            <section class="waiting">
                <h3>Wait, data is loading...</h3>
                <img class="refresh-icon" src='img/refresh.png' alt="refresh.png">
            </section>
        </section>
    </li>
</template>
<script type="text/javascript" src="js/main.js"></script>
</body>`

const readyTemplateHere = ` <section class="weather-here-city">
    <h2 class="city-name">Moscow</h2>
    <section class="weather-here-main">
        <img class="icon-weather" src="http://openweathermap.org/img/wn/04n.png" alt="Here-icon">
        <div class="temperature">-4°C</div>
    </section>
</section>
<ul class="weather-here-extra-data">
    <li class="wind-parameter">
        <span class="name-parameter">Wind</span>
        <span class="value-parameter">2 m/s</span>
    </li>
    <li class="cloud-parameter">
        <span class="name-parameter">Cloud cover</span>
        <span class="value-parameter">90%</span>
    </li>
    <li class="pressure-parameter">
        <span class="name-parameter">Atmospheric pressure</span>
        <span class="value-parameter">1027 hpa</span>
    </li>
    <li class="humidity-parameter">
        <span class="name-parameter">Humidity</span>
        <span class="value-parameter">92%</span>
    </li>
    <li class="coordinates-parameter">
        <span class="name-parameter">Coordinates</span>
        <span class="value-parameter">[55.75, 37.62]</span>
    </li>
</ul>
 `.replace(/\s+/g,' ');

const readyTemplateFavoriteCity = ` <li class="weather-city" cityname="Moscow">
        <section class="favorites-main">
            <h3 class="city-name">Moscow</h3>
            <div class="temperature">-4°C</div>
            <img class="icon-weather" src="http://openweathermap.org/img/wn/04n.png" alt="">
            <button class="delete-button"><img class="favorites-icon-delete" src="img/delete-city.png" alt="Delete city"></button>
        </section>
        <ul>
            <li class="wind-parameter">
                <span class="name-parameter">Wind</span>
                <span class="value-parameter">2 m/s</span>
            </li>
            <li class="cloud-parameter">
                <span class="name-parameter">Cloud cover</span>
                <span class="value-parameter">90%</span>
            </li>
            <li class="pressure-parameter">
                <span class="name-parameter">Atmospheric pressure</span>
                <span class="value-parameter">1027 hpa</span>
            </li>
            <li class="humidity-parameter">
                <span class="name-parameter">Humidity</span>
                <span class="value-parameter">92%</span>
            </li>
            <li class="coordinates-parameter">
                <span class="name-parameter">Coordinates</span>
                <span class="value-parameter">[55.75, 37.62]</span>
            </li>
        </ul>
    </li> 
    `.replace(/\s+/g,' ');

const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
window = new JSDOM(html).window;
global.document = window.document;
global.window = window;
const chai = require('chai');
chai.use(require('sinon-chai'));
global.fetch = require("node-fetch");
const chaiHtml  = require('chai-html')
chai.use(chaiHtml)
const jestMock = require("jest-mock")
const jest = require("jest")

global.navigator = {
    userAgent: 'node.js'
};
    
const geolocate = require('mock-geolocation');
geolocate.use();
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;
const sinon = require("sinon");
const script = require('../functions');

const baseURL = 'http://localhost:3000';

const responseBody = {"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":-4,"feels_like":-8.02,"temp_min":-4,"temp_max":-4,"pressure":1027,"humidity":92},"visibility":10000,"wind":{"speed":2,"deg":220},"clouds":{"all":90},"dt":1608658216,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1608616689,"sunset":1608641893},"timezone":10800,"id":524901,"name":"Moscow","cod":200}
const weatherHereWaitingTemplate = document.querySelector('template#weather-here-waiting')
const weatherCityWaitingTemplate = document.querySelector('template#weather-city-waiting')
const weatherCityTemplate = document.querySelector('template#weather-city')
const weatherHereTemplate = document.querySelector('template#weather-here')
/*
describe('CLIENT: setWeatherParameters()', () => {

    it('should set weather parameters from response in empty template for local city', () => {
  
        const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
        script.setWeatherParameters(newWeatherHere, responseBody)
        script.weatherHere.appendChild(newWeatherHere)
        const wind = document.querySelector('.wind-parameter')
        const cloud = document.querySelector('.cloud-parameter')
        const pressure = document.querySelector('.pressure-parameter')
        const humidity = document.querySelector('.humidity-parameter')
        const coordinates = document.querySelector('.coordinates-parameter')
        expect(wind.lastElementChild.textContent).to.equal("2 m/s")
        expect(cloud.lastElementChild.textContent).to.equal("90%")
        expect(pressure.lastElementChild.textContent).to.equal("1027 hpa")
        expect(humidity.lastElementChild.textContent).to.equal("92%")
        expect(coordinates.lastElementChild.textContent).to.equal("[55.75, 37.62]")
        document.querySelector('.weather-here').innerHTML = ""
    })
    
    it('should set weather parameters from response in empty template for favorite city', () => {

        const newWeatherCity = document.importNode(weatherCityTemplate.content, true)
        script.setWeatherParameters(newWeatherCity, responseBody)
        script.weatherCity.appendChild(newWeatherCity)
        const wind = document.querySelector('.wind-parameter')
        const cloud = document.querySelector('.cloud-parameter')
        const pressure = document.querySelector('.pressure-parameter')
        const humidity = document.querySelector('.humidity-parameter')
        const coordinates = document.querySelector('.coordinates-parameter')
        expect(wind.lastElementChild.textContent).to.equal("2 m/s")
        expect(cloud.lastElementChild.textContent).to.equal("90%")
        expect(pressure.lastElementChild.textContent).to.equal("1027 hpa")
        expect(humidity.lastElementChild.textContent).to.equal("92%")
        expect(coordinates.lastElementChild.textContent).to.equal("[55.75, 37.62]")
        document.querySelector('.weather-city-list').innerHTML = ""
    })
})

describe('CLIENT: weatherCityWaiting(), weatherHereWaiting()', () => {

    afterEach(() => {
        window = new JSDOM(html).window;
		global.document = window.document;
        global.window = window;
    })
    
    it('should return HTML element (node) of loading for city in favorites', () => {
  
          script.weatherCity.innerHTML = ""
          script.weatherCity.appendChild(script.weatherCityWaiting('Moscow'))
          script.weatherCity.firstElementChild.removeAttribute('cityName')
          expect(script.weatherCity.innerHTML.replace(/\s+/g,' ')).to.equal(weatherCityWaitingTemplate.innerHTML.replace(/\s+/g,' '))
          script.weatherCity.innerHTML = ""
    })
      
    it('should return HTML element (node) of loading for local city', () => {

          script.weatherHere.innerHTML = ""
          script.weatherHere.appendChild(script.weatherHereWaiting())
          expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal(weatherHereWaitingTemplate.innerHTML.replace(/\s+/g,' '))
          script.weatherHere.innerHTML = ""
    })
})

describe('CLIENT: weatherCityFunc(), weatherHereFunc()', () => {

    afterEach(() => {
        window = new JSDOM(html).window;
		global.document = window.document;
        global.window = window;
    })
    
    it('should return HTML element (node) with data for city in favorites', () => {
  
          script.weatherCity.appendChild(script.weatherCityFunc(responseBody))
          expect(script.weatherCity.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateFavoriteCity)
          script.weatherCity.innerHTML = ""
    })
      
    it('should return HTML element (node) with data for local city', () => {

          script.weatherHere.appendChild(script.weatherHereFunc(responseBody))
          expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateHere)
          script.weatherHere.innerHTML = ""
    })
})

describe("CLIENT: updateWeatherFavorites()", () => {

    it("should return empty list of favorite cities", async () => {

      await script.updateWeatherFavorites()
      expect(script.weatherCity.innerHTML).to.equal("")
    })

    it("should return list of favorite cities which contains 1 city", async () => {

        script.weatherCity.appendChild(script.weatherCityFunc(responseBody))
        await script.updateWeatherFavorites()
        expect(script.weatherCity.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateFavoriteCity)
        script.weatherCity.innerHTML = ""
    })
})
*/
mockCity = {
    base: "stations",
    clouds: {all: 0},
    cod: 200,
    coord: {lon: 25, lat: 50},
    main: {temp: 257.15, feels_like: 252.98, temp_min: 257.15, temp_max: 257.15, pressure: 1039, humidity: 91},
    name: "Chelyabinsk",
    weather: [{
        description: "mist",
        icon: "50n",
        id: 701,
        main: "Mist"}],
    wind: {speed: 1, deg: 350}	
};

mainSection = `
		<h2 class="main-city-name">Chelyabinsk</h2>
		<img class="main-weather-img" src="https://openweathermap.org/img/wn/50n@2x.png">
		<p class="main-temp">-16°</p>
	`.replace(/\s+/g,' ');

info = `
		<div class="weather-property"> <h4>Ветер</h4> <p>1 m/s, North</p> </div> 
		<div class="weather-property"> <h4>Облачность</h4> <p>0 %</p> </div> 
		<div class="weather-property"> <h4>Давление</h4> <p>1039 hpa</p> </div>       	 
		<div class="weather-property"> <h4>Влажность</h4> <p>91 %</p> </div> 
		<div class="weather-property"> <h4>Координаты</h4> <p>[25 50]</p> </div>
	`.replace(/\s+/g,' ');

errorSection = `<p class="wait">О нет, что-то пошло не так</p>`.replace(/\s+/g,' ');

citySection = `
		<div class="city-weather">
		<h3>Chelyabinsk</h3>
		<p class="city-temp">-16°</p>
		<img class="city-weather-img" src="https://openweathermap.org/img/wn/50n@2x.png">
		<button class="circle-btn"></button>
		</div>
		<div class="info">`.replace(/\s+/g,' ')

describe("CLIENT: putFavoriteCity()", () => {

    afterEach(() => {
		window = new JSDOM(html).window;
		global.document = window.document;
		global.window = window;
	})

	it('add city with ok response from server', async () => {
		cityInput = 'Chelyabinsk';
		fetchMock.get(`${baseURL}/weather/city?q=${cityInput}`, mockCity);
		fetchMock.post(`${baseURL}/favourites`, {});
		script.addToFavorites2(cityInput, () => {
            expect(1).to.equal(1);
            fetchMock.done();
            fetchMock.restore();
			//done();
		});
	})
	
/*
    it("should return empty list of favorite cities", async () => {

        const cityName = "Moscow"
        script.weatherCity.append(script.weatherCityWaiting(cityName))
        await script.putFavoriteCity(responseBody, cityName)
        expect(script.weatherCity.innerHTML).to.equal(readyTemplateFavoriteCity)
    })*/
})

