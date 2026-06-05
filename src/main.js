import './style.css'
const weatherResults = document.getElementById('weatherResults');
const cityInput = document.getElementById('cityInput');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const getWeatherBtn = document.getElementById("getWeatherBtn");
const errorMessage = document.getElementById("errorMessage");
const errorSection = document.getElementById("errorSection");

let lang = "tr"
const API_KEY = "fee2409e94afe601cc737187d5b14da9";


async function GetWeather(sehir) {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&lang=${lang}&units=metric`);
    const data = await response.json();
    
    console.log(data);
    showWeatherData(data);
}

getWeatherBtn.addEventListener("click", function() {
    GetWeather(cityInput.value);

});


function showWeatherData(data){
    weatherResults.classList.remove("hidden");


}

function showError(msg){
    console.error(msg);
    errorSection.classList.remove("hidden");
    errorMessage.textContent = msg;
}

