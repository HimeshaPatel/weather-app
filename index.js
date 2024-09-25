let cityName = document.querySelector(".weather_city");
let weathreDateTime = document.querySelector(".weather_date_time");
let weathreForecast = document.querySelector(".weather_forecast");
let weatherIcon = document.querySelector(".weather_icon");
let weatherTemp = document.querySelector(".weather_temperature");
let weatherMin = document.querySelector(".weather_min");
let weatherMax = document.querySelector(".weather_max");
let weathreFeelsLike = document.querySelector(".weather_feelsLike");
let weathreHumadity = document.querySelector(".weather_humidity");
let weathreWind = document.querySelector(".weather_wind");
let weathrePressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector('.weather_search');



const getCountryName = (code) =>{
return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

const getDateTime = (dt) =>{

  const currDate = new Date(dt * 1000);
  console.log('currDate', currDate)

  const options = {
    weekday: "long",
    year: 'numeric',
    month: 'long',
    day:'numeric',
    hour:'numeric',
    minute:'numeric'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  console.log('first', formatter)
  return formatter.format(dt);

}

let city = "surat";

citySearch.addEventListener('submit', (e) =>{
  e.preventDefault();
  let cityName = document.querySelector(".city_name");
  console.log('cityName', cityName.value);
  city = cityName.value;
  getWeathreData();
  cityName.value = "";
});


const getWeathreData = async () => {
  const weathreURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a1d2d0794bc2e5da64ca5fd75af8dc0`;
  try {
    const res = await fetch(weathreURL);
    const data = await res.json();
    console.log("first", data);

    const {main, name, weather, wind, sys, dt, } = data

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    weathreDateTime.innerHTML = getDateTime();
    weatherTemp.innerHTML = `${main.temp}&#176`;
    weathreForecast.innerHTML = weather[0].main;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    weatherMin.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    weatherMax.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
    weathreFeelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`;
    weathreHumadity.innerHTML = main.humidity;
    weathreWind.innerHTML = wind.speed; 
    weathrePressure.innerHTML = main.pressure;

    
 
  } catch (error) {
    console.log("error");
  }
};

document.body.addEventListener("submit", getWeathreData());
