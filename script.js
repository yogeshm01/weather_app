const apiKey = '0e3c725737e84b47e493b6ed818000bd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const bgVideo = document.getElementById('bgVideo');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + '&appid=' + apiKey);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    
    else {
        let data = await response.json();

        document.querySelector('.city').innerText = data.name;
        document.querySelector('.temp').innerText = data.main.temp + '°C';
        document.querySelector('.humidity').innerText = data.main.humidity + '%';
        document.querySelector('.wind').innerText = data.wind.speed + 'km/h';

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png';

        }
        else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';

        }
        else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';

        }
        else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';

        }
        else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';

        }
        // console.log('Selected Video:', videoSrc);  // Debugging line
        // bgVideo.src = videoSrc;

        // // Play the video
        // bgVideo.load();
        // bgVideo.play();

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';

    }

}

searchBtn.addEventListener('click', () => {
    if (searchBox.value.trim()) {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && searchBox.value.trim()) {
        checkWeather(searchBox.value);
    }
});

// Auto-focus on input field
document.getElementById('cityInput').focus();

checkWeather();

function changeBackground() {
    // Randomly select a percentage for the transition
    const percentage = Math.random() * 100;

    // Determine the two gradient colors based on percentage
    const startColor = percentage < 50 ? '#00aaff' : '#87ceeb'; // Start with cyan or light blue
    const endColor = percentage < 50 ? '#87ceeb' : '#00aaff';   // End with light blue or cyan

    // Apply the gradient to the body
    document.body.style.background = `linear-gradient(to bottom, ${startColor}, ${endColor})`;
  }

  // Set interval to change background every 5 seconds
  setInterval(changeBackground, 5000);

  // Initially call the function to set the first background
  changeBackground();