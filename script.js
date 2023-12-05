// selectedCity is what will be in the title of the city that was selected. On initial page load will have date.
let selectedCityTitle = document.querySelector("#currentSelectedCity")
selectedCityTitle.textContent = ("Today's Date: ") + dayjs().format('M/D/YYYY') 

// *CURRENT WEATHER SECTION
// currenWeatherListEL used for appending later into the unordered list for current weather info
const currentWeatherListEl = document.querySelector("#currentWeatherList")
// li's will be used to append onto currentweather list for info on current weather
let currentTempEL = document.createElement("li")
let currentWindEl = document.createElement("li")
let currentHumidityEl = document.createElement("li")

currentWeatherListEl.append(currentTempEL)
currentWeatherListEl.append(currentWindEl)
currentWeatherListEl.append(currentHumidityEl)

currentTempEL.textContent = "Temp: "
currentWindEl.textContent = "Wind: "
currentHumidityEl.textContent = "Humidity: "

// *FIVE DAY SECTION
//5-Day Forecast Header that will be used as the parent to the li children weather info
let fiveDayHeaderEl = document.querySelector("#fiveDayHeader")
    fiveDayHeaderEl.textContent = "5-Day Forecast:"

let dayOneIDEl = document.querySelector("#dayOneID")

//* Questioning if I can just put these 4 li's in a loop for when we pull for all 5 days of forecast. Lines 29-42
let nextDayDate = document.createElement("li")
let nextDayTemp = document.createElement("li")
let nextDayWind = document.createElement("li")
let nextDayHumidity = document.createElement("li")
// Figure out how to loop this so each day doesn't need variables
nextDay1 = dayOneIDEl.append(nextDayDate)
nextDay2 = dayOneIDEl.append(nextDayTemp)
nextDay3 = dayOneIDEl.append(nextDayWind)
nextDay4 = dayOneIDEl.append(nextDayHumidity)

nextDayDate.textContent = "Day:"
nextDayTemp.textContent = "Current Temp:"
nextDayWind.textContent = "Current Wind:"
nextDayHumidity.textContent = "Current Humidity:"

//# Array of previously searched cities
let searchedCitiesArray = []
searchedCitiesArray.forEach(function(cityBtn) {
    cityBtn.addEventListener("click", function() {
        let textInput = cityBtn.siblings("textarea").val()
        console.log(textInput)
    })
})        
//TODO: Create a function here to pull the local storage if page is refreshed.

const apiKey = "64205da5f805a7fb413caa37e89fd954"

//allows text to stay and not disappear since submit buttons typically erase all content after submit has been actioned
function handleSubmitAction(e) {
    e.preventDefault()
    let city = document.querySelector("#cityText").value.trim()
    //TODO: Figure out how to make an || statement in line 61, need it to return nothing if API 404's.
    //TODO: Need this because I'm creating history buttons for anything inputted by user.
    if (city === "") {
        return
    }
    else {
        fetchWeather(city)
        //TODO: take the city value and make local storage here to append to button list.
        //TODO: fix this loop, I need to check if the searched item already exists within the buttons somehow.
        // for (let i = 0; i < searchedCitiesArray.length; i++) {
        //     if (searchedCitiesArray[i] !== city)
        let historyListEl = document.querySelector("#historyTracker")
        let newBtn = document.createElement("button")
        newBtn.setAttribute('type', 'button')
        newBtn.setAttribute('class',"list-group-item list-group-item-action" )
        historyListEl.append(newBtn)
        newBtn.textContent = city
        searchedCitiesArray.push(city)
        console.log(searchedCitiesArray)
    }
}   
        //localStorage.setItem("city", city)

function fetchWeather (city) {
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(currentWeather)
    .then(function(response) {
        return response.json()
    }) .then(function(data) {
            console.log(data)
            console.log(data.main.temp)
            selectedCityTitle.textContent = data.name + ": " + dayjs().format('M/D/YYYY')  
            currentTempEL.textContent = "Current Temp: " + Math.round(data.main.temp) + "ºF"
            currentWindEl.textContent = "Current Wind: " + data.wind.speed + " MPH"
            currentHumidityEl.textContent = "Current Humidity: " + data.main.humidity + "%"
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

*/
