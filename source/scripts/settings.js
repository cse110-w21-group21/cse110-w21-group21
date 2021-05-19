document.getElementById('one').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.add("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.remove("beach");
    document.body.classList.remove("raptorize"); 
    document.body.classList.remove("cthuluRises");
    document.body.classList.remove("boringVolcano");  
    document.body.classList.remove("cityByNight"); 
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.add("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "barcelona");
});

document.getElementById('two').addEventListener('click', () => {
    document.body.classList.add("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.remove("beach");
    document.body.classList.remove("raptorize");
    document.body.classList.remove("cthuluRises");  
    document.body.classList.remove("boringVolcano"); 
    document.body.classList.remove("cityByNight"); 
    document.getElementById('sidebar').classList.add("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "blueHumans");
});

document.getElementById('three').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.add("beach");
    document.body.classList.remove("raptorize"); 
    document.body.classList.remove("cthuluRises");
    document.body.classList.remove("boringVolcano");
    document.body.classList.remove("cityByNight");   
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.add("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "beach");
});

document.getElementById('four').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.remove("beach");
    document.body.classList.add("raptorize"); 
    document.body.classList.remove("cthuluRises"); 
    document.body.classList.remove("boringVolcano"); 
    document.body.classList.remove("cityByNight"); 
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.add("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "raptorize");
});

document.getElementById('five').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.remove("beach");
    document.body.classList.remove("raptorize"); 
    document.body.classList.add("cthuluRises"); 
    document.body.classList.remove("boringVolcano"); 
    document.body.classList.remove("cityByNight"); 
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.add("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "cthuluRises");
});

document.getElementById('six').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.remove("beach");
    document.body.classList.remove("raptorize"); 
    document.body.classList.remove("cthuluRises"); 
    document.body.classList.add("boringVolcano"); 
    document.body.classList.remove("cityByNight"); 
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.add("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "boringVolcano");
});

document.getElementById('seven').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.add("hackers");
    document.body.classList.remove("beach");
    document.body.classList.remove("raptorize"); 
    document.body.classList.remove("cthuluRises"); 
    document.body.classList.remove("boringVolcano"); 
    document.body.classList.remove("cityByNight"); 
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.add("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.remove("cityByNight");
    localStorage.setItem("theme", "hackers");
});

document.getElementById('eight').addEventListener('click', () => {
    document.body.classList.remove("blueHumans");
    document.body.classList.remove("barcelona");
    document.body.classList.remove("hackers");
    document.body.classList.remove("beach");
    document.body.classList.remove("raptorize"); 
    document.body.classList.remove("cthuluRises"); 
    document.body.classList.remove("boringVolcano"); 
    document.body.classList.add("cityByNight"); 
    document.getElementById('sidebar').classList.remove("blueHumans");
    document.getElementById('sidebar').classList.remove("barcelona");
    document.getElementById('sidebar').classList.remove("hackers");
    document.getElementById('sidebar').classList.remove("beach");
    document.getElementById('sidebar').classList.remove("raptorize");
    document.getElementById('sidebar').classList.remove("cthuluRises");
    document.getElementById('sidebar').classList.remove("boringVolcano");
    document.getElementById('sidebar').classList.add("cityByNight");
    localStorage.setItem("theme", "cityByNight");
});