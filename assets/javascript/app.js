var startingScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?", "Who is this Final Fantasy Character?"];
var answerArray = [["Cloud", "Squall", "Cecil", "Tifa"], ["Yuna","Sakura","Y'shtola","Vivi"], ["Squall", "Cid", "Tidus", "Balthier"], ["Ramza","Tifa","Aerith","Lighting"], ["Maria", "Lighting", "Krile", "Terra"], ["Zell","Vicent","Zack","Firion"], ["Riona", "Rikku", "Fran", "Penelo"], ["Sephiroth","Basch","Snow","Sazh"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/Cloud.png'>", "<img class='center-block img-right' src='assets/images/Yshtola.jpeg'>", "<img class='center-block img-right' src='assets/images/Squall.jpeg'>", "<img class='center-block img-right' src='assets/images/Tifa.jpeg'>", "<img class='center-block img-right' src='assets/images/Lighting.jpeg'>", "<img class='center-block img-right' src='assets/images/Firion.jpeg'>", "<img class='center-block img-right' src='assets/images/Rikku.jpeg'>", "<img class='center-block img-right' src='assets/images/Sephiroth.jpeg'>"];
var correctAnswers = ["A. Cloud", "C. Y'shtola", "A. Squall", "B. Tifa", "B. Lighting", "D. Firion", "B. Rikku", "A. Sephiroth"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var themeMusic = new Audio("assets/01-prelude copy.mp3");

themeMusic.play();

$(document).ready(function() {

// this will create the starting screen with start button
	function toStartScreen() {
	startingScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startingScreen);
	}

toStartScreen();

// this will tigger the function, createHTML.
$(document).on("click", ".start-button", function(event){
	event.preventDefault();
	generateHTML();

	timerWrapper();

});

// listener for when they click on an answer
$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//right

		clearInterval(theClock);
		generateWin();
	}
	else {
		//wrong
		clearInterval(theClock);
		generateLoss();
	}
});

// listener for reset button
$("body").on("click", ".reset-button", function(event){
	resetGame();
});

});

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}
