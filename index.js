'use strict';

function startGame (game, dataTable) {
  $('.start-button').on('click', function(event) {
    $(this).closest('.quiz-start').remove();
    renderQuestion(game, dataTable);
  });
}

//Factory function to initialize a new game
function game(questionNumber = 0, score = 0) {
  return {
    questionNumber,
    score,
    incrementScore() {
      this.score++;
    },
    incrementQuestion() {
      this.questionNumber++;
    },
    resetGame() {
      this.score = 0;
      this.questionNumber = 0;
    }
  };
}


function displayQuestionCount(game, dataTable) {
  let questionNumber = game.questionNumber + 1;
  $('.question-number').text(`Question ${questionNumber} out of ${dataTable.length}`);
}


function displayScore(game) {
  $('.score').text(`Your score: ${game.score}`);
}


function generateQuestionHtml (game, dataTable) {
  return `
    <h2 class='question'>${dataTable[game.questionNumber].question}</h2>
    <form class = 'questions'>
        <div>
            <input type="radio" name="option" id="option one" value="${dataTable[game.questionNumber].answers[answerIndexArray[0]]}" required>
            <label for='option one'>${dataTable[game.questionNumber].answers[answerIndexArray[0]]}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option two" value="${dataTable[game.questionNumber].answers[answerIndexArray[1]]}" required>
            <label for="option two">${dataTable[game.questionNumber].answers[answerIndexArray[1]]}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option three" value="${dataTable[game.questionNumber].answers[answerIndexArray[2]]}" required>
            <label for="option three">${dataTable[game.questionNumber].answers[answerIndexArray[2]]}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option four" value="${dataTable[game.questionNumber].answers[answerIndexArray[3]]}" required>
            <label for="option four">${dataTable[game.questionNumber].answers[answerIndexArray[3]]}</label>
        </div>
        <div>
            <button type='submit' class='submit-answer-button'>Submit answer</button>
        </div>
    </form>`;
}


function renderQuestion (game, dataTable) {
  $('.quiz-form').html(generateQuestionHtml(game, dataTable));
  $('body').removeClass();
  $('body').addClass(dataTable[game.questionNumber].backgroundImageClass);
}


function handleSubmit(game, dataTable) {
  $('.quiz-form').on('submit', '.questions', function(event) {
    event.preventDefault();
    let userAnswer = $('input:checked');
    let userAnswerValue = userAnswer.val();

    if (userAnswerValue === dataTable[game.questionNumber].correctAnswer) {
      game.incrementScore();
      $('.quiz-form').html(showRightAnswer());
    } else {
      $('.quiz-form').html(showWrongAnswer(game, dataTable));
    }
  });
}


function showWrongAnswer (game, dataTable) {
  return `
    <form class='form-next-question'>
        <h2>You Got This Wrong</h2>
        <p>The correct answer is ${dataTable[game.questionNumber].correctAnswer}</p>
        <button type='submit' class='next-button'>Next</button>
    </form>`;
}


function showRightAnswer () {
  return `
    <form class='form-next-question'>
        <h2>You Got This Right</h2>
        <button type='submit' class='next-button'>Next</button>
    </form>`;
}


function feedbackNextSubmit (game, dataTable) {
  $('.quiz-form').on('submit', '.form-next-question', function(event) {
    event.preventDefault();
    game.incrementQuestion();
    displayScore(game);

    if (game.questionNumber === dataTable.length) {
      renderFinalResult(game);
    } else {
      renderQuestion(game, dataTable);
      displayQuestionCount(game, dataTable);
    }
  });
}


function finalResultHtml (game) {
  return `
    <form class='form-final-result'>
        <h2>You Got ${game.score} Out Of ${game.questionNumber}</h2>
        <p>Do You Want to Try Again?</p>
        <button type='submit' class='restart-button'>Restart Quiz</button>
    </form>`;
}

function renderFinalResult (game) {
  $('.quiz-form').html(finalResultHtml(game));
}


function restartGame(game, dataTable) {
  $('.quiz-form').on('submit', '.form-final-result', function(event) {
    event.preventDefault();
    game.resetGame();
    answerIndexArray = shuffleArray(answerIndexArray);
    currentTable.length = 0;
    populateDataTable(shuffleArray(questionIndexArray));
    renderQuestion(game, dataTable);
  });
}


function main() {
  populateDataTable(shuffleArray(questionIndexArray));
  answerIndexArray = shuffleArray(answerIndexArray);

  let currentGame = game();

  displayQuestionCount(currentGame, currentTable);
  displayScore(currentGame);
  startGame(currentGame, currentTable); 
  handleSubmit(currentGame, currentTable);
  feedbackNextSubmit(currentGame, currentTable); 
  restartGame(currentGame, currentTable);
}

$(main);