const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const dateText = document.getElementById("date");

const themeToggle = document.getElementById("themeToggle");

const alarmInput = document.getElementById("alarmTime");

const alarmSound = document.getElementById("alarmSound");

let alarmTime = null;


/* CLOCK */

function updateClock(){

let now = new Date();

let h = String(now.getHours()).padStart(2,'0');
let m = String(now.getMinutes()).padStart(2,'0');
let s = String(now.getSeconds()).padStart(2,'0');

hours.textContent = h;
minutes.textContent = m;
seconds.textContent = s;

dateText.textContent = now.toDateString();

/* ALARM CHECK */

let currentTime = `${h}:${m}`;

if(alarmTime === currentTime){

alarmSound.play();

alert("Alarm ringing!");

alarmTime = null;

}

/* WORLD CLOCK */

document.getElementById("india").textContent =
"India: " + new Date().toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata"});

document.getElementById("newyork").textContent =
"New York: " + new Date().toLocaleTimeString("en-US",{timeZone:"America/New_York"});

document.getElementById("london").textContent =
"London: " + new Date().toLocaleTimeString("en-GB",{timeZone:"Europe/London"});

document.getElementById("tokyo").textContent =
"Tokyo: " + new Date().toLocaleTimeString("ja-JP",{timeZone:"Asia/Tokyo"});

}

setInterval(updateClock,1000);


/* SET ALARM */

document.getElementById("setAlarm").addEventListener("click",()=>{

alarmTime = alarmInput.value;

alert("Alarm set for " + alarmTime);

});


/* TIMER */

let timerInterval;

document.getElementById("startTimer").addEventListener("click",()=>{

let minutes = document.getElementById("timerMinutes").value;

let seconds = minutes * 60;

clearInterval(timerInterval);

timerInterval = setInterval(()=>{

let m = Math.floor(seconds/60);

let s = seconds % 60;

document.getElementById("timerDisplay").textContent =
`${m}:${s.toString().padStart(2,'0')}`;

seconds--;

if(seconds < 0){

clearInterval(timerInterval);

alert("Timer finished!");

}

},1000);

});


/* THEME */

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});


/* WEATHER USING GEOLOCATION */

navigator.geolocation.getCurrentPosition(position=>{

let lat = position.coords.latitude;

let lon = position.coords.longitude;

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(res=>res.json())
.then(data=>{

document.getElementById("weather").textContent =
"Temperature: " + data.current_weather.temperature + "°C";

});

});