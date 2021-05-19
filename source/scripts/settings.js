/*eslint-disable*/
document.getElementById('one').addEventListener('click', () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    document.body.classList.remove("invertedText");
    localStorage.setItem("theme", "light");
});

document.getElementById('two').addEventListener('click', () => {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    document.body.classList.remove("invertedText");
    localStorage.setItem("theme", "dark");
});

document.getElementById('three').addEventListener('click', () => {
    document.body.classList.remove("dark");
    document.body.classList.remove("light");
    document.body.classList.add("invertedText");
    localStorage.setItem("theme", "invertedText");
});