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
let currentIconEl = document.createElement("img")

currentWeatherListEl.append(currentTempEL)
currentWeatherListEl.append(currentWindEl)
currentWeatherListEl.append(currentHumidityEl)
currentWeatherListEl.append(currentIconEl)

currentTempEL.textContent = "Temp: "
currentWindEl.textContent = "Wind: "
currentHumidityEl.textContent = "Humidity: "

// *FIVE DAY SECTION
//5-Day Forecast Header that will be used as the parent to the li children weather info
let fiveDayHeaderEl = document.querySelector("#fiveDayHeader")
    fiveDayHeaderEl.textContent = "5-Day Forecast:"

//*ID's for each unordered list box for five day forecast
let dayOneIDEl = document.querySelector("#dayOneID")
let dayTwoIDEl = document.querySelector("#dayTwoID")
let dayThreeIDEl = document.querySelector("#dayThreeID")
let dayFourIDEl = document.querySelector("#dayFourID")
let dayFiveIDEl = document.querySelector("#dayFiveID")
let groupedForecastListEl = document.querySelector("#groupedFiveDay")

//*Calling the array within the API fetch to loop over adding boxes for each day
let fiveDayArray = [dayOneIDEl, dayTwoIDEl, dayThreeIDEl, dayFourIDEl, dayFiveIDEl]



//allows text to stay and not disappear since submit buttons typically erase all content after submit has been actioned
function handleSubmitAction(e) {
    e.preventDefault()
    let city = document.querySelector("#cityText").value.trim()
    if (city === "") {
        return
    }
    else {
        fetchWeather(city)
                let historyListEl = document.querySelector("#historyTracker")
                let newBtn = document.createElement("button")
                let historyArray = []
                newBtn.setAttribute('type', 'button')
                newBtn.setAttribute('class',"list-group-item list-group-item-action m-1" )
                historyListEl.append(newBtn)
                newBtn.textContent = city
                historyArray.push(newBtn)
                console.log(historyArray)
                newBtn.addEventListener("click", function() {
                    fetchWeather(city)
                })
            } 
        }   

const apiKey = `64205da5f805a7fb413caa37e89fd954`

function fetchWeather (city) {
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(currentWeather)
    .then(function(response) {
        if (response.status !== 200) {
            alert("Not a valid city")
        } 
        return response.json()
    }) .then(function(data) {
            console.log(data)
            console.log(data.main.temp)
            selectedCityTitle.textContent = data.name + ": " + dayjs().format('M/D/YYYY')  
            currentTempEL.textContent = "Current Temp: " + Math.round(data.main.temp) + "ºF"
            currentWindEl.textContent = "Current Wind: " + data.wind.speed + " MPH"
            currentHumidityEl.textContent = "Current Humidity: " + data.main.humidity + "%"
            currentIconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            currentIconEl.classList.add('bg-primary', 'border', 'rounded')
            console.log(currentIconEl)
            const {lat,lon} = data.coord
        const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        fetch(weatherAPI).then(function(response) {
            console.log(response)
            return response.json()
        }).then(function(data) {
            console.log(data)
            let dayOneCounter = 3
            let dayTwoCounter = 11
            let dayThreeCounter = 19
            let dayFourCounter = 27
            let dayFiveCounter = 35
            countArray = [dayOneCounter, dayTwoCounter, dayThreeCounter, dayFourCounter, dayFiveCounter]
            for (let i = 0; i < 5; i++) {
                groupedForecastListEl.classList.remove("d-none")
                fiveDayArray[i].textContent = " "
                let nextDayDate = document.createElement("h5")
                let weatherIcon = document.createElement("img")
                let nextDayTemp = document.createElement("li")
                let nextDayWind = document.createElement("li")
                let nextDayHumidity = document.createElement("li")  
                fiveDayArray[i].append(nextDayDate)
                fiveDayArray[i].append(weatherIcon)
                fiveDayArray[i].append(nextDayTemp)
                fiveDayArray[i].append(nextDayWind)
                fiveDayArray[i].append(nextDayHumidity)
                var unixDate = dayjs.unix(data.list[countArray[i]].dt)
                nextDayDate.textContent = (unixDate.format('MMMM D')) + ":"
                console.log(nextDayDate)
                nextDayTemp.textContent = "Est. Temp: " + Math.round(data.list[countArray[i]].main.temp) + "ºF"
                nextDayWind.textContent = "Est. Wind: " + data.list[countArray[i]].wind.speed + "MPH"
                nextDayHumidity.textContent = "Est. Humidity: " + data.list[countArray[i]].main.humidity + "%"
                weatherIcon.classList.add('bg-primary', 'border', 'rounded')
                weatherIcon.src = `https://openweathermap.org/img/w/${data.list[countArray[i]].weather[0].icon}.png`
            }
        })
    })
}

//selecting the form
document.querySelector("#submitCityQuery").addEventListener("submit", handleSubmitAction)

