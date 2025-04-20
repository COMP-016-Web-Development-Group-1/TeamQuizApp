fetch("questions.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load questions.");
    }
    return response.json();
  })
  .then((data) => {
    let currentQuestionIndex = 0;

    // Display the first question
    displayQuestion(data, currentQuestionIndex);
  })
  .catch((error) => {
    console.error(error.message);
  });

let currentScore = 0; // Move currentScore outside the function to retain its value

const displayQuestion = (data, currentQuestionIndex) => {
  const questionObj = data[currentQuestionIndex];
  const questionContainer = document.querySelector(".question-area");
  const questionElement = document.querySelector(".question-text");
  const choicesButtons = document.querySelectorAll(".option");
  const qNumberElement = document.querySelector(".quiz-header .qnumber");
  const scoreElement = document.querySelector(".quiz-header .score");

  // Update question number and score
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
      if (index === questionObj.answer) {
        questionContainer.style.backgroundColor = "#47f547";
        questionElement.style.backgroundColor = "#47f547";
        currentScore += 1; // Increment score
        scoreElement.textContent = `Score: ${currentScore} /${data.length}`; // Update score display
        setTimeout(() => {
          questionContainer.style.backgroundColor = "";
          questionElement.style.backgroundColor = "";
          currentQuestionIndex++;
          if (currentQuestionIndex < data.length) {
            displayQuestion(data, currentQuestionIndex);
          } else {
            window.location.href = "Message.html";
          }
        }, 1000);
      } else {
        questionContainer.style.backgroundColor = "#f55151";
        questionElement.style.backgroundColor = "#f55151";
        setTimeout(() => {
          questionContainer.style.backgroundColor = "";
          questionElement.style.backgroundColor = "";
          currentQuestionIndex++;
          if (currentQuestionIndex < data.length) {
            displayQuestion(data, currentQuestionIndex);
          } else {
            window.location.href = "Message.html";
          }
        }, 1000);
      }
    };
  });
};
