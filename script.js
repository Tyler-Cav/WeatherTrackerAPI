// currenWeatherListEL used for appending later into the unordered list
const currentWeatherListEl = document.querySelector("#currentWeatherList")
// li's will be used to append onto currentweather list for info on current weather
let ListEl = document.createElement("li")
// selectedCity is what will be in the title of the city that was selected
let selectedCityTitle = document.querySelector("#currentSelectedCity")
//5-Day Forecast Header that will be used as the parent to the li children weather info
let fiveDayEl = document.querySelector("#fiveDay")
    fiveDayEl.textContent = "5-Day Forecast:"

// li's needed for both current weather and five day forecast
//Include the date before a city is selected, but update text content after a city is selected
    selectedCityTitle.textContent = "City selected and Date"
    currentTempEL = currentWeatherListEl.append(ListEl.textContent = " test ")
    currentWindEl = currentWeatherListEl.append(ListEl.textContent = " test ")
    currentHumidityEl = currentWeatherListEl.append(ListEl.textContent = " test ")

// li's needed for 5-Day Forecast



const apiKey = "64205da5f805a7fb413caa37e89fd954"
// const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`


//allows text to stay and not disappear since submit buttons typically erase all content after submit has been actioned
function handleSubmitAction(e) {
    e.preventDefault()
    let city = document.querySelector("#cityText").value.trim()
    if (city === "") {
        return
    }
    else {
        fetchWeather(city)
    }
}

function fetchWeather (city) {
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(currentWeather).then(function(response) {
        return response.json()
    }) .then(function(data) {
        console.log(data)
        const {lat,lon} = data.coord
        const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        fetch(weatherAPI).then(function(response) {
            console.log(response)
            return response.json()
        }).then(function(data) {
            console.log(data)
        })
    })
}
//below is current weather for the emoji icons
// var iconUrl = src=`https://openweathermap.org/img/w/${data}.weather[0].icon}.png`;


//selecting the form
document.querySelector("#submitCityQuery").addEventListener("submit", handleSubmitAction)





/* PseudoCode
        TODO: Create event listener for form 
            *Need input element in HTML
            *Need eventlistener on button


*/
