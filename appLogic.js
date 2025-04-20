fetch("questions.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load questions.");
    }
    return response.json();
  })
  .then((data) => {
    let currentQuestionIndex = 0;
    let answeredQuestions = [];

    displayQuestion(data, currentQuestionIndex, answeredQuestions);
  })
  .catch((error) => {
    console.error(error.message);
  });

let currentScore = 0;

const displayQuestion = (data, currentQuestionIndex, answeredQuestions) => {
  const questionObj = data[currentQuestionIndex];
  const questionContainer = document.querySelector(".question-area");
  const questionElement = document.querySelector(".question-text");
  const choicesButtons = document.querySelectorAll(".option");
  const qNumberElement = document.querySelector(".quiz-header .qnumber");
  const scoreElement = document.querySelector(".quiz-header .score");

  qNumberElement.textContent = `Question: ${currentQuestionIndex + 1}/${
    data.length
  }`;
  scoreElement.textContent = `Score: ${currentScore} /${data.length}`;
  questionElement.textContent = questionObj.question;

  choicesButtons.forEach((btn, index) => {
    btn.textContent = questionObj.choices[index];
  });

  choicesButtons.forEach((btn, index) => {
    btn.onclick = () => {
      if (!answeredQuestions.includes(currentQuestionIndex)) {
        answeredQuestions.push(currentQuestionIndex);

        if (index === questionObj.answer) {
          questionContainer.style.backgroundColor = "#47f547";
          questionElement.style.backgroundColor = "#47f547";
          currentScore += 1;
          scoreElement.textContent = `Score: ${currentScore} /${data.length}`;
        } else {
          questionContainer.style.backgroundColor = "#f55151";
          questionElement.style.backgroundColor = "#f55151";
        }

        setTimeout(() => {
          questionContainer.style.backgroundColor = "";
          questionElement.style.backgroundColor = "";

          if (answeredQuestions.length === data.length) {
            localStorage.setItem("finalScore", currentScore);
            window.location.href = "Message.html";
          } else {
            let nextUnanswered = -1;
            for (let i = currentQuestionIndex + 1; i < data.length; i++) {
              if (!answeredQuestions.includes(i)) {
                nextUnanswered = i;
                break;
              }
            }

            if (nextUnanswered !== -1) {
              currentQuestionIndex = nextUnanswered;
              displayQuestion(data, currentQuestionIndex, answeredQuestions);
            } else {
              let firstUnanswered = data.findIndex(
                (_, i) => !answeredQuestions.includes(i)
              );
              if (firstUnanswered !== -1) {
                currentQuestionIndex = firstUnanswered;
                displayQuestion(data, currentQuestionIndex, answeredQuestions);
              } else {
                localStorage.setItem("finalScore", currentScore);
                window.location.href = "Message.html";
              }
            }
          }
        }, 1000);
      }
    };
  });

  const navButtons = document.querySelectorAll(".nav-btn");
  let nextButton, prevButton;

  navButtons.forEach((btn) => {
    if (btn.textContent.trim().toLowerCase() === "next") {
      nextButton = btn;
    } else if (btn.textContent.trim().toLowerCase() === "prev") {
      prevButton = btn;
    }
  });

  nextButton.onclick = () => {
    let nextUnanswered = -1;
    for (let i = currentQuestionIndex + 1; i < data.length; i++) {
      if (!answeredQuestions.includes(i)) {
        nextUnanswered = i;
        break;
      }
    }

    if (nextUnanswered !== -1) {
      currentQuestionIndex = nextUnanswered;
      displayQuestion(data, currentQuestionIndex, answeredQuestions);
    } else {
      alert("No more unanswered questions ahead.");
    }
  };

  prevButton.onclick = () => {
    let prevUnanswered = -1;
    for (let i = currentQuestionIndex - 1; i >= 0; i--) {
      if (!answeredQuestions.includes(i)) {
        prevUnanswered = i;
        break;
      }
    }

    if (prevUnanswered !== -1) {
      currentQuestionIndex = prevUnanswered;
      displayQuestion(data, currentQuestionIndex, answeredQuestions);
    } else {
      alert("No more unanswered questions behind.");
    }
  };

  prevButton.onclick = () => {
    if (currentQuestionIndex < data.length - 1) {
      currentQuestionIndex--;
      displayQuestion(data, currentQuestionIndex, answeredQuestions);
    }
  };

  choicesButtons.forEach((btn) => {
    if (answeredQuestions.includes(currentQuestionIndex)) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const scoreSpan = document.querySelector(".final-score");
  const score = localStorage.getItem("finalScore");
  console.log("Loaded Message.html, score:", score);

  if (scoreSpan) {
    scoreSpan.textContent =
      score !== null ? `SCORE: ${score}` : "SCORE: Not available";
  }
});
