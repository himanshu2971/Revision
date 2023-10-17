// Value is stored in the stack
const name = 'John';
const age = 30;

// Reference is stored in the heap
const person = {
  name: 'Brad',
  age: 40,
};

let newName = name;
newName = 'Jonathan';

let newPerson = person;
newPerson.name = 'Bradley';

console.log(name, newName); // John, Jonathan
console.log(person, newPerson); // { name: 'Bradley', age: 40 }, { name: 'Bradley', age: 40 }


// DOM elements
const startButton = document.getElementById('start-button');
const loader = document.getElementById('loader');
const quizView = document.getElementById('quiz-view');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitButton = document.getElementById('submit-button');
const resultMessage = document.getElementById('result-message');

let currentQuestionIndex = 0;
let userAnswer = null;

// Simulated API response (you would replace this with a real API call)
const quizData = [
  {
    question: 'Angular 2 components can be described using meta-programming.',
    options: [
      'a) controllers, controller',
      'b) Loaders, loader',
      'c) typescripts, typescript',
      'd) decorators, decorator'
    ],
    answer: 3
  },
  // Add more questions here
];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.style.display = 'none';
  loader.style.display = 'block';

  // Simulate fetching data from an API
  setTimeout(() => {
    loader.style.display = 'none';
    quizView.style.display = 'block';
    displayQuestion();
  }, 1000);
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(optionElement);
  });

  submitButton.disabled = true;
}

function selectAnswer(index) {
  userAnswer = index;
  const options = optionsContainer.querySelectorAll('.option');
  options.forEach((option, i) => {
    if (i === index) {
      option.classList.add('user-answer');
    } else {
      option.classList.remove('user-answer');
    }
  });

  submitButton.disabled = false;
}

submitButton.addEventListener('click', checkAnswer);

function checkAnswer() {
  const currentQuestion = quizData[currentQuestionIndex];
  if (userAnswer === currentQuestion.answer) {
    resultMessage.textContent = 'Correct!';
    optionsContainer.children[userAnswer].classList.add('correct-answer');
  } else {
    resultMessage.textContent = 'Incorrect!';
    optionsContainer.children[userAnswer].classList.add('wrong-answer');
    optionsContainer.children[currentQuestion.answer].classList.add('correct-answer');
  }

  // Move to the next question
  currentQuestionIndex++;

  // You can handle the end of the quiz here
  if (currentQuestionIndex < quizData.length) {
    setTimeout(() => {
      resultMessage.textContent = '';
      displayQuestion();
    }, 1500);
  } else {
    resultMessage.textContent = 'Quiz Completed';
  }
}
