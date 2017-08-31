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
var Q1 = new Q( "what is your name", ["tom", "john", "tobi", "name"], 0);
var Q2 = new Q( "what is your game", ["bball", "football", "soccer", "baseball"], 0);
var Q3 = new Q( "what is your lame", ["jquery", "js", "aws", "mongodb"], 2);
var Qs = [Q1,Q2,Q3];

function survey (Qs){
	this.questions = Qs;
	this.question = 0;
	this.timer = null;
	this.time = 0;
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
	}
	this.reset = function (){
		this.questions = Qs;
		this.question = 0;
		this.timer = null;
		this.time = 0;
	} 
}

var Travia = new survey(Qs);
// FUNCTIONS 
function displayResult(){
	$("#question").empty();
	$("#question").append('<button class = "button" id="rstbtn">Restart<button>')
		.on("click", function () {
			Travia.reset(Qs);
			displayNextQuestion(Travia.questions[Travia.question]);
		});

}
function displayNextQuestion(){
	// this is where you have to append all of the elements of the question.
	// you will start with a an h2 for the question 
	// set the css fo this eleent by definein teh css of any h2 in div main ;)
	// then you need to appedn th equestions
	// gotta append subint button too.  
	// lastly append a button that will have an onclick function. to displayNextQuestion()
	// 
	var question = Travia.questions[Travia.question];
	if(Travia.question === null){
		displayResult()
	}else{
		$("#question").empty();
		console.log(question);
		console.log("The value of i is: " +i+ " in displayNextQuestion else block");
		$("#question").append('<h2 class="Qh2">' + question.text + '</h2>');
		console.log(question);
		console.log("The value of i is: "+i+ " after appending the H2 ");
		for(var i = 0; i<question.answers.length; i++){
			console.log(question);
			console.log("The value of i is: "+i+ " in the for loop");
			$("#question").append("<button class='button option'>" + question.answers[i]+ "</button>")
			.on("click", function() {
				Travia.saveAnswer(i);
			});
		}
		$("#question").append('<button class = "button" id="subbtn">Submit<button>')
		.on("click", function () {
			Travia.setNextQuestion();
			displayNextQuestion();
		});
	}
}
function appendQuestions(question){
	// cycle thru the question and add each optin div
	console.log("appendQuestions");
	console.log(question); 
	for(var i = 0; i<question.answers.length; i++){
		console.log(question);
		console.log(i);
		$("#question").append("<button class='button option'>" + question.answers[i]+ "</button>")
		.on("click", function() {
			Travia.saveAnswer(i);
		});
	}
}

function displayStart() {
	//  $('#mydiv').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b">Another button</button>');
	$("#question").append(
		$('<button id="startButton" class="button"> Start </button>')
		.on('click',function() {
			displayNextQuestion();
		})
	);
}

$(document).ready(function() {
	 displayStart();
});


