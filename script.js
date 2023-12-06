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

//*ID's for each unordered list box for five day forecast
let dayOneIDEl = document.querySelector("#dayOneID")
let dayTwoIDEl = document.querySelector("#dayTwoID")
let dayThreeIDEl = document.querySelector("#dayThreeID")
let dayFourIDEl = document.querySelector("#dayFourID")
let dayFiveIDEl = document.querySelector("#dayFiveID")

//*Calling the array within the API fetch to loop over adding boxes for each day
let fiveDayArray = [dayOneIDEl, dayTwoIDEl, dayThreeIDEl, dayFourIDEl, dayFiveIDEl]


// Figure out how to loop this so each day doesn't need variables

 
//TODO: Create a function here to pull the local storage if page is refreshed.



//allows text to stay and not disappear since submit buttons typically erase all content after submit has been actioned
function handleSubmitAction(e) {
    e.preventDefault()
    let city = document.querySelector("#cityText").value.trim()
    //TODO: Figure out how to make an || statement in line 61, need it to return nothing if API 404's.
    if (city === "") {
        return
    }
    else {
        fetchWeather(city)
        //TODO: take the city value and make local storage here to append to button list.
        //TODO: fix this loop, I need to check if the searched item already exists within the buttons somehow.
                let historyListEl = document.querySelector("#historyTracker")
                let newBtn = document.createElement("button")
                newBtn.setAttribute('type', 'button')
                newBtn.setAttribute('class',"list-group-item list-group-item-action m-1" )
                historyListEl.append(newBtn)
                newBtn.textContent = city
                newBtn.addEventListener("click", function() {
                    fetchWeather(city)
                })
            } 
        }   
//     }
// }        //localStorage.setItem("city", city)
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
        
        const {lat,lon} = data.coord
        const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        fetch(weatherAPI).then(function(response) {
            console.log(response)
            return response.json()
        }).then(function(data) {
            console.log(data)
            let dayOneCounter = 10
            let dayTwoCounter = 18
            let dayThreeCounter = 26
            let dayFourCounter = 34
            let dayFiveCounter = 39
            countArray = [dayOneCounter, dayTwoCounter, dayThreeCounter, dayFourCounter, dayFiveCounter]
            for (let i = 0; i < 5; i++) {        
                let nextDayDate = document.createElement("h5")
                let nextDayTemp = document.createElement("li")
                let nextDayWind = document.createElement("li")
                let nextDayHumidity = document.createElement("li")  
                fiveDayArray[i].append(nextDayDate)
                fiveDayArray[i].append(nextDayTemp)
                fiveDayArray[i].append(nextDayWind)
                fiveDayArray[i].append(nextDayHumidity)
                nextDayDate.textContent = data.list[countArray[i]].dt_txt
                nextDayTemp.textContent = "Current Temp: " + Math.round(data.list[countArray[i]].main.temp) + "ºF"
                nextDayWind.textContent = "Current Wind: " + data.list[countArray[i]].wind.speed + "MPH"
                nextDayHumidity.textContent = "Current Humidity: " + data.list[countArray[i]].main.humidity + "%"
            }
        })
    })
}
//below is current weather for the emoji icons
// var iconUrl = src=`https://openweathermap.org/img/w/${data}.weather[0].icon}.png`;

//selecting the form
document.querySelector("#submitCityQuery").addEventListener("submit", handleSubmitAction)





/* PseudoCode
    #What do I only give a shit about?
        *Looping over each days Date, Temp, Wind, and Humidity
        *Create a loop using the array of the API given
*/
