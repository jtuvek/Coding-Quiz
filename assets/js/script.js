document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions
    var questions = [
      {
        question: "What is the output of the following code?\n\nconsole.log(2 + '2');",
        choices: ["4", "'22'", "22", "NaN"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is not a valid JavaScript data type?",
        choices: ["String", "Number", "Boolean", "Character"],
        correctAnswer: 3
      },
      {
        question: "What does HTML stand for?",
        choices: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Tool Markup Language"],
        correctAnswer: 2
      },
      {
        question: "Which JavaScript keyword is used to declare a variable?",
        choices: ["var", "let", "const", "variable"],
        correctAnswer: 0
      },
      {
        question: "What does CSS stand for?",
        choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 1
      },
      {
        question: "What is the correct syntax for a function named 'myFunction' in JavaScript?",
        choices: ["function = myFunction()", "function myFunction()", "myFunction = function()", "myFunction() = function"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is not a JavaScript framework?",
        choices: ["React", "Angular", "Vue", "Java"],
        correctAnswer: 3
      },
      {
        question: "What is the purpose of the 'git clone' command?",
        choices: ["Create a new Git repository", "Add files to the staging area", "Create a branch in Git", "Copy a repository from a remote source"],
        correctAnswer: 3
      },
      {
        question: "Which HTML tag is used to define a hyperlink?",
        choices: ["<a>", "<p>", "<h1>", "<div>"],
        correctAnswer: 0
      },
      {
        question: "What does JSON stand for?",
        choices: ["JavaScript Object Notation", "JavaScript Oriented Notation", "Java Syntax Object Notation", "Java Scripting Object Notation"],
        correctAnswer: 0
      }
    ];
  
    var currentQuestionIndex = 0;
    var score = 0;
    var timer = 60;
    var timerInterval;
  
    var startBtn = document.getElementById("start-btn");
    var questionContainer = document.getElementById("question-container");
    var questionEl = document.getElementById("question");
    var choicesEl = document.getElementById("choices");
    var scoreEl = document.getElementById("score");
    var timerEl = document.getElementById("timer");
    var gameOverContainer = document.getElementById("game-over-container");
    var initialsInput = document.getElementById("initials");
    var scoreForm = document.getElementById("score-form");
  
    // Start the quiz
    startBtn.addEventListener("click", startQuiz);
  
    function startQuiz() {
      startBtn.style.display = "none";
      questionContainer.style.display = "block";
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
  
      for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var li = document.createElement("li");
        li.textContent = choice;
        li.setAttribute("data-index", i);
        choicesEl.appendChild(li);
        li.addEventListener("click", checkAnswer);
      }
    }
  
    // Check the selected answer
    function checkAnswer(event) {
      var selectedChoice = event.target;
      var selectedIndex = selectedChoice.getAttribute("data-index");
      var currentQuestion = questions[currentQuestionIndex];
  
      if (selectedIndex == currentQuestion.correctAnswer) {
        score++;
      } else {
        timer -= 10;
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
      questionContainer.style.display = "none";
      gameOverContainer.style.display = "block";
      initialsInput.focus();
      scoreForm.addEventListener("submit", saveScore);
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
        window.location.href = "highscores.html";
      }
    }
  });
  