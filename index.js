'use strict';

function startGame (game) {
  $('.start-button').on('click', function(event) {
    $(this).closest('.quiz-start').remove();
    renderQuestion(game);
  });
}

function game(questionNumber = 0, score = 0) {
  return {
    questionNumber,
    score,
    incrementScore() {
      score++;
    },
    incrementQuestion() {
      questionNumber++;
    }
  }
}

/////////////

function generateQuestionHtml (game) {
  return `
    <h2 class='question'>${dataTable[game.questionNumber].question}</h2>
    <form>
        <div>
            <input type="radio" name="option" id="option one">
            <label for='option one'>${dataTable[game.questionNumber].answer1}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option two">
            <label for="option two">${dataTable[game.questionNumber].answer2}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option three">
            <label for="option three">${dataTable[game.questionNumber].answer3}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option four">
            <label for="option four">${dataTable[game.questionNumber].answer4}</label>
        </div>
        <div>
            <button type='button' class='submit-answer-button'>Submit answer</button>
        </div>
    </form>
    `
}

/////////////

function renderQuestion (game) {
  $('.quiz-form').html(generateQuestionHtml(game));
}

/////////////


function handlesFormSubmit () {
  $('.submit-answer-button').on('click', function(event) {
    event.preventDefault();
    console.log('inside form submit');

    let userAnswer = $('input:checked');
    let userAnswerValue = userAnswer.val();
    console.log(userAnswer);
    console.log(userAnswerValue);
  });

  // preventDefault
  // call showRight || showWrong
}

function showWrongAnswer (game) {
  return `
    <h2>You Got This Wrong</h2>
    <p>The correct answer is ${dataTable[game.questionNumber].correctAnswer}</p>
    <button type='button' class='next-button'>Next</button>
    `;

}

/////////////

function showRightAnswer () {
  return `
    <h2>You Got This Right</h2>
    <button type='button' class='next-button'>Next</button>
    `;
}

function feedbackNextSubmit () {

}

/////////////

function renderFinalResult () {

}

/////////////

function restartGame () {

}

function main() {
  let currentGame = game();
  startGame (currentGame);
  handlesFormSubmit ();
}

$(main);