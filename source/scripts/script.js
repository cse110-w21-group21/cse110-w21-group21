// TODO: Save sidebarOpen using IndexedDB, load it on page load, toggleMenu accordingly
let sidebarOpen = true;

function toggleMenu() {
  let sidebar = document.getElementById("sidebar");
  let main = document.getElementsByTagName("main")[0];
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