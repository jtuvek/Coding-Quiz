// Quiz Questions
var questions = [
    {
      question: "What is the capital city of France?",
      choices: ["Paris", "London", "Rome", "Madrid"],
      answer: 0
    },
    {
      question: "Which programming language is known as the 'mother of all languages'?",
      choices: ["Java", "Python", "C++", "Assembly"],
      answer: 3
    },
    {
      question: "What is the result of 2 + '2'?",
      choices: ["22", "4", "NaN", "Error"],
      answer: 0
    },
    {
      question: "What is the largest planet in our solar system?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: 2
    },
    {
      question: "Which HTML tag is used to define an unordered list?",
      choices: ["<ul>", "<ol>", "<li>", "<dl>"],
      answer: 0
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      answer: 0
    },
    {
      question: "Which company developed the JavaScript programming language?",
      choices: ["Mozilla", "Microsoft", "Netscape", "Oracle"],
      answer: 2
    },
    {
      question: "What does the 'typeof' operator in JavaScript return?",
      choices: ["The data type of a variable", "The value of a variable", "The length of a string", "The index of an array"],
      answer: 0
    },
    {
      question: "Which CSS property is used to change the text color of an element?",
      choices: ["font-size", "background-color", "text-align", "color"],
      answer: 3
    },
    {
      question: "What is the result of 5 == '5'?",
      choices: ["true", "false"],
      answer: 0
    }
  ];
  
  // DOM Elements
var startContainer = document.getElementById("start-container");
var startBtn = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var timeLeftEl = document.getElementById("time-left");
var gameOverContainer = document.getElementById("game-over-container");
var initialsInput = document.getElementById("initials");
var scoreForm = document.getElementById("score-form");
var highScoresList = document.getElementById("high-scores-list");

// Quiz Variables
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;

// Start the quiz
function startQuiz() {
  startContainer.classList.add("hide");
  timerEl.classList.remove("hide");
  questionContainer.classList.remove("hide");
  timeLeftEl.textContent = timeLeft;
  startTimer();
  displayQuestion();
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Display a question
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];

    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute("data-index", i);
    choiceBtn.addEventListener("click", checkAnswer);

    choicesEl.appendChild(choiceBtn);
  }
}

// Check the selected answer
function checkAnswer(event) {
  var selectedChoice = event.target;
  var selectedAnswer = parseInt(selectedChoice.getAttribute("data-index"));

  var currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timeLeftEl.textContent = timeLeft;
  }

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
  scoreForm.addEventListener("submit", saveHighScore);
}

// Save the high score
function saveHighScore(event) {
  event.preventDefault();

  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var highScore = {
      initials: initials,
      score: score
    };

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(highScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores();
  }
}

// Display the high scores
function displayHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScoresList.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var highScore = highScores[i];

    var li = document.createElement("li");
    li.textContent = highScore.initials + " - " + highScore.score;

    highScoresList.appendChild(li);
  }
}

// Event listener for start button
startBtn.addEventListener("click", startQuiz);