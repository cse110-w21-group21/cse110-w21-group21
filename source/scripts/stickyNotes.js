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

let onClickColorBtn = function (num, color) {
    mainNote[num].className = 'note note-' + color;
}

let handlers = new Map();

function addEventListenerColorBtn(i) {

    let wrapAddRedBtn = onClickColorBtn.bind(null, i, 'red');
    let wrapAddOrangeBtn = onClickColorBtn.bind(null, i, 'orange');
    let wrapAddYellowBtn = onClickColorBtn.bind(null, i, 'yellow');
    let wrapAddGreenBtn = onClickColorBtn.bind(this, i, 'green');
    let wrapAddBlueBtn = onClickColorBtn.bind(this, i, 'blue');
    let wrapAddPurpleBtn = onClickColorBtn.bind(this, i, 'purple');

    handlers.set(i, [wrapAddRedBtn, wrapAddOrangeBtn, wrapAddYellowBtn, wrapAddGreenBtn, wrapAddBlueBtn, wrapAddPurpleBtn]);

    redButton[i].addEventListener('click', wrapAddRedBtn, false);
    orangeButton[i].addEventListener('click', wrapAddOrangeBtn, false);
    yellowButton[i].addEventListener('click', wrapAddYellowBtn, false);
    greenButton[i].addEventListener('click', wrapAddGreenBtn, false);
    blueButton[i].addEventListener('click', wrapAddBlueBtn, false);
    purpleButton[i].addEventListener('click', wrapAddPurpleBtn, false);
}

function removeEventListenerColorBtn(i) {
    redButton[i].removeEventListener('click', handlers.get(i)[0], false);
    orangeButton[i].removeEventListener('click', handlers.get(i)[1], false);
    yellowButton[i].removeEventListener('click', handlers.get(i)[2], false);
    greenButton[i].removeEventListener('click', handlers.get(i)[3], false);
    blueButton[i].removeEventListener('click', handlers.get(i)[4], false);
    purpleButton[i].removeEventListener('click', handlers.get(i)[5], false);
    handlers.delete(i);
}

function addEventListenerDeleteBtn(i) {
    
    deleteButton[i].addEventListener('click', function() {

        if (numberOfStickies === 0) {
            alert("cannot remove the last note!");
        } else {
            let j;
            for (j = 0; j <= numberOfStickies; j++) {
                removeEventListenerColorBtn(j);
            }
            // remove sticky
            mainNote[i].remove();
            numberOfStickies = numberOfStickies - 1;
            // reload variables
            reloadVariables();
            // add color button listeners for the rest of page
            for (j = 0; j <= numberOfStickies; j++) {
                addEventListenerColorBtn(j);
            }
        }
    });
}

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
    addEventListenerDeleteBtn(numberOfStickies);
});

// setting up the first note on the page
addEventListenerColorBtn(0);
addEventListenerDeleteBtn(0);