// var gamePattern = [];
// var userClickPattern = [];
// var level = 0;
// var toggle = true;

// function nextSequence() {
//     var randomNumber;
//      level++;
//     alert(level);
//     return randomNumber = Math.floor(Math.random() * 3);

// }
// buttonColours = ["red", "blue", "green", "yellow"];
// let randomChosenColour = buttonColours[nextSequence()];

// gamePattern.push(randomChosenColour);

// $(`#${randomChosenColour}`).click(function () {
//     $("#" + randomChosenColour).addClass("pressed");
//     setTimeout(() => {
//         $('#' + randomChosenColour).removeClass("pressed");
//     }, 100);
//     let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//     audio.play();
// });

// $(".btn").click(function () {
//     var userChosenColor = $(this).attr("id");
//     userClickPattern.push(userChosenColor);
// });

// function playSound(name) {
//     let audio = new Audio("sounds/" + name + ".mp3");
//     audio.play();
// }

// function animatePress(currentColor) {
//     $(currentColor).addClass("pressed");
//     setTimeout(() => {
//         $(currentColor).removeClass("pressed");
//     }, 100);
// }
// $("body").keypress(function()
// {
    
// });


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
