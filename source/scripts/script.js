// db.js contains createDB, addNote, viewNote, updateNote
// TODO: Save sidebarOpen using IndexedDB, load it on page load, toggleMenu accordingly
let sidebarOpen = true;



// test comment
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

window.onload = () => {
  document.getElementById('menubutton').onclick = toggleMenu;
}