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
var Q3 = new Q( "This is Question 3?", ["jquery", "js", "aws", "mongodb"], 2);
var Qs = [Q1,Q2,Q3];

function survey (Qs){
	this.questions = Qs;
	this.question = 0;
	this.timer = null;
	this.time = 0;
	this.counter = 0;
	this.saveAnswer = function(ans){
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
}

var Travia = new survey(Qs);
// FUNCTIONS 
function displayResult(){
	$("#question").empty();
	$("#question").append('<button class = "btn-danger btn-lg" id="rstbtn">Restart</button>');
	$("#rstbtn").on("click", function () {
		Travia.reset(Qs);
		displayNextQuestion(Travia.questions[Travia.question]);
	});

}
function displayNextQuestion(){
	Travia.counter++;
	console.log("inside of displayNextQuestion for the " + Travia.counter +" time");
	var question = Travia.questions[Travia.question];
	if(Travia.counter == 4){
		console.log(question);
	}
	if(Travia.question === null || Travia.counter === Travia.questions.length+1){
		displayResult()
	}else{
		$("#question").empty();
		$("#question").append('<h2 class="Qh2">' + question.text + '</h2>');
		for(var i = 0; i<question.answers.length; i++){
			$("#question").append("<button class='button option btn-success btn-md'>" + question.answers[i]+ "</button>")
			.on("click", function() {
				Travia.saveAnswer(i);
			});
		}
		
		$("#question").append('<button class="btn-danger btn-lg" id="subbtn">Submit</button>');
		$("#subbtn").on("click", function () {
			Travia.setNextQuestion();
			displayNextQuestion();
		});
	}
}

function displayStart() {
	//  $('#mydiv').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b">Another button</button>');
	$("#question").append('<button id="startButton" class="btn-lg btn-primary button"> Start </button>');
	$("#startButton").on('click',function() {
			displayNextQuestion();
		});
}

$(document).ready(function() {
	 displayStart();
});


