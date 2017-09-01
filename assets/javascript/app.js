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
		this.userReponse = ans;
	 };
}
/*Survey object
* questions [] // array of questions
* userCorrect
* Qtime
* timer
*/
var Q1 = new Q( "This is Question 1?", ["tom", "john", "tobi", "name"], 0);
var Q2 = new Q( "This is Question 2?", ["bball", "football", "soccer", "baseball"], 0);
var Q3 = new Q( "This is Question 3?", ["jquery", "js", "aws", "mongodb"], 0);
var Qs = [Q1,Q2,Q3];

function survey (Qs){
	this.questions = Qs;
	this.question = 0;
	this.timer = null;
	this.time = 0;
	this.counter = 0;
	this.saveAnswer = function(ans){
		console.log("inside the saveAnser, the question is: " +this.question);
		console.log("inside the saveAnser, the userReponse is: " + ans);
		this.questions[this.question].setUserAnser(ans);
	}
	this.setNextQuestion = function(){
		var next = null;
		if(this.question === null){// first
			next = 0;
		}else if(this.question === this.question.length -1){//last
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
	var currTime = 30 - Travia.time;
	$("#timeRem").text('Time Remaining: '+ currTime );
	Travia.time++;
	if(Travia.time === 31){
		Travia.setNextQuestion();
		displayNextQuestion();
	}
}
function displayResult(){
	$("#question").empty();
	Travia.clearTimer();
	$("#timeRem").text('Time Remaining: '+ Travia.time );
	$("#question").append('<button class = "btn-danger btn-lg" id="rstbtn">Restart</button>');
	$("#rstbtn").on("click", function () {
		Travia.reset(Qs);
		displayNextQuestion();
	});

}
function displayNextQuestion(){
	console.log("inside of displayNextQuestion " + Travia.counter);
	Travia.counter++;
	var question = Travia.questions[Travia.question];
	Travia.clearTimer();
	if(Travia.question === null || Travia.counter === Travia.questions.length+1){
		displayResult()
	}else{
		$("#question").empty();
		$("#question").append('<h3 id= "timeRem">Time Remaining:</h3>');
		$("#question").append('<h2 class="Qh2">' + question.text + '</h2>');
		for(var i = 0; i<question.answers.length; i++){
			$("#question").append('<button class="button option btn-success btn-md" id="option' +i+'">' + question.answers[i]+ '</button>');			
			$("#option"+i).on("click", function() {
				Travia.saveAnswer(i);
				if(Travia.questions[Travia.question].userReponse === Travia.questions[Travia.question].correct){
					displayCorrect();
					setTimeout(displayNextQuestion, 5000);
				}else{
					displayInCorrect();
					setTimeout(displayNextQuestion, 5000);
				}
				
			});
		}
		
		$("#question").append('<button class="btn-danger btn-lg" id="subbtn">Submit</button>');
		$("#subbtn").on("click", function () {
			Travia.setNextQuestion();
			displayNextQuestion();
		});
		Travia.startTimer();
	}
}
function displayInCorrect(){
	$("#question").empty();
	$("#question").append('<img src="http://33.media.tumblr.com/d6cd25ee9bf14daac484fe8f93b0ff5b/tumblr_n2iccqiNP61ra11u8o5_500.gif">');
}

function displayCorrect(){
	$("#question").empty();
	$("#question").append('<img src="https://68.media.tumblr.com/d69fd8fb038e87f32667e48bc72a7c4e/tumblr_o2snegz3Vr1uqe8iio1_500.gif">');
}

function displayStart() {
	//  $('#mydiv').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b">Another button</button>');
	$("#question").append('<button id="startButton" class="btn-lg btn-primary button"> Start </button>');
	$("#startButton").on('click',function() {
			displayNextQuestion()
		});
}

$(document).ready(function() {
	 displayStart();
});


