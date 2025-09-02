
const levelLabel = $("#level-title")

const buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];

//#region audio

function getSoundPath(fileName) {
    return `./sounds/${fileName}.mp3`;
}
const blueSound = new Audio(getSoundPath("blue"));
const greenSound = new Audio(getSoundPath("green"));
const redSound = new Audio(getSoundPath("red"));
const wrongSound = new Audio(getSoundPath("wrong"));
const yellowSound = new Audio(getSoundPath("yellow"));

function playSound(soundName) {
    let targetSound = wrongSound;
    if (soundName != null) {
        switch (soundName) {
            case "blue":
                targetSound = blueSound;
                break;
            case "green":
                targetSound = greenSound;
                break;
            case "red":
                targetSound = redSound;
                break;
            case "yellow":
                targetSound = yellowSound;
                break;
        }
    }
    targetSound.currentTime = 0;
    targetSound.play();
}

//#endregion

//#region game state

var gamePattern = [];
var index = 0;
var level = 1;
var gameActive = false;

function resetGame() {
    gamePattern = [];
    index = 0;
    level = 1;
    gameActive = true;
}

function createNextSequence() {
    let random = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    let randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);

    triggerButtonPress(randomChosenColor);
}

function startRound() {
    index = 0;
    levelLabel.text(`Level ${level}`);
    createNextSequence();
}

function gameOver() {
    gameActive = false;

    levelLabel.text("Game Over, Click Here or Press Any Key to Restart");
}

function levelComplete() {
    let body = $("body");

    body.addClass("level-complete");
    setTimeout(() => {
        body.removeClass("level-complete");
    }, 250);

    setTimeout(() => {
        level += 1;
        startRound();
    }, 750);
}

//#endregion

//#region events

function triggerButtonPress(buttonName) {
    if (buttonName != null) {
        playSound(buttonName);

        let targetButtonObject = $(`#${buttonName}`);
        targetButtonObject.addClass("pressed");

        setTimeout(() => {
            targetButtonObject.removeClass("pressed");
        }, 250);
    }
    else {
        playSound();
        let body = $("body");

        body.addClass("game-over");
        setTimeout(() => {
            body.removeClass("game-over");
        }, 250);
    }
}

function userPressButton(buttonName) {
    if (gameActive) {
        if (buttonName == gamePattern[index]) {
            index += 1;
            triggerButtonPress(buttonName);

            if (index >= gamePattern.length) {
                levelComplete();
            }
        }
        else {
            gameOver();
            triggerButtonPress();
        }
    }
    else {
        triggerButtonPress();
    }
}

function bindEvents() {
    for (let x = 0; x < buttonColors.length; x += 1) {
        $(`#${buttonColors[x]}`).on("click", () => {
            userPressButton(buttonColors[x]);
        })
    }
    $(document).on("keypress", () => {
        if (!gameActive) {
            resetGame();
            startRound();
        }
    });
    levelLabel.on('click', () => {
        if (!gameActive) {
            resetGame();
            startRound();
        }
    });
}

//#endregion

//#region Main execution

function main() {
    bindEvents();
}

main();

//#endregion