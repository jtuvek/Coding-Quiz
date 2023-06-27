# JavaScript Coding Quiz

This is a web-based coding quiz game built with HTML, CSS, and JavaScript. The game presents a series of coding-related questions to the player, with a timer counting down. The player must select the correct answer within the time limit. At the end of the quiz, the player can save their initials and score to compare with other players' high scores.

## Features

- Multiple-choice questions related to coding
- Timer countdown
- Feedback for correct and incorrect answers
- High score storage using local storage
- Ability to save initials and score at the end of the quiz
- "Go Back" button to restart the quiz

## Usage

To play the game, open the `index.html` file in a web browser. Click the "Start Quiz" button to begin the quiz. Read each question carefully and select the answer you believe is correct. If you select the wrong answer, time will be deducted from the timer. At the end of the quiz, enter your initials to save your score. You can view the high scores by clicking the "View High Scores" button on the start screen.

## Customization

To customize the quiz questions, you can modify the `questions` array in the `script.js` file. Each question object consists of a `question` property and an `answers` array of possible choices. Ensure the correct answer is marked with `correct: true`.

You can also adjust the quiz duration and other settings by modifying the constants defined at the top of the `script.js` file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.