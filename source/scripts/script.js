//const { doc } = require("prettier");

// TODO: Save sidebarOpen using IndexedDB, load it on page load, toggleMenu accordingly
let sidebarOpen = true;

function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementsByTagName('main')[0];
  if (sidebarOpen) {
    sidebar.style.left = 'calc(var(--sb-collapsed-width) - var(--sb-width))';
    main.style.marginLeft = 'var(--sb-collapsed-width)';
    sidebarOpen = false;
  } else {
    sidebar.style.left = '0';
    main.style.marginLeft = 'var(--sb-width)';
    sidebarOpen = true;
  }
}

document.getElementById('menubutton').onclick = toggleMenu;

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "blueHumans") {
  document.body.classList.toggle("blueHumans");
  document.getElementById('sidebar').classList.toggle('blueHumans');
  document.getElementById('scheme-two').checked = true;
} else if (currentTheme === "hackers") {
  document.body.classList.toggle("hackers");
  document.getElementById('sidebar').classList.toggle('hackers');
  document.getElementById('scheme-seven').checked = true;
} else if (currentTheme === "beach") {
  document.body.classList.toggle("beach");
  document.getElementById('sidebar').classList.toggle('beach');
  document.getElementById('scheme-three').checked = true;
} else if (currentTheme === "raptorize") {
  document.body.classList.toggle("raptorize");
  document.getElementById('sidebar').classList.toggle('raptorize');
  document.getElementById('scheme-four').checked = true;
} else if (currentTheme === "cthuluRises") {
  document.body.classList.toggle("cthuluRises");
  document.getElementById('sidebar').classList.toggle('cthuluRises');
  document.getElementById('scheme-five').checked = true;
} else if (currentTheme === "boringVolcano") {
  document.body.classList.toggle("boringVolcano");
  document.getElementById('sidebar').classList.toggle('boringVolcano'); 
  document.getElementById('scheme-six').checked = true;
} else if (currentTheme === "cityByNight") {
  document.body.classList.toggle("cityByNight");
  document.getElementById('sidebar').classList.toggle('cityByNight'); 
  document.getElementById('scheme-eight').checked = true;
} else if (currentTheme === "barcelona") {
  document.body.classList.toggle("barcelona");
  document.getElementById('sidebar').classList.toggle('barcelona');
  document.getElementById('scheme-one').checked = true;
} else {
  document.body.classList.toggle("barcelona");
  document.getElementById('sidebar').classList.toggle('barcelona');
  document.getElementById('scheme-one').checked = true;
} 