//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidity =document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    //Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description"),
    // currentCity = "Cairo",
    apiResponse,
    responseData,
    monthName = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Des"],
    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    
    async function getWeatherData(currentCity='Cairo'){
      apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
      responseData = await apiResponse.json();

      console.log(responseData);
      displayTodayWeather();
      displayNextDayWeather();
    }
    
    getWeatherData();


    function displayTodayWeather (){
      let date = new Date();
      today.innerHTML = days[date.getDay()];
      todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
      cityLocation.innerHTML = responseData.location.name;
      todayDegree.innerHTML = responseData.current.temp_c;
      todayIcon.setAttribute("src", `http:${responseData.current.condition.icon}`) ;
      description.innerHTML = responseData.current.condition.text;
      humidity.innerHTML = responseData.current.humidity;
      wind.innerHTML = responseData.current.wind_kph;
      compass.innerHTML = responseData.current.wind_dir;
    }


    function displayNextDayWeather(){
      
      for (let index = 0; index < nextDay.length; index++) {
        nextDay[index].innerHTML = days[new Date(responseData.forecast.forecastday[index+1].date).getDay()];
        nextDayIcon[index].setAttribute("src",`https:${responseData.forecast.forecastday[index+1].day.condition.icon}`);
        maxDegree[index].innerHTML = responseData.forecast.forecastday[index+1].day.maxtemp_c;
        minDegree[index].innerHTML = responseData.forecast.forecastday[index+1].day.mintemp_c;
        nextDayDescription[index].innerHTML = responseData.forecast.forecastday[index+1].day.condition.text;  
      }
    }

    

    searchBar.addEventListener("keyup", function(){
      currentCity = searchBar.value;
      getWeatherData(currentCity)
    })

