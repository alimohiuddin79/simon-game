var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var isGameStared = false;
var level = 0;

function nextSquence() {
    level++;
    $('#level-title').text('Level '+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(colour) {
    switch(colour) {
        case 'red':
            var redAudio = new Audio('./sounds/red.mp3');
            redAudio.play();
            break;
        case 'blue':
            var blueAudio = new Audio('./sounds/blue.mp3');
            blueAudio.play();
            break;
        case 'green':
            var greenAudio = new Audio('./sounds/green.mp3');
            greenAudio.play();
            break;
        case 'yellow':
            var yellowAudio = new Audio('./sounds/yellow.mp3');
            yellowAudio.play();
            break;
        default:
            var wrongAudio = new Audio('./sounds/wrong.mp3');
            wrongAudio.play();
            break;
    }
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed');
    setTimeout(function() {
        $('#'+currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if (checkSequence(gamePattern, userClickedPattern)) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSquence();
            }, 1000);
        }
    } else {
        console.log('wrong');
        startOver();
    }
}

function startOver() {
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over, Press Any Key to Restart');

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    isGameStared = false;
}

function checkSequence(array1 , array2) {
    if (array1 === array2) return true;
    if (array1.length !== array2.length) return false;

    for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}


$(document).keydown(function (e) { 
    if (!isGameStared){
        isGameStared = true;
        nextSquence();
    }
});

$('div[type=button]').click(function (e) { 
    if (isGameStared && gamePattern !== 0) {
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
        // console.log("game pattern: ", gamePattern);
        // console.log("user pattern: ", userClickedPattern);
    }
});