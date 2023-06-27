// Quiz Questions
var questions = [
    {
      question: "What is HTML?",
      choices: [
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "None of the above"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What is CSS?",
      choices: [
        "Cascading Style Sheet",
        "Colorful Style Sheet",
        "Computer Style Sheet",
        "None of the above"
      ],
      answer: "Cascading Style Sheet"
    },
    {
      question: "What is JavaScript?",
      choices: [
        "A programming language",
        "A scripting language",
        "Both of the above",
        "None of the above"
      ],
      answer: "Both of the above"
    },
    {
      question: "What is a variable in JavaScript?",
      choices: [
        "A container to store data",
        "A function that performs a specific task",
        "A way to define HTML tags",
        "None of the above"
      ],
      answer: "A container to store data"
    },
    {
      question: "What does the 'console.log()' function do?",
      choices: [
        "Prints output to the console",
        "Changes the background color of a web page",
        "Creates a new HTML element",
        "None of the above"
      ],
      answer: "Prints output to the console"
    },
    {
      question: "What is the purpose of a 'for' loop in JavaScript?",
      choices: [
        "To repeat a block of code a specific number of times",
        "To define a function",
        "To select elements from the DOM",
        "None of the above"
      ],
      answer: "To repeat a block of code a specific number of times"
    },
    {
      question: "What is the CSS box model used for?",
      choices: [
        "Describing the layout and spacing of elements on a web page",
        "Defining colors and backgrounds",
        "Handling user interactions and events",
        "None of the above"
      ],
      answer: "Describing the layout and spacing of elements on a web page"
    },
    {
      question: "What is the purpose of the 'addEventListener()' method in JavaScript?",
      choices: [
        "To attach an event handler function to an element",
        "To create a new HTML element",
        "To perform mathematical calculations",
        "None of the above"
      ],
      answer: "To attach an event handler function to an element"
    }
  ];
  
 // DOM Elements
var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var messageElement = document.getElementById("message");
var timerElement = document.getElementById("time-left");
var gameOverContainer = document.getElementById("game-over-container");
var finalScoreElement = document.getElementById("final-score");
var scoreForm = document.getElementById("score-form");
var initialsInput = document.getElementById("initials");
var highScoresList = document.getElementById("high-scores-list");

var currentQuestionIndex;
var timerInterval;
var timeLeft;
var highScores = [];

function startQuiz() {
  currentQuestionIndex = 0;
  timeLeft = 60;
  startTimer();
  showQuestion();
  hideElement(startButton);
  showElement(questionContainer);
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function updateTimer() {
  timerElement.textContent = timeLeft;
}

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.classList.add("choice");
    choiceButton.textContent = i + 1 + ". " + choice;
    choiceButton.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choiceButton);
  }
}

function checkAnswer(event) {
  var selectedChoice = event.target;
  var selectedAnswer = selectedChoice.textContent.slice(3);

  if (selectedAnswer === questions[currentQuestionIndex].answer) {
    showMessage("Correct!");
  } else {
    showMessage("Wrong!");
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    updateTimer();
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timerInterval);
  hideElement(questionContainer);
  showElement(gameOverContainer);
  finalScoreElement.textContent = timeLeft;
}

function showMessage(message) {
  messageElement.textContent = message;
  showElement(messageElement);
  setTimeout(function () {
    hideElement(messageElement);
  }, 1000);
}

function hideElement(element) {
  element.classList.add("hide");
}

function showElement(element) {
  element.classList.remove("hide");
}

startButton.addEventListener("click", startQuiz);