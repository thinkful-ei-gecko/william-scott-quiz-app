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
            <input type="radio" name="option" id="option one" required>
            <label for='option one'>${dataTable[game.questionNumber].answer1}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option two" required>
            <label for="option two">${dataTable[game.questionNumber].answer2}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option three" required>
            <label for="option three">${dataTable[game.questionNumber].answer3}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option four" required>
            <label for="option four">${dataTable[game.questionNumber].answer4}</label>
        </div>
        <div>
            <button type='submit' class='submit-answer-button'>Submit answer</button>
        </div>
    </form>
    `
}

/////////////

function renderQuestion (game) {
  $('.quiz-form').html(generateQuestionHtml(game));
}

/////////////


function handleSubmit(game) {
  $('.quiz-form').on('submit', 'form', function(event) {
    event.preventDefault();

    let userAnswer = $('input:checked');
    let userAnswerValue = userAnswer.val();
    console.log(userAnswerValue);
    if (userAnswerValue === dataTable[game.questionNumber].correctAnswer) {
      console.log('you got it right');
    }
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
  startGame(currentGame);
  handleSubmit(currentGame);
}

$(main);