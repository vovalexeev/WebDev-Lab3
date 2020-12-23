

const baseURL = 'http://localhost:3000';

const weatherHere = document.querySelector('.weather-here')
const weatherCity = document.querySelector('.weather-city-list')

const weatherHereWaiting = () => {
    const weatherHereWaitingTemplate = document.querySelector('template#weather-here-waiting')
    return document.importNode(weatherHereWaitingTemplate.content, true)
}

const weatherCityWaiting = (cityName) => {
    const weatherCityWaitingTemplate = document.querySelector('template#weather-city-waiting')
    const newWeatherCityWaiting = document.importNode(weatherCityWaitingTemplate.content, true)
    newWeatherCityWaiting.querySelector('.city-name').innerText = cityName.split('_').join(' ')
    newWeatherCityWaiting.firstElementChild.setAttribute('cityName', cityName)
    return newWeatherCityWaiting
}

const weatherHereFunc = (weather) => {
    const weatherHereTemplate = document.querySelector('template#weather-here')
    const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
    setWeatherParameters(newWeatherHere, weather)
    return newWeatherHere
}

const weatherCityFunc = (weather) => {
    const weatherCityTemplate = document.querySelector('template#weather-city')
    const newWeatherCity = document.importNode(weatherCityTemplate.content, true)
    setWeatherParameters(newWeatherCity, weather)
    newWeatherCity.querySelector('.delete-button').addEventListener('click', removeFromFavorites)
    newWeatherCity.firstElementChild.setAttribute('cityName', weather.name.split('_').join(' '))
    return newWeatherCity
}

const updateWeatherHere = () => {
    weatherHere.innerHTML = ""
    const waitingCity = weatherHereWaiting()
    weatherHere.append(waitingCity)
    navigator.geolocation.getCurrentPosition (async coordinates => {
        fetch(`${baseURL}/weather/coordinates?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`)
        .then(resp => resp.json())
        .then(weather => {
            weatherHere.innerHTML = ""
            weatherHere.append(weatherHereFunc(weather))
        })
        .catch(() => {
            alert('Something went wrong... Please refresh the page!')
        })
    }, error => {
        fetch(`${baseURL}/weather/city?q=Moscow`)
        .then(resp => resp.json())
        .then(weather => {
            weatherHere.innerHTML = ""
            weatherHere.append(weatherHereFunc(weather))
        })
        .catch(() => alert('Something went wrong... Please refresh the page!'))
    })
}
    
function getIconURL(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}.png`
}

const setWeatherParameters = (element, weatherObject) => {
    const {name, icon, temperature, wind, cloud, pressure, humidity, coordinates} = getWeatherParameters(element)
    name.innerHTML = weatherObject.name
    const iconCode = weatherObject.weather[0].icon
    icon.src = getIconURL(weatherObject.weather[0].icon)
    temperature.innerHTML = `${Math.round(weatherObject.main.temp)}°C`
    wind.innerHTML = `${weatherObject.wind.speed} m/s`
    cloud.innerHTML = `${weatherObject.clouds.all}%`
    pressure.innerHTML = `${weatherObject.main.pressure} hpa`
    humidity.innerHTML = `${weatherObject.main.humidity}%`
    coordinates.innerHTML = `[${weatherObject.coord.lat.toFixed(2)}, ${weatherObject.coord.lon.toFixed(2)}]`
    return element
};

const getWeatherParameters = weatherCity => {
    return {
        name: weatherCity.querySelector('.city-name'),
        icon: weatherCity.querySelector('.icon-weather'),
        temperature: weatherCity.querySelector('.temperature'),
        wind: weatherCity.querySelector('.wind-parameter .value-parameter'),
        cloud: weatherCity.querySelector('.cloud-parameter .value-parameter'),
        pressure: weatherCity.querySelector('.pressure-parameter .value-parameter'),
        humidity: weatherCity.querySelector('.humidity-parameter .value-parameter'),
        coordinates: weatherCity.querySelector('.coordinates-parameter .value-parameter')
    }
}

const removeFromFavorites = evt => {
    const thisCityName = evt.currentTarget.parentElement.firstElementChild.innerHTML
    fetch(`${baseURL}/favourites`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: `name=${thisCityName}`
    })
    .then(resp => resp.json())
    .then(() => {let citiesElementToRemove = []
        for (const cityElement of weatherCity.children) {
            const thisCity = cityElement.querySelector('.city-name').innerText
            if (thisCityName === thisCity)
                citiesElementToRemove.push(cityElement)
        }
        citiesElementToRemove.forEach(cityElementToRemove => weatherCity.removeChild(cityElementToRemove))})
    .catch(err => {
        alert(err);
        alert("City hasn't been deleted");
    });
}

const addToFavorites = async evt => {
    evt.preventDefault()
    const cityName1 = evt.currentTarget.firstElementChild.value.split(' ').join('_');
    evt.currentTarget.firstElementChild.value = ''
    const cityName = cityName1[0].toUpperCase() + cityName1.slice(1)
    let exist = false;
    for (const cityElement of weatherCity.children) {
        const thisCity = cityElement.querySelector('.city-name').innerText
        if (cityName.split('_').join(' ') === thisCity){
            alert('This city is already in favourites!')
            exist = true
            break
        }
    }
    if (exist === false){
        weatherCity.append(weatherCityWaiting(cityName))
        fetch(`${baseURL}/weather/city?q=${cityName.split('_').join(' ')}`)
        .then(resp => resp.json())
        .then(data => {
			if (data.name !== undefined) {
				putFavoriteCity(data, cityName);
            } 
            else {
                alert(`${cityName} not found!`);
                const loading = weatherCity.querySelector(`.weather-city[cityName=${cityName}]`)
                weatherCity.removeChild(loading)
            }
        })
        .catch(err => {alert(err)})
    }
}

const addToFavorites2 = cityName => {
    weatherCity.append(weatherCityWaiting(cityName))
    fetch(`${baseURL}/weather/city?q=${cityName.split('_').join(' ')}`)
    .then(resp => resp.json())
    .then(data => {
        if (data.name !== undefined) {
            putFavoriteCity(data, cityName);
        } 
        else {
            alert(`${cityName} not found!`);
            const loading = weatherCity.querySelector(`.weather-city[cityName=${cityName}]`)
            weatherCity.removeChild(loading)
            execCallback();
        }
    })
    .catch(err => {alert(err); execCallback();})
}

function putFavoriteCity(data, cityName) {
	fetch(`${baseURL}/favourites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		body: `name=${data.name}`
	}).then(resp => resp.json()).then(() => {
        console.log(data);
        const loading = weatherCity.querySelector(`.weather-city[cityName=${cityName}]`)
        weatherCity.replaceChild(weatherCityFunc(data), loading)
        execCallback();
	}).catch(function () {
        alert('Something went wrong... Please refresh the page!')
        execCallback();
	});
}

function execCallback() {
	if (callback == null) {
		return;
	}
	try {
		callback();
		callback = null;
	} catch(err) {
		console.log(err);
		callback = null;
	}
}

const updateWeatherFavorites = () => {
    fetch(`${baseURL}/favourites`).then(resp => resp.json()).then(data => {
        favoritesList = data ? data : [];
        let citiesToAdd = []
        for (const i in favoritesList) {
            const cityName = favoritesList[i]
            if (!weatherCity.querySelector(`.weather-city[cityName=${cityName}]`))
                citiesToAdd.push(cityName)
        }
        citiesToAdd.forEach(cityToAdd => {
            weatherCity.append(weatherCityWaiting(cityToAdd))
            const newCityElement = weatherCity.querySelector(`.weather-city[cityName=${cityToAdd}]`)
            fetch(`${baseURL}/weather/city?q=${cityToAdd}`)
            .then(resp => resp.json())
            //weatherAPI.getByCityName(cityToAdd)
                .then(weather => 
                    weatherCity.replaceChild(weatherCityFunc(weather), newCityElement))
                .catch(() => alert('Something went wrong... Please refresh the page!'))
        })
	})
	.catch(err => {});
};


/*if (!localStorage.getItem('favoritesList'))
    localStorage.setItem('favoritesList', '[]')
const weatherHere = document.querySelector('.weather-here')
const weatherCity = document.querySelector('.weather-city-list')
updateWeatherHere()
updateWeatherFavorites()

const updateButton = document.querySelectorAll('.weather-here-update-button, .update-media')
for(let i = 0; i < updateButton.length; i++){ 
    if (updateButton){
        updateButton[i].addEventListener('click', updateWeatherHere)
    }
}	
const addCityButton = document.querySelector('.add-city-form')
addCityButton.addEventListener('submit', addToFavorites)
window.addEventListener("offline", function(e) {alert("Internet disconnected... Please refresh the page!");})
*/

updateWeatherHere()
updateWeatherFavorites()

module.exports = {
    weatherHereWaiting, //
    weatherCityWaiting, //
    weatherHereFunc, //
    weatherCityFunc, //
    updateWeatherHere,
    getIconURL, //
    setWeatherParameters, //
    getWeatherParameters, //
    removeFromFavorites,
    addToFavorites,
    putFavoriteCity,
    updateWeatherFavorites, //
    weatherHere, //
    weatherCity, //
    addToFavorites2
}