// Quiz Questions
var questions = [
    {
      question: "Question 1: What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "Question 2: Which symbol is used to access the ID in CSS?",
      choices: ["#", ".", "$", "@"],
      correctAnswer: "#"
    },
    {
      question: "Question 3: What is the correct syntax to create a function in JavaScript?",
      choices: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction() = function"],
      correctAnswer: "function myFunction()"
    },
    {
      question: "Question 4: Which programming language is used for styling web pages?",
      choices: ["HTML", "CSS", "JavaScript", "Python"],
      correctAnswer: "CSS"
    },
    {
      question: "Question 5: What is the output of the following code?\nvar x = 5;\nconsole.log(x === '5');",
      choices: ["true", "false", "TypeError", "ReferenceError"],
      correctAnswer: "false"
    },
    {
      question: "Question 6: Which operator is used to concatenate strings in JavaScript?",
      choices: ["+", "-", "*", "/"],
      correctAnswer: "+"
    },
    {
      question: "Question 7: What is the purpose of the 'this' keyword in JavaScript?",
      choices: ["To create a new object", "To refer to the current object", "To import external libraries", "To loop over an array"],
      correctAnswer: "To refer to the current object"
    },
    {
      question: "Question 8: What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets"
    },
  ];
  
  // Other variables
  var startContainer = document.getElementById("start-container");
  var questionContainer = document.getElementById("question-container");
  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");
  var feedbackContainer = document.getElementById("feedback-container");
  var feedbackElement = document.getElementById("feedback");
  var gameOverContainer = document.getElementById("game-over-container");
  var scoreForm = document.getElementById("score-form");
  var initialsInput = document.getElementById("initials");
  var highScoresList = document.getElementById("high-scores-list");
  
  var currentQuestionIndex = 0;
  var timeLeft = 60;
  var timerInterval;
  var score = 0;
  var highScores = [];
  
  // Start the quiz
  function startQuiz() {
    startContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    startTimer();
    showQuestion();
  }
  
  // Start the timer
  function startTimer() {
    timerInterval = setInterval(function () {
      timeLeft--;
      updateTimer();
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  // Update the timer on the screen
  function updateTimer() {
    var timerElement = document.getElementById("timer");
    timerElement.textContent = "Time: " + timeLeft;
  }
  
  // Show a question on the screen
  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
  
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choice = currentQuestion.choices[i];
      var choiceElement = document.createElement("button");
      choiceElement.textContent = i + 1 + ". " + choice;
      choiceElement.setAttribute("class", "choice");
      choiceElement.setAttribute("value", choice);
  
      choiceElement.addEventListener("click", handleChoiceClick);
  
      choicesElement.appendChild(choiceElement);
    }
  }
  
  // Handle the click event on a choice
  function handleChoiceClick(event) {
    var selectedChoice = event.target.value;
    var currentQuestion = questions[currentQuestionIndex];
  
    if (selectedChoice === currentQuestion.correctAnswer) {
      score++;
      feedbackElement.textContent = "Correct!";
    } else {
      timeLeft -= 10;
      feedbackElement.textContent = "Wrong!";
    }
  
    feedbackContainer.classList.remove("hide");
  
    setTimeout(function () {
      feedbackContainer.classList.add("hide");
      currentQuestionIndex++;
  
      if (currentQuestionIndex === questions.length) {
        endQuiz();
      } else {
        showQuestion();
      }
    }, 1000);
  }
  
  // End the quiz
  function endQuiz() {
    clearInterval(timerInterval);
  
    questionContainer.classList.add("hide");
    gameOverContainer.classList.remove("hide");
  
    var scoreElement = document.getElementById("final-score");
    scoreElement.textContent = "Your final score is: " + score;
  
    scoreForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveHighScore();
    });
  }
  
  // Save the high score
  function saveHighScore() {
    var initials = initialsInput.value.trim();
  
    if (initials !== "") {
      var highScore = {
        initials: initials,
        score: score
      };
  
      highScores.push(highScore);
      highScores.sort(function (a, b) {
        return b.score - a.score;
      });
  
      localStorage.setItem("highScores", JSON.stringify(highScores));
  
      showHighScores();
    }
  }
  
  // Show the high scores
  function showHighScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  
    if (storedHighScores !== null) {
      highScores = storedHighScores;
    }
  
    highScoresList.innerHTML = "";
  
    for (var i = 0; i < highScores.length; i++) {
      var highScore = highScores[i];
      var highScoreItem = document.createElement("li");
      highScoreItem.textContent = highScore.initials + " - " + highScore.score;
      highScoresList.appendChild(highScoreItem);
    }
  }
  
  // Load the high scores
  showHighScores();
  