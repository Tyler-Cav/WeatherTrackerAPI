// selectedCity is what will be in the title of the city that was selected. On initial page load will have date.
let selectedCityTitle = document.querySelector("#currentSelectedCity")
selectedCityTitle.textContent = ("Today's Date: ") + dayjs().format("M/d/YYYY") 

// *CURRENT WEATHER SECTION
// currenWeatherListEL used for appending later into the unordered list for current weather info
const currentWeatherListEl = document.querySelector("#currentWeatherList")
// li's will be used to append onto currentweather list for info on current weather
let currentTempEL = document.createElement("li")
let currentWindEl = document.createElement("li")
let currentHumidityEl = document.createElement("li")

let idk1 = currentWeatherListEl.append(currentTempEL)
let idk2 = currentWeatherListEl.append(currentWindEl)
let idk3 = currentWeatherListEl.append(currentHumidityEl)

currentTempEL.textContent = "Temp: "
currentWindEl.textContent = "Wind: "
currentHumidityEl.textContent = "Humidity: "

// *FIVE DAY SECTION
//5-Day Forecast Header that will be used as the parent to the li children weather info
let fiveDayHeaderEl = document.querySelector("#fiveDayHeader")
    fiveDayHeaderEl.textContent = "5-Day Forecast:"

let fiveDayListEl = document.querySelector("#fiveDayList")

let nextDayDate = document.createElement("li")
let nextDayTemp = document.createElement("li")
let nextDayWind = document.createElement("li")
let nextDayHumidity = document.createElement("li")
// Figure out how to loop this so each day doesn't need variables
nextDay1 = fiveDayListEl.append(nextDayDate)
nextDay2 = fiveDayListEl.append(nextDayTemp)
nextDay3 = fiveDayListEl.append(nextDayWind)
nextDay4 = fiveDayListEl.append(nextDayHumidity)

nextDayDate.textContent = 
nextDayTemp.textContent = 
nextDayWind.textContent =
nextDayHumidity.textContent =


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
