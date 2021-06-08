document.getElementById("scheme-one").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.add("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.add("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "barcelona");
});

document.getElementById("scheme-two").addEventListener("click", () => {
  document.body.classList.add("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.add("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "blueHumans");
});

document.getElementById("scheme-three").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.add("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.add("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "beach");
});

document.getElementById("scheme-four").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.add("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.add("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "raptorize");
});

document.getElementById("scheme-five").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.add("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.add("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "cthuluRises");
});

document.getElementById("scheme-six").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.add("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.add("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "boringVolcano");
});

document.getElementById("scheme-seven").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.add("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.add("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "hackers");
});

document.getElementById("scheme-eight").addEventListener("click", () => {
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.add("cityByNight");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.add("cityByNight");
  localStorage.setItem("theme", "cityByNight");
});

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "blueHumans") {
  document.getElementById('scheme-two').checked = true;
} else if (currentTheme === "hackers") {
  document.getElementById('scheme-seven').checked = true;
} else if (currentTheme === "beach") {
  document.getElementById('scheme-three').checked = true;
} else if (currentTheme === "raptorize") {
  document.getElementById('scheme-four').checked = true;
} else if (currentTheme === "cthuluRises") {
  document.getElementById('scheme-five').checked = true;
} else if (currentTheme === "boringVolcano") {
  document.getElementById('scheme-six').checked = true;
} else if (currentTheme === "cityByNight") {
  document.getElementById('scheme-eight').checked = true;
} else if (currentTheme === "barcelona") {
  document.getElementById('scheme-one').checked = true;
} else {
  document.getElementById("scheme-one").checked = true;
}
