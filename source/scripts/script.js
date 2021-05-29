const currentThemeScript = localStorage.getItem("theme");
// TODO: Save sidebarOpen using IndexedDB, load it on page load, toggleMenu accordingly
let sidebarOpen = true;

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementsByTagName("main")[0];
  if (sidebarOpen) {
    sidebar.style.left = "calc(var(--sb-collapsed-width) - var(--sb-width))";
    main.style.marginLeft = "var(--sb-collapsed-width)";
    sidebarOpen = false;
  } else {
    sidebar.style.left = "0";
    main.style.marginLeft = "var(--sb-width)";
    sidebarOpen = true;
  }
}

document.getElementById("menubutton").onclick = toggleMenu;

if (currentThemeScript === "blueHumans") {
  document.body.classList.toggle("blueHumans");
  document.getElementById("sidebar").classList.toggle("blueHumans");
} else if (currentThemeScript === "hackers") {
  document.body.classList.toggle("hackers");
  document.getElementById("sidebar").classList.toggle("hackers");
} else if (currentThemeScript === "beach") {
  document.body.classList.toggle("beach");
  document.getElementById("sidebar").classList.toggle("beach");
} else if (currentThemeScript === "raptorize") {
  document.body.classList.toggle("raptorize");
  document.getElementById("sidebar").classList.toggle("raptorize");
} else if (currentThemeScript === "cthuluRises") {
  document.body.classList.toggle("cthuluRises");
  document.getElementById("sidebar").classList.toggle("cthuluRises");
} else if (currentThemeScript === "boringVolcano") {
  document.body.classList.toggle("boringVolcano");
  document.getElementById("sidebar").classList.toggle("boringVolcano");
} else if (currentThemeScript === "cityByNight") {
  document.body.classList.toggle("cityByNight");
  document.getElementById("sidebar").classList.toggle("cityByNight");
} else if (currentThemeScript === "barcelona") {
  document.body.classList.toggle("barcelona");
  document.getElementById("sidebar").classList.toggle("barcelona");
} else {
  document.body.classList.toggle("barcelona");
  document.getElementById("sidebar").classList.toggle("barcelona");
}
