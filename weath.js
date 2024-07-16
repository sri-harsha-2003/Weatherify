let loc = document.getElementById("location");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let humidity = document.getElementById("humidity");
let windspeed = document.getElementById("windspeed");
let sunrise=document.getElementById("sunrise");
let sunset=document.getElementById("sunset");
//let rain1=document.getElementById("rain1h");
//let rain3=document.getElementById("rain3h");
let iconfile;
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("go");
var body = document.getElementsByTagName('body')[0];
searchButton.addEventListener('click', (e) => {

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';


});

function convertToIST(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime;
  }

const getWeather = async (city) => {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=26e687985d8c88e21a805daf7cd39d45`, { mode: 'cors' });
        const weatherData = await response.json();
        console.log("line26",weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        const humid = weatherData.main.humidity;
        //const rai1=weatherData.rain.rain1h;
        console.log("humidity",humidity)
        const wind = weatherData.wind.speed;
        // const sunri=weatherData.
        let timestamp = weatherData.sys.sunrise;
        let ISTTime = convertToIST(timestamp);
        sunrise.textContent =`Sunrise:${ ISTTime}`;
        console.log("ISTTime",ISTTime);
        let timestamps = weatherData.sys.sunset;
        let ISTTimes = convertToIST(timestamps);
        sunset.textContent = `Sunset:${ISTTimes}`;
        loc.textContent = name;
        climate.textContent = main; 
        windspeed.textContent = `WindSpeed : ${wind}`;
        humidity.textContent = `Humidity:${humid}%`;
        tempvalue.textContent = Math.round(feels_like - 273);
        console.log("weatherData.weather[0]",weatherData.weather[0].main)
        if(weatherData.weather[0].main==='Mist'){
            console.log("hi",humidity);
            body.style.backgroundImage = 'url(fog.gif)';
        }else if(weatherData.weather[0].main==='Clouds'){
            console.log("clouds0----------------")
            body.style.backgroundImage = 'url(clouds1.gif)';
        }else if(weatherData.weather[0].main==='Fog'){
            console.log("clouds0----------------")
            body.style.backgroundImage = 'url(fog.gif)';
        }else if(weatherData.weather[0].main==='Drizzle'){
            console.log("clouds0----------------")
            body.style.backgroundImage = 'url(drizzle.gif)';
        }else if(weatherData.weather[0].main==='Snow'){
            console.log("clouds0----------------")
            body.style.backgroundImage = 'url(snow.gif)';
        }
        else if(weatherData.weather[0].main==='Clear'){
            console.log("clouds0----------------")
            body.style.backgroundImage = 'url(clear.gif)';

        } else if(weatherData.weather[0].main==='Haze'){
            console.log("clouds0----------------")
            body.style.backgroundImage = 'url(Haze.gif)';
            
        }
        else{
            body.style.backgroundImage = 'url(rain.gif)';
        }

    }
    catch (error) {
        alert('city not found');
    }
};

