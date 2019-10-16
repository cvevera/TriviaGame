var current;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "I'm really proud of you.",
    incorrect: "Opps! Try again!",
    outOfTime: "Out of time! Try again!",
    complete: "Let's see how you did!"
};
// Created an array of objects to hold questions, answers, correct answer, gifs and captions.
var triviaQuestions = [
    {
        question: "What is Leslie's favorite food?",
        answerChoices: ["Pancakes",
            "Calzones",
            "Sushi",
            "Waffles",
            "Sue's Salad"],
        answer: 3,
        image: "assets/images/LeslieWaffles.jpeg",
        answerText: "Waffles, obviously!"
    },
    {
        question: "What is the name of Andy and April's dog?",
        answerChoices: ["Champion",
            "Gary",
            "MouseRat",
            "Ben",
            "Sue"],
        answer: 0,
        image: "assets/images/Champion.gif",
        answerText: "The best three legged boy!"
    },
    {
        question: "Which character also called Larry, Barry, and Terry?",
        answerChoices: ["Jerry",
            "Gary",
            "Perry",
            "Mary",
            "Sue's Salad"],
        answer: 0,
        image: "assets/images/jerryGif.jpeg",
        answerText: "Okay this was an easy one...though he is forgettable..."
    },
    {
        question: "Who is Ron's ex-wife?",
        answerChoices: ["Leslie",
            "Ann",
            "Tammy",
            "Leslie's Mom",
            "Sue from Sue's Salad"],
        answer: 2,
        image: "assets/images/TammyGif.gif",
        answerText: "Yeah, she's horrible."
    },
    {
        question: "What is the name of Andy's band?",
        answerChoices: ["ChumBucket",
            "Scarecrow Boat",
            "MouseRat",
            "Punch Face Champion",
            "Sue Sue's Salads"],
        answer: 2,
        image: "assets/images/AndyGif.gif",
        answerText: "They play 5,000 Candles in the Wind!"
    },
    {
        question: "Who is Jean-Ralphio's sister?",
        answerChoices: ["Anne Perkins",
            "JJ from JJ's Diner",
            "Tom's Canadian Wife",
            "Mona Lisa",
            "Sue from Sue's Salads"],
        answer: 3,
        image: "assets/images/Mona-LisaGif.gif",
        answerText: "She is also the worst."
    },
]


// Click for start, picking an answer, and the new game button.
$("#startBtn").on("click", function () {
    $(".start").hide();
    newGame();
});

$("#startOverBtn").on("click", function () {
    $(this).hide();
    newGame();
});


// all the functions! //
// This Function sets the countdown and interval to 1 sec
function countdown() {
    seconds = 10;
    $("#time").html("00:" + seconds);
    answered = true;
    time = setInterval(showCountdown, 1000);
}
// This function shows the count down decreasing by 1 with the correct display. If the timer reaches zero is shows the answer page and read the question as unanswered.
function showCountdown() {
    seconds--;

    if (seconds < 10) {
        $("#time").html("00:0" + seconds);
    } else {
        $("#time").html("00:" + seconds);
    }

    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}
// This  function clears the answer page and populates the new question and choices to the page. This also includes the on click to grab the user input on their choice.
function newQuestion() {
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").hide();
    $("#caption").hide();
    answered = true;
    $("#current").html("Question " + (current + 1) + " of " + triviaQuestions.length);
    $(".question").html(triviaQuestions[current].question);

    for (var i = 0; i <= 5; i++) {

        var choices = $("<div>");
        choices.text(triviaQuestions[current].answerChoices[i]);
        choices.attr({ "data-index": i });
        choices.addClass("thisChoice");
        $(".answerChoices").append(choices);
    }

    countdown();

    $(".thisChoice").on("click", function () {
        userSelect = $(this).data("index");
        clearInterval(time);
        answerPage();
    });
}
// This function clears the end game screen/game variables and calls the newQuestion function.
function newGame() {
    current = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    $(".gamearea").show();
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    $("#gif").hide();
    $("#caption").hide();

    newQuestion();
}
// This function displays correct and incorrect answers and shows the "play again" button.
function endScreen() {
    $('#time').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').hide();
    $("#caption").hide();
    $('#finalMessage').html(messages.complete);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html("PLAY AGAIN");
}
// This function displays the gifs and correct answers with a message after a user choice.
function answerPage() {
    $("#current").empty();
    $(".thisChoice").empty();
    $(".question").empty();
    $("#gif").show();
    $("#caption").show();
// Finding the appropriate answer text and gif and adding to html
    var rightAnswerText = triviaQuestions[current].answerChoices[triviaQuestions[current].answer];
    var rightAnswerIndex = triviaQuestions[current].answer;
    var gifImageLink = triviaQuestions[current].image;
    var newGif = $("<img>");
    newGif.attr("src", gifImageLink);
    newGif.addClass("gifImg");
    $("#gif").html(newGif);
// Finding the correct gif caption and adding to the html
    var gifCaption = triviaQuestions[current].answerText;
    newCaption = $("<div>");
    newCaption.html(gifCaption);
    newCaption.addClass("caption");
    $("#caption").html(newCaption);

// Checks to see if the correct answer is choisen
    if ((userSelect == rightAnswerIndex) && (answered === true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered === true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.outOfTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }
// Displays the endScreen if over, or a new question after 3 seconds.
    if (current == (triviaQuestions.length - 1)) {
        setTimeout(endScreen, 3000);
    } else {
        current++;
        setTimeout(newQuestion, 3000);
    }
}