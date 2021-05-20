/* eslint-disable */

window.onload = () => {
    createDB();
};

document.getElementById("btnViewNote").addEventListener("click", (event) => {
    viewNote(event,true);
});