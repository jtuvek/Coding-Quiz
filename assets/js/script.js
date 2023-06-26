document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions
    var questions = [
      {
        question: "What is the correct syntax for creating a new JavaScript array?",
        choices: ["var colors = [];", "var colors = {};", "var colors = ();", "var colors = new Array();"],
        correctAnswer: 0
      },
      {
        question: "Which of the following is a JavaScript data type?",
        choices: ["String", "Boolean", "Number", "All of the above"],
        correctAnswer: 3
      },
      {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        choices: ["To refer to the current HTML element", "To refer to the current JavaScript file", "To refer to the parent object", "To refer to the global window object"],
        correctAnswer: 2
      },
      {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        choices: ["pop()", "shift()", "splice()", "slice()"],
        correctAnswer: 0
      },
      {
        question: "What does the 'NaN' stand for in JavaScript?",
        choices: ["Not a Null", "Not a Number", "Not a Name", "Not a NaN"],
        correctAnswer: 1
      },
      {
        question: "Which operator is used to compare the equality of two values in JavaScript?",
        choices: ["==", "===", "=", "!="],
        correctAnswer: 1
      },
      {
        question: "What is the output of the following code snippet: console.log(1 + '2' - 1);",
        choices: ["10", "11", "12", "NaN"],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of the 'addEventListener' method in JavaScript?",
        choices: ["To remove an event handler", "To add a new event handler", "To trigger an event", "To prevent default behavior"],
        correctAnswer: 1
      },
      {
        question: "What does the CSS property 'display: none' do?",
        choices: ["Hides the element", "Shows the element", "Removes the element", "Disables the element"],
        correctAnswer: 0
      },
      {
        question: "Which of the following is NOT a valid CSS selector?",
        choices: ["#myElement", ".myClass", "$myElement", "input[type='text']"],
        correctAnswer: 2
      }
    ];
  
    var currentQuestionIndex = 0;
  var score = 0;
  var timer = 60;
  var timerInterval;

  // HTML elements
  var startBtn = document.getElementById("start-btn");
  var questionContainer = document.getElementById("question-container");
  var questionEl = document.getElementById("question");
  var choicesEl = document.getElementById("choices");
  var scoreEl = document.getElementById("score");
  var timerEl = document.getElementById("timer");
  var gameOverContainer = document.getElementById("game-over-container");
  var initialsInput = document.getElementById("initials");
  var scoreForm = document.getElementById("score-form");
  var highScoresContainer = document.getElementById("high-scores-container");
  var highScoresList = document.getElementById("high-scores-list");

  // Start the quiz
  startBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    document.getElementById("start-container").classList.add("hide");
    questionContainer.classList.remove("hide");
    timerEl.textContent = timer;
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
  }

  // Update the timer
  function updateTimer() {
    timer--;
    timerEl.textContent = timer;

    if (timer <= 0) {
      endQuiz();
    }
  }

  // Display a question
  function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, index) {
      var choiceItem = document.createElement("li");
      choiceItem.textContent = choice;
      choiceItem.setAttribute("data-index", index);
      choiceItem.addEventListener("click", checkAnswer);
      choicesEl.appendChild(choiceItem);
    });
  }

  // Check the selected answer
  function checkAnswer(event) {
    var selectedChoice = event.target;
    var selectedAnswer = selectedChoice.getAttribute("data-index");
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer.toString()) {
      score++;
    } else {
      timer -= 10;
      if (timer < 0) {
        timer = 0;
      }
    }

    scoreEl.textContent = score;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  // End the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.classList.add("hide");
    gameOverContainer.classList.remove("hide");
    initialsInput.focus();
    scoreForm.addEventListener("submit", saveScore);
    showHighScores();
  }

  // Save the score
  function saveScore(event) {
    event.preventDefault();

    var initials = initialsInput.value.trim();

    if (initials !== "") {
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      var newScore = {
        initials: initials,
        score: score
      };
      highScores.push(newScore);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      showHighScores();
    }
  }

  // Show the high scores
  function showHighScores() {
    highScoresContainer.classList.remove("hide");
    highScoresList.innerHTML = "";

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });

    highScores.forEach(function(highScore) {
      var highScoreItem = document.createElement("li");
      highScoreItem.textContent = highScore.initials + " - " + highScore.score;
      highScoresList.appendChild(highScoreItem);
    });
  }
});