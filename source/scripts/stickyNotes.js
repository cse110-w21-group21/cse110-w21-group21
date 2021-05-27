let addNote = document.getElementById('note-add-btn');
let mainNote = document.querySelectorAll('.note');
let noteContainer = document.getElementById('sticky-note-container');
let colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
let numberOfStickies = 0;

let redButton = document.querySelectorAll('#sticky-btn-red');
let orangeButton = document.querySelectorAll('#sticky-btn-orange');
let yellowButton = document.querySelectorAll('#sticky-btn-yellow');
let greenButton = document.querySelectorAll('#sticky-btn-green');
let blueButton = document.querySelectorAll('#sticky-btn-blue');
let purpleButton = document.querySelectorAll('#sticky-btn-purple');
let deleteButton = document.querySelectorAll('#sticky-btn-delete')

function reloadVariables() {
    mainNote = document.querySelectorAll('.note');
    redButton = document.querySelectorAll('#sticky-btn-red');
    orangeButton = document.querySelectorAll('#sticky-btn-orange');
    yellowButton = document.querySelectorAll('#sticky-btn-yellow');
    greenButton = document.querySelectorAll('#sticky-btn-green');
    blueButton = document.querySelectorAll('#sticky-btn-blue');
    purpleButton = document.querySelectorAll('#sticky-btn-purple');
    deleteButton = document.querySelectorAll('#sticky-btn-delete');
}

function onClickColorBtn(num, color) {
    mainNote[num].className = 'note note-' + color;
}

function addEventListenerColorBtn(i) {
    redButton[i].addEventListener('click',function() {
        onClickColorBtn(i, 'red');
    });

    orangeButton[i].addEventListener('click', function() {
        onClickColorBtn(i, 'orange');
    });

    yellowButton[i].addEventListener('click', function() {
        onClickColorBtn(i, 'yellow');
    });

    greenButton[i].addEventListener('click', function() {
        onClickColorBtn(i, 'green');
    });

    blueButton[i].addEventListener('click', function() {
        onClickColorBtn(i, 'blue');
    });

    purpleButton[i].addEventListener('click', function() {
        onClickColorBtn(i, 'purple');
    });

    // TODO: fix the error that occurs when deleting the last note
    deleteButton[i].addEventListener('click', function() {
        if (numberOfStickies > 0) {
            mainNote[i].remove();
            numberOfStickies = numberOfStickies - 1;
            reloadVariables();
        }
    });
}

addEventListenerColorBtn(numberOfStickies);

purpleButton[0].addEventListener('click', function() {
    onClickColorBtn(0, 'purple');
});

addNote.addEventListener('click', function() {
    let cloneMainNote = mainNote[numberOfStickies].cloneNode(true);
    let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    cloneMainNote.querySelectorAll('input')[0].value = '';
    cloneMainNote.querySelectorAll('textarea')[0].value = '';
    cloneMainNote.className = 'note note-' + randomColor; 
    noteContainer.appendChild(cloneMainNote);
    reloadVariables();
    numberOfStickies = numberOfStickies + 1;
    addEventListenerColorBtn(numberOfStickies);
});