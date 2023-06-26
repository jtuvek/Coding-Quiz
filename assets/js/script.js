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
  
  // Quiz Variables
  var currentQuestionIndex = 0;
  var score = 0;
  
  // Start the quiz
  function startQuiz() {
    startContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    displayQuestion();
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
    var selectedIndex = parseInt(selectedChoice.getAttribute("data-index"));
    var currentQuestion = questions[currentQuestionIndex];
  
    if (selectedIndex === currentQuestion.answer) {
      score++;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }
  
  // End the quiz
  function endQuiz() {
    questionContainer.classList.add("hide");
    var gameOverContainer = document.getElementById("game-over-container");
    gameOverContainer.classList.remove("hide");
    var scoreForm = document.getElementById("score-form");
    var initialsInput = document.getElementById("initials");
    var highScoresList = document.getElementById("high-scores-list");
    var scoreItem = document.createElement("li");
    scoreItem.textContent = initialsInput.value + " - " + score;
    highScoresList.appendChild(scoreItem);
    scoreForm.reset();
  }
  
  // Event listener for start button
  startBtn.addEventListener("click", startQuiz);  