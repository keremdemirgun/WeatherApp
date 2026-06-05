import './style.css'
const weatherResults = document.getElementById('weatherResults');
const cityInput = document.getElementById('cityInput');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const getWeatherBtn = document.getElementById("getWeatherBtn");
const errorMessage = document.getElementById("errorMessage");
const errorSection = document.getElementById("errorSection");
const cityName = document.getElementById("cityName");

let lang = "tr"
const API_KEY = "fee2409e94afe601cc737187d5b14da9";


async function getWeather(sehir) {

    if(cityInput.value.trim() == ""){
        showError("Lütfen şehir kısmını boş bırakmayınız.");
        
    }
    else{
        weatherResults.classList.add("hidden");
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&lang=${lang}&units=metric`);
        const data = await response.json();
        
        console.log(data);
        showWeatherData(data);
    }


}

getWeatherBtn.addEventListener("click", function() {
    getWeather(cityInput.value);

});


function showWeatherData(data){
    if(data.message == "city not found"){
        showError("Şehir bulunamadı.");
    }
    else{
        errorSection.classList.add("hidden");
        weatherResults.classList.remove("hidden");
        cityName.textContent = data.name;
        temp.textContent = data.main.feels_like + "°";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }



}

function showError(msg){
    weatherResults.classList.add("hidden");
    console.error(msg);
    errorSection.classList.remove("hidden");
    errorMessage.textContent = msg;
}

