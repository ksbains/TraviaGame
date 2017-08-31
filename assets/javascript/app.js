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
function survey (Qs, userCorrect, Qtime, timer){
	this.questions = Qs;
	this.question = null;
	this.timer = null;
	this.time = 0;
	this.saveAnswer = function(ans){
		this.questoins[this.question].setUserAnser(ans);
	}
	this.setNextQuestion = function(){
		var next = null;
		if(this.question === null){// first
			next = 0;
		}else if(this.question === this.question.length -1){
			next = null;
		}else{
			next = this.question + 1;
		}
		this.question = next;
	} 
}
var Q1 = new Q( "what is your name", ["tom", "john", "tobi", "name"], 0);

// FUNCTIONS 

function displayNextQuestion(question){
	// this is where you have to append all of the elements of the question.
	// you will start with a an h2 for the question 
	// set the css fo this eleent by definein teh css of any h2 in div main ;)
	// then you need to appedn th equestions
	// gotta append subint button too.  
	// lastly append a button that will have an onclick function. to displayNextQuestion()
	// 
	$("#question").empty();
	$("#question").append('<h2 class="Qh2">' + question.text + '</h2>');
	appendQuestions(question);
	$("#question").append('<button class = "button" id="subbtn">Submit<button>')
	.on("click" function () {
		displayNextQuestion(question++);
	});

}
function appendQuestions(question){
	// cycle thru the question and add each optin div.
	// append each question need the proper code lulz. 
	for(var i = 0; i<survey.questions.length; i++){
		$("#question").append('<button class="button option" id=option'+i+'' + question.answers[i]+' </button>')
		.on("click", function() {
			survey.saveAnswer(i);
		});
	}
}

function displayStart() {
	//  $('#mydiv').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b">Another button</button>');
	$("#question").append(
		$('<button id="startButton" class="button"> Start </button>')
		.on('click',function() {
			displayNextQuestion(0);
		})
	);
}

$(document).ready(function() {
	 displayStart();
});


