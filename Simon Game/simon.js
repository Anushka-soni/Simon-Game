

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;
var level = 0;


$(document).keydown(function() {
    if (!gameStarted) {
        $("#titlelevel").text("Level 0");
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor); 
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#titlelevel").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * buttonColors.length);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } 
    else {
        playSound("wrong"); 
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#titlelevel").text("Game Over, Press Any Key to Restart");
        startOver();
    } 
}


 function playSound(name) {

    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function animatePress(currentColor) {

    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");

    setTimeout(function(){
        activeButton.removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
