var currentQuestion;
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

var triviaQuestions = [
    {
        question: "What is Leslie's favorite food?",
        answerList: ["Pancakes",
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
        answerList: ["Champion",
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
        answerList: ["Jerry",
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
        answerList: ["Leslie",
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
        answerList: ["ChumBucket",
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
        answerList: ["Anne Perkins",
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

function countdown() {
    seconds = 10;
    $("#timeLeft").html("00:" + seconds);
    answered = true;
    time = setInterval(showCountdown, 1000);
}
function showCountdown() {
    seconds--;

    if (seconds < 10) {
        $("#timeLeft").html("00:0" + seconds);
    } else {
        $("#timeLeft").html("00:" + seconds);
    }

    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function newQuestion() {
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").hide();
    $("#caption").hide();
    answered = true;
    $("#currentQuestion").html("Question " + (currentQuestion + 1) + " of " + triviaQuestions.length);
    $(".question").html(triviaQuestions[currentQuestion].question);

    for (var i = 0; i <= 5; i++) {

        var choices = $("<div>");
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ "data-index": i });
        choices.addClass("thisChoice");
        $(".answerList").append(choices);
    }

    countdown();

    $(".thisChoice").on("click", function () {
        userSelect = $(this).data("index");
        clearInterval(time);
        answerPage();
    });
}

function newGame() {
    currentQuestion = 0;
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
function scoreboard() {
    $('#timeLeft').empty();
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

function answerPage() {
    $("#currentQuestion").empty();
    $(".thisChoice").empty();
    $(".question").empty();
    $("#gif").show();
    $("#caption").show();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    var gifImageLink = triviaQuestions[currentQuestion].image;
    var newGif = $("<img>");
    newGif.attr("src", gifImageLink);
    newGif.addClass("gifImg");
    $("#gif").html(newGif);


    var gifCaption = triviaQuestions[currentQuestion].answerText;
    newCaption = $("<div>");
    newCaption.html(gifCaption);
    newCaption.addClass("caption");
    $("#caption").html(newCaption);


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

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 3000);
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 3000);
    }
}