import './style.css'

const weatherResults = document.getElementById('weatherResults');
const cityInput = document.getElementById('cityInput');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const weatherForm = document.querySelector('form');

let lang = "tr";
const API_KEY = "";

async function getWeather(sehir) {
    const trimmedCity = sehir.trim();
    
    if (trimmedCity === "") {
        showError("Lütfen şehir kısmını boş bırakmayınız.");
        return;
    }

    try {
        weatherResults.classList.add("hidden");
        errorSection.classList.add("hidden");
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&lang=${lang}&units=metric`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showError("Şehir bulunamadı.");
            } else {
                showError("Bir hata oluştu, lütfen sonra tekrar deneyin.");
            }
            return;
        }

        const data = await response.json();
        console.log(data);
        showWeatherData(data);

    } catch (error) {
        showError("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
        console.error(error);
    }
}

weatherForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    getWeather(cityInput.value);
});

function showWeatherData(data) {
    errorSection.classList.add("hidden");
    weatherResults.classList.remove("hidden");
    
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°C"; 
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute("alt", data.weather[0].description);
}

function showError(msg) {
    weatherResults.classList.add("hidden");
    errorSection.classList.remove("hidden");
    errorMessage.textContent = msg;
}