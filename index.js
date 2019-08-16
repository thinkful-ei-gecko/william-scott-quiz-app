'use strict';

function startGame (game) {
    $('.start-button').on('click', function(event) {
        $(this).closest('.quiz-start').remove();
        renderQuestion(game);
    })
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
    let currentQuestion = game.questionNumber;

    return `
    <h2 class='question'>${dataTable[currentQuestion].question}</h2>
    <form>
        <div>
            <input type="radio" name="option" id="option one">
            <label for='option one'>${dataTable[currentQuestion].answer1}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option two">
            <label for="option two">${dataTable[currentQuestion].answer2}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option three">
            <label for="option three">${dataTable[currentQuestion].answer3}</label>
        </div>
        <div>
            <input type="radio" name="option" id="option four">
            <label for="option four">${dataTable[currentQuestion].answer4}</label>
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

function questionCounter () {

}

/////////////

function updateScore () {

}

/////////////

function handlesFormSubmit (game) {
    // preventDefault
    // call showRight || showWrong
}

function showWrongAnswer () {

}

/////////////

function showRightAnswer () {

}

function feedbackNextSubmit() {

}

/////////////

function renderFinalResult () {

}

/////////////

function restartGame () {

}

function main() {
    let currentGame = game()
    startGame (currentGame)

}

$(main)