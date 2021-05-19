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
if (currentTheme == "dark") {
    document.body.classList.toggle("dark");
} else if (currentTheme == "light") {
    document.body.classList.toggle("light");
} else if (currentTheme == "invertedText") {
    document.body.classList.toggle("invertedText"); 
}