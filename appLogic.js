/*

Initialization

- Logic for getting qs from json file
    - get number of qs
    - get choices per q

Main Function

- Logic for running the app
    - display 1 q with its choices
    - Logic for getting user input
    - Logic for checking if the answer is correct
    - Logic for displaying the result
    - Logic for displaying the next or previous q
    - Logic for displaying the final result

*/
$(document).ready(function () {
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  function loadQuestion(index) {
    const question = questions[index];
    $("#question-text").text(question.question);
    $("#choices").empty();

    question.choices.forEach((choice) => {
      const btn = $("<button>")
        .addClass("choice-btn")
        .text(choice)
        .click(() => {
          if (choice === question.answer) {
            score++;
          }
          $("#next-btn").show();
          $(".choice-btn").prop("disabled", true);
        });
      $("#choices").append(btn);
    });

    $("#next-btn").hide();
  }

  function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      showScore();
    }
  }

  function showScore() {
    $(".question-box").hide();
    $("#score-display").text(`Your Score: ${score}/${questions.length}`).show();
  }

  $.getJSON("questions.json", function (data) {
    questions = data;
    $(".question-box").show();
    loadQuestion(currentQuestionIndex);
  });

  $("#next-btn").click(showNextQuestion);
});
