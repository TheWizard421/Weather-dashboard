var searchBtn = document.querySelector("#search-btn");
var selectedCity = document.querySelector("#selected-city")



var getWeatherData = function(weather) {
fetch("http://api.openweathermap.org/data/2.5/weather?q=" + weather + "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f")
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

    console.log(data);
    document.getElementById('currentLocation').textContent = "City: " +data.name
    document.getElementById('date').textContent = new Date(data.dt * 1000).toLocaleDateString("en-US")
    document.getElementById('icon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    document.getElementById('temperature').textContent = "City Temperature: "+data.main.temp+"°F"
    document.getElementById('humidity').textContent = "City humidity: "+data.main.humidity+"%"
    document.getElementById('windSpeed').textContent = "Wind Speed: "+data.wind.speed+"mph"
    getForcast(data.coord.lat, data.coord.lon)
})};
 var getForcast = function(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d3f5af43f561d831f34569cf6fef321f")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        document.getElementById('uvIndex').textContent = "UV Index: "+data.current.uvi
        for (var i = 0; i < 5; i++) {
            let card = document.createElement('div')
            card.className = 'card col-2'
            let cardBody = document.createElement('div')
            cardBody.className = 'card-body'
            let title = document.createElement('h2')
            title.innerText = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US")
            title.className = 'card-title'
            let icon = document.createElement('img')
            icon.src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
            let temp = document.createElement('p')
            temp.innerText = "Temp: "+data.daily[i].temp.day+ "°F"
            let humidity = document.createElement('p')
            humidity.innerText = "Humidity: "+data.daily[i].humidity+"%"
            let windSpeed = document.createElement('p')
            windSpeed.innerText = "Wind: "+data.daily[i].wind_speed+"mph"
            cardBody.appendChild(title)
            cardBody.appendChild(icon)
            cardBody.appendChild(temp)
            cardBody.appendChild(humidity)
            cardBody.appendChild(windSpeed)
            card.appendChild(cardBody)
            document.getElementById('five-forcast').appendChild(card)
        }
    })
 }

 var clickSubmitEl = function(event) {
    event.preventDefault();
    console.log("clicked")
    var inputEl = selectedCity.value.trim();
    console.log(inputEl);
    if (inputEl) {
        getWeatherData(inputEl);
    } else {
        alert("Select a City.");
    }
};
searchBtn.addEventListener("click", clickSubmitEl);
selectedCity.addEventListener('click', clickSubmitEl);

//getWeatherData();
