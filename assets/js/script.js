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
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var initialsInput = document.getElementById("initials");
var highScoresList = document.getElementById("high-scores-list");
var startContainer = document.getElementById("start-container");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var feedbackElement = document.getElementById("feedback");

// Start the quiz
function startQuiz() {
  startContainer.style.display = "none";
  questionContainer.style.display = "block";
  showQuestion();
}

// Show a question on the screen
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceElement = document.createElement("button");
    choiceElement.textContent = (i + 1) + ". " + choice;
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
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong!";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// End the quiz
function endQuiz() {
  questionContainer.style.display = "none";
}

// Event listener for submitting initials and high score
document.getElementById("score-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var initials = initialsInput.value.trim();

  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = { initials: initials, score: score };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores();
  }
});

// Function to display high scores
function displayHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = highScores[i].initials + " - " + highScores[i].score;
    highScoresList.appendChild(scoreEntry);
  }
}

// Attach event listener to the Start Quiz button
document.getElementById("start-btn").addEventListener("click", startQuiz);