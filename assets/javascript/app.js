/*Question objects
* num
* text
* answeres[]
* correct */

function Q (text, answers, correct){
	// this.num = num; 
	this.text = text;
	this.answers = answers;
	this.correct = correct;
	this.userReponse = null
	// set response functoin
	this.setUserAnser = function(ans){
		console.log("inside the setUserAnser, the userReponse is: " + ans);
		this.userReponse = parseInt(ans);
	 };
}
/*Survey object
* questions [] // array of questions
* userCorrect
* Qtime
* timer
*/
var Q1 = new Q( "Which High School Basketball is said to be the future face of the NBA?", ["Zion Williamson", "LaMelo Ball", "Julian Newman", "Shareef O'Neal"], 0);
var Q2 = new Q( "Which player has the highest 3-Point Percentage", ["Stephen Curry", "LeBron James", "Stever Kerr", "Michael Jordan"], 2);
var Q3 = new Q( "Which NBA Franchise has won the most championships?", ["Boston Celtics", "Golden State Warriors", "Los Angeles Lakers", "Chicago Bulls"], 0);
var Q4 = new Q( "Who is the richest NBA player ever?" , ["Magic Johnson", "Lebron James", "Michael Jordan", "Shaquille O Neal"], 2);
var Q5 = new Q( "Who has won the most titles in the history of the NBA?" , ["Lebron James","Bill Russell", "Michael Jordan", "Kareem Abdul-Jabbar"], 1);

var Qs = [Q1,Q2,Q3,Q4,Q5];

function survey (Qs){
	this.questions = Qs;
	this.question = 0;
	this.timer = null;
	this.time = 0;
	this.counter = 0;
	this.incounter = 0;
	this.saveAnswer = function(ans){
		console.log("inside the saveAnser, the question is: " +this.question);
		console.log("inside the saveAnser, the userReponse is: " + ans);
		this.questions[this.question].setUserAnser(ans);
	}
	this.setNextQuestion = function(){
		var next = null;
		if(this.question === null){// first
			next = 0;
		}else if(this.question === this.questions.length -1){//last
			console.log("this is the last one")
			next = null;
		}else{
			next = this.question + 1;
		}
		this.question = next;
		console.log("the question has been set to " + next);
	}
	this.reset = function (){
		this.questions = Qs;
		this.question = 0;
		this.timer = null;
		this.time = 0;
		this.counter = 0;
		this.incounter = 0;
	} 
	this.clearTimer = function (){
		this.time = 0;
		clearInterval(this.timer);
	}
	this.startTimer = function(){
		this.timer = setInterval(timeIt,1000);
	}
	this.toString = function(){
		console.log("the user anser is: " + this.questions[this.question].userReponse);
	}

}

var Travia = new survey(Qs);
// FUNCTIONS 

function timeIt(){
	// console.log("Inside of the timeIT, the time is: " + Travia.time);
	var currTime = 29 - Travia.time;
	$("#timeRem").text('Time Remaining: '+ currTime );
	Travia.time++;
	if(Travia.time === 30){
		Travia.setNextQuestion();
		displayTimeUp();
		setTimeout(displayNextQuestion, 5000);
	}
}
function displayResult(){
	$("#question").empty();
	Travia.clearTimer();
	$("#timeRem").text('Time Remaining: '+ Travia.time );
	$("#question").append('<h2> All done, heres how you did!</h2>');
	$("#question").append('<h3> Correct Answers: ' + Travia.counter + '</h3>');
	$("#question").append('<h3> Incorrect Answers: ' + Travia.incounter + '</h3>');
	var unanswered = Travia.questions.length - (Travia.counter + Travia.incounter);
	$("#question").append('<h3> Unanswerd: ' + unanswered + '</h3>');
	$("#question").append('<button class = "btn-danger btn-lg" id="rstbtn">Restart</button>');
	$("#rstbtn").on("click", function () {
		Travia.reset(Qs);
		displayNextQuestion();
	});

}
function displayNextQuestion(){
	// console.log("inside of displayNextQuestion " + Travia.counter);
	// Travia.counter++;
	var question = Travia.questions[Travia.question];
	Travia.clearTimer();
	Travia.startTimer();
	if(Travia.question === null || Travia.counter === Travia.questions.length+1){
		displayResult()
	}else{
		$("#question").empty();
		$("#question").append('<h2 class="Qh2">' + question.text + '</h2>');
		for(var i = 0; i<question.answers.length; i++){
			$("#question").append('<button class="button option btn-success btn-md" id="' +i+'">' + question.answers[i]+ '</button>');			
			$("#"+i).on("click", function() {
				Travia.saveAnswer( $(this).attr('id'));
				if(Travia.questions[Travia.question].userReponse === Travia.questions[Travia.question].correct){
					displayCorrect();
					Travia.counter++;
					Travia.setNextQuestion();
					setTimeout(displayNextQuestion, 5000);
				}else{
					Travia.incounter++;
					displayInCorrect();
					Travia.setNextQuestion();
					setTimeout(displayNextQuestion, 5000);
				}		
			});
		}
		// Travia.startTimer();
	}
}
function displayInCorrect(){
	$("#question").empty();
	$("#question").append('<h2>Boy you better get that outta here! You Wrong!!!</h2>');
	$("#question").append('<img src="https://uproxx.files.wordpress.com/2016/06/lebronblock2.gif?w=650">');
}

function displayCorrect(){
	$("#question").empty();
	$("#question").append('<h2>Diem your Basketball IQ is off the charts! You Right!!!</h2>');
	$("#question").append('<img src="https://i.imgur.com/7HXx57W.gif">');
}
function displayTimeUp() {
	$("#question").empty();
	Travia.clearTimer();
	$("#timeRem").text('Time Remaining: '+ Travia.time );
	$("#question").append('<h2>You are out of time!!!</h2>');
	$("#question").append('<img src="https://media.tenor.com/images/830224f516ccbd11ec0d900a8b195a32/tenor.gif">');

}

function displayStart() {
	//  $('#mydiv').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b">Another button</button>');
	$("#question").append('<button id="startButton" class="btn-lg btn-primary button"> Start </button>');
	$("#startButton").on('click',function() {
		$("#ttt").append('<h3 id= "timeRem">Time Remaining:</h3>');
			displayNextQuestion()
		});
}

$(document).ready(function() {
	 displayStart();
});


