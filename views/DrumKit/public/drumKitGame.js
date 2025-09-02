
// method 1
// syncronized arrays

const buttons_1 = [
    document.querySelector("#a_drum"),
    document.querySelector("#s_drum"),
    document.querySelector("#d_drum"),
    document.querySelector("#f_drum"),
    document.querySelector("#j_drum"),
    document.querySelector("#k_drum"),
    document.querySelector("#l_drum")
];

const sounds_1 = [
    new Audio("./sounds/tom-1.mp3"),
    new Audio("./sounds/tom-2.mp3"),
    new Audio("./sounds/tom-3.mp3"),
    new Audio("./sounds/tom-4.mp3"),
    new Audio("./sounds/snare.mp3"),
    new Audio("./sounds/crash.mp3"),
    new Audio("./sounds/kick-bass.mp3")
];

function setButtonStyleToReleased_1(targetButton) {
    targetButton.classList.remove("drumPressed");
    targetButton.classList.add("drumReleased");
}

function setButtonStyleToPressed_1(targetButton) {
    targetButton.classList.add("drumPressed");
    targetButton.classList.remove("drumReleased");
}

function resetAllButtonStyles_1() {
    for (let y = 0; y < buttons_1.length; y += 1) {
        setButtonStyleToReleased_1(buttons_1[y]);
    }
}

function bindButtonEvents_1() {

    for (let x = 0; x < buttons_1.length; x += 1) {
        buttons_1[x].addEventListener('click', () => {
            sounds_1[x].currentTime = 0;
            sounds_1[x].play();
            setButtonStyleToPressed_1(buttons_1[x]);
            setTimeout(() => {
                setButtonStyleToReleased_1(buttons_1[x]);
            }, 100);
        })
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a':
                buttons_1[0].click();
                break;
            case 's':
                buttons_1[1].click();
                break;
            case 'd':
                buttons_1[2].click();
                break;
            case 'f':
                buttons_1[3].click();
                break;
            case 'j':
                buttons_1[4].click();
                break;
            case 'k':
                buttons_1[5].click();
                break;
            case 'l':
                buttons_1[6].click();
                break;
        }
    })
}

// method 2
// objects and a factory function

function ButtonData(htmlTagId, soundFileName, key) {
    this.button = document.querySelector("#" + htmlTagId);
    this.sound = new Audio("./sounds/" + soundFileName);
    this.key = key;
    this.setButtonStyleToReleased = () => {
        this.button.classList.remove("drumPressed");
        this.button.classList.add("drumReleased");
    }
    this.setButtonStyleToPressed = () => {
        this.button.classList.add("drumPressed");
        this.button.classList.remove("drumReleased");
    }
    this.pressButton = () => {
        this.sound.currentTime = 0;
        this.sound.play();
        this.setButtonStyleToPressed();
        setTimeout(() => {
            this.setButtonStyleToReleased();
        }, 100);
    }
}

const buttonData = [
    new ButtonData('a_drum', 'tom-1.mp3', 'a'),
    new ButtonData('s_drum', 'tom-2.mp3', 's'),
    new ButtonData('d_drum', 'tom-3.mp3', 'd'),
    new ButtonData('f_drum', 'tom-4.mp3', 'f'),
    new ButtonData('j_drum', 'snare.mp3', 'j'),
    new ButtonData('k_drum', 'crash.mp3', 'k'),
    new ButtonData('l_drum', 'kick-bass.mp3', 'l'),
]

function resetAllButtonStyles_2() {
    for (let x = 0; x < buttonData.length; x += 1) {
        buttonData[x].setButtonStyleToReleased();
    }
}

function bindButtonEvents_2() {
    for (let x = 0; x < buttonData.length; x += 1) {
        buttonData[x].button.addEventListener('click', () => {
            buttonData[x].pressButton();
        })
    }

    document.addEventListener('keydown', (event) => {
        for (let x = 0; x < buttonData.length; x += 1) {
            if (event.key == buttonData[x].key) {
                buttonData[x].button.click();
            }
        }
    })
}


function initialize() {
    //bindButtonEvents_1();

    bindButtonEvents_2();
}

function main() {
    initialize();
}

main();