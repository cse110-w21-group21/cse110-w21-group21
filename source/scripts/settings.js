/**
 * select color scheme light
 */
 document.getElementById("scheme-light").addEventListener("click", () => {
  document.body.classList.add("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.add("light");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "light");
});

/**
 * select color scheme dark
 */
 document.getElementById("scheme-dark").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.add("dark");
  document.getElementById("sidebar").classList.add("dark");
  document.getElementById("sidebar").classList.remove("light");
  document.getElementById("sidebar").classList.remove("blueHumans");
  document.getElementById("sidebar").classList.remove("barcelona");
  document.getElementById("sidebar").classList.remove("hackers");
  document.getElementById("sidebar").classList.remove("beach");
  document.getElementById("sidebar").classList.remove("raptorize");
  document.getElementById("sidebar").classList.remove("cthuluRises");
  document.getElementById("sidebar").classList.remove("boringVolcano");
  document.getElementById("sidebar").classList.remove("cityByNight");
  localStorage.setItem("theme", "dark");
});

/**
 * select color scheme one
 */
document.getElementById("scheme-one").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.add("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme two
 */
document.getElementById("scheme-two").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.add("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme three
 */
document.getElementById("scheme-three").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.add("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme four
 */
document.getElementById("scheme-four").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.add("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme five
 */
document.getElementById("scheme-five").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.add("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme six
 */
document.getElementById("scheme-six").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.add("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme seven
 */
document.getElementById("scheme-seven").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.add("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.remove("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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

/**
 * select color scheme eight
 */
document.getElementById("scheme-eight").addEventListener("click", () => {
  document.body.classList.remove("light");
  document.body.classList.remove("blueHumans");
  document.body.classList.remove("barcelona");
  document.body.classList.remove("hackers");
  document.body.classList.remove("beach");
  document.body.classList.remove("raptorize");
  document.body.classList.remove("cthuluRises");
  document.body.classList.remove("boringVolcano");
  document.body.classList.add("cityByNight");
  document.body.classList.remove("dark");
  document.getElementById("sidebar").classList.remove("dark");
  document.getElementById("sidebar").classList.remove("light");
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
} else if (currentTheme === "light") {
  document.getElementById('scheme-light').checked = true;
} else if (currentTheme === "dark") {
  document.getElementById('scheme-dark').checked = true;
} else {
  document.getElementById("scheme-light").checked = true;
}
