// declare global variables
const mainEl = document.querySelector("main");
const timeEl = document.getElementById("time");
const timerEl = document.querySelector(".timer");
let timeRemaining = NaN;
let currentQuestion = {};
let score = 0;
let highScore = 0;

const q1 = {
  number: 1,
  question: "What is the correct HTML for making a radio button?",
  answers: [
    "<radio>",
    "<radiobutton>",
    '<input type="radio">',
    '<input type="radiobutton">',
  ],
  // index number of correct answer
  correct: 2,
};

const q2 = {
  number: 2,
  question:
    'After you initialize a new Git repository and create a file named "developer-quiz.html", which of the following commands will not work if issued?',
  answers: [
    "git add developer-quiz.html",
    "git status",
    "git add .",
    'git commit -m "developer quiz web file added"',
  ],
  // index number of correct answer
  correct: 3,
};

const q3 = {
  number: 3,
  question: "What is an example of a pseudo-element?",
  answers: ["::before", "::after", "::first-letter", "All of the above"],
  // index number of correct answer
  correct: 3,
};

const q4 = {};
// get reference to each question object for input as function parameters
const questionRefs = [q1, q2, q3];

// create welcome element
const displayWelcome = function () {
  // reset the score
  score = 0;
  // create welcome elements
  welcomeEl = document.createElement("div");
  welcomeTitle = document.createElement("h1");
  welcomeSubtext = document.createElement("p");
  buttonEl = document.createElement("div");
  startButton = document.createElement("button");
  // give elements attributes and text content
  welcomeEl.setAttribute("id", "welcome");
  welcomeEl.setAttribute("class", "big-div");
  welcomeTitle.setAttribute("class", "element-title");
  welcomeTitle.textContent = "Welcome to the Web Developer Quiz!";
  welcomeSubtext.textContent =
    "Try and and answer the following developer-related question within the time limit. keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  startButton.textContent = "Start Quiz";
  startButton.setAttribute("id", "start-quiz");
  startButton.setAttribute("class", "button");
  // append the elements to the welcomeEL
  buttonEl.appendChild(startButton);
  welcomeEl.appendChild(welcomeTitle);
  welcomeEl.appendChild(welcomeSubtext);
  welcomeEl.appendChild(buttonEl);
  // append welcomeEl to the screen
  mainEl.appendChild(welcomeEl);
};

// create a new question element
const displayQuestion = function (obj) {
  // create question elements
  questionEl = document.createElement("div");
  questionTextEl = document.createElement("h1");
  answerulEl = document.createElement("ul");
  // give elements attributes and text content from obj
  questionEl.setAttribute("class", "big-div");
  questionTextEl.setAttribute("class", "question-text");
  answerulEl.setAttribute("class", "button-list");
  questionEl.setAttribute("data-question-id", obj.number);
  questionTextEl.textContent = obj.question;
  // create answer elements, attributes and text content in a loop of 4
  for (i = 0; i < 4; i++) {
    answerEl = document.createElement("li");
    answerButton = document.createElement("button");
    // call these buttons "answer" instead of button
    answerButton.setAttribute("class", "answer");
    answerButton.setAttribute("data-answer-id", i);
    answerButton.textContent = obj.answers[i];
    // append button into answer element, then onto list
    answerEl.appendChild(answerButton);
    answerulEl.appendChild(answerEl);
  }
  // append question and answers to question element
  questionEl.appendChild(questionTextEl);
  questionEl.appendChild(answerulEl);
  // append question element to the screen
  mainEl.appendChild(questionEl);
};

// display end screen after last question
const displayEndScreen = function () {
  // create elements
  endEl = document.createElement("div");
  h1El = document.createElement("h1");
  formEl = document.createElement("form");
  nameInput = document.createElement("input");
  formButton = document.createElement("button");
  buttonEl = document.createElement("div");
  startButton = document.createElement("button");
  // set attributes and content
  h1El.textContent = "Game over, man.";
  endEl.setAttribute("class", "big-div");
  formEl.setAttribute("id", "score-form");
  formButton.setAttribute("id", "score-submit-button");
  formButton.textContent = "Submit High Score";
  nameInput.setAttribute("id", "name-input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "enter your initials");
  startButton.setAttribute("id", "start-quiz");
  startButton.setAttribute("class", "button");
  startButton.textContent = "Try Again";
  // append
  formEl.appendChild(nameInput);
  formEl.appendChild(formButton);
  buttonEl.appendChild(startButton);
  endEl.appendChild(h1El);
  endEl.appendChild(formEl);
  endEl.appendChild(buttonEl);

  mainEl.appendChild(endEl);
  // store the high score
  formRef = document.querySelector("#score-form");
  // add event listener to form
  formRef.addEventListener("submit", function (event) {
    event.preventDefault();
    nameInput = event.srcElement[0].value;
    localStorage.setItem("initials", nameInput);
    localStorage.setItem("high-score", score);

    formEl.reset();
    alert("Your score has been saved!")
  });
  timeRemaining = 0;
};

const displayHighScore = function () {
  timeRemaining = 0;
  score = 0;

  scoreEl = document.createElement("div");
  h1El = document.createElement("h1");
  scoreDisplayEl = document.createElement("h2");
  initialsDisplayEl = document.createElement("h2")
  buttonEl = document.createElement("div");
  startButton = document.createElement("button");

  scoreEl.setAttribute("class", "big-div");
  h1El.textContent = "High Score: ";
  startButton.textContent = "Start Quiz";
  startButton.setAttribute("id", "start-quiz");
  startButton.setAttribute("class", "button");

  if (localStorage.getItem("high-score") == null) {
    scoreDisplayEl.textContent = "There is no High Score set!";
  } else {
    scoreDisplayEl.textContent = 
      "The most questions answered is: " + localStorage.getItem("high-score");
      initialsDisplayEl.textContent = "Set by: " + localStorage.getItem("initials");
  }
  buttonEl.appendChild(startButton);
  scoreEl.appendChild(h1El);
  scoreEl.appendChild(scoreDisplayEl);
  scoreEl.appendChild(initialsDisplayEl);
  scoreEl.appendChild(buttonEl);

  mainEl.appendChild(scoreEl);
};

// clear screen and replace with next div input is the next question number, or "highScore"
const clearAndReplace = function (nextEl) {
  const displayEl = document.querySelector(".big-div");
  mainEl.removeChild(displayEl);
  // see if we are replacing current element with high score screen
  if (nextEl === "highScore") {
    displayHighScore();
  }
  // check if question number for next El is greater than the list of questions
  else if (nextEl > questionRefs.length - 1) {
    displayEndScreen();
  }
  // display next question
  else {
    input = questionRefs[nextEl];
    displayQuestion(input);
  }
};

// start count down
const countDown = function () {
  let timeInterval = setInterval(function () {
    if (timeRemaining < 1) {
      // set to zero if a wrong answer is selected with less than 10 seconds left
      timeRemaining = 0;
      // stop the timer
      clearInterval(timeInterval);
      // send to end screen by calling a question number that is larger than the list of questions
      clearAndReplace(questionRefs.length);
    }
    timeEl.textContent = timeRemaining;
    timeRemaining--;

  }, 1000);
};

// subtract 10 seconds from clock
const timePenalty = function () {
  if (timeRemaining > 0) {
    timeRemaining = timeRemaining - 10;
    timerEl.style.color = "red";
    setTimeout(function () {
      timerEl.style.color = "black";
    }, 1500);
  }
};

displayWelcome();

// set up button event listener

mainEl.addEventListener("click", function (event) {
  // get reference to what element was clicked
  const mouse = event.target;
  console.log(mouse.id)
  // get reference to the main element to clear it.
  let parent = event.path.length - 6;
  // see if the user clicked a button
  if (mouse.className === "button" || mouse.className === "answer") {
    // if that button is the start quiz button
    if (mouse.id === "start-quiz") {
      // reset timer
      timeRemaining = 60;
      // start the timer
      countDown();
      // clear screen and display the questions
      clearAndReplace(0);
    }
    // if that button is an answer button
    else if (mouse.hasAttribute("data-answer-id")) {
      console.dir(mouse)
      // get reference to which answer was clicked
      selectedAnswer = mouse.getAttribute("data-answer-id");
      // get reference to the current question ID (1 index)
      let currentQuestionId = event.path[parent].getAttribute(
        "data-question-id"
      );
      // use question ID to get reference to question object
      let currentQuestionObj = questionRefs[currentQuestionId - 1];
      // get reference to the correct answer
      correctAnswer = currentQuestionObj.correct;
      // if answer is correct
      if (selectedAnswer == correctAnswer) {
        // increment the score
        score++;
        clearAndReplace(currentQuestionId);
      }
      // if answer is incorrect, remove time
      else {
        timePenalty();
      }
    }
  }
  // if the user clicked the high scores button
  else if (mouse.id === "high-score") {
    console.log("this is working")
    if (timeRemaining > 1) {
      alert("Please finish your quiz!");
    } else {
      clearAndReplace("highScore");
    }
  }
  // if the user didn't click a button or the high scores
  else {
    return;
  }
});
