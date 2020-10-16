// declare global variables
const mainEl = document.querySelector('main');
const timeEl = document.getElementById('time');
let timeRemaining = 60;
let currentQuestion = {};
let score = 0;
let highScore = 0;

const q1 = {
    number: 1,
    question: "i am a question",
    answers: ["am i correct?", "or am i correct?", "its probably this one", "or maybe this one"],
    // index number of correct answer
    correct: 2
};

const q2 = {
    number: 2,
    question: "i am a second question",
    answers: ["right", "wrong", "wrong", "wrong"],
    // index number of correct answer
    correct: 0
};

const q3 = {
    number: 3,
    question: "i am a third question",
    answers: ["wrong", "right", "wrong", "wrong"],
    // index number of correct answer
    correct: 1
};

const questionRefs = [q1, q2, q3];





// create welcome element
const displayWelcome = function() {
    welcomeEl = document.createElement("div");
    welcomeTitle = document.createElement("h1");
    welcomeSubtext = document.createElement("p")
    buttonEl = document.createElement("div")
    startButton = document.createElement("button")

    welcomeEl.setAttribute("id", "welcome");
    welcomeEl.setAttribute("class", "big-div")
    welcomeTitle.setAttribute("class", "element-title");
    welcomeTitle.textContent = "Welcome to the Web Developer Quiz!"
    welcomeSubtext.textContent = "Try and and answer the following developer-related question within the time limit. keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    startButton.textContent = "Start Quiz"
    startButton.setAttribute("id", "start-quiz")
    startButton.setAttribute("class", "button")
    buttonEl.appendChild(startButton);
    welcomeEl.appendChild(welcomeTitle);
    welcomeEl.appendChild(welcomeSubtext);
    welcomeEl.appendChild(buttonEl);

    mainEl.appendChild(welcomeEl);
};

// create a new question element
const displayQuestion = function(obj) {
    // create question element
    questionEl = document.createElement("div");
    questionTextEl = document.createElement("h1");
    answerOlEl = document.createElement("ol");

    questionEl.setAttribute("class", "big-div");
    questionTextEl.setAttribute("class", "question-text");
    answerOlEl.setAttribute("class", "button-list");
    questionEl.setAttribute("data-question-id", obj.number);
    console.log(obj.number)

    questionTextEl.textContent = obj.question;
    for (i=0; i<4; i++) {
        answerEl = document.createElement("li");
        answerButton = document.createElement("button");
        answerButton.setAttribute("class", "button");
        answerButton.setAttribute("data-answer-id", i);
        answerButton.textContent = obj.answers[i];

        answerEl.appendChild(answerButton);
        answerOlEl.appendChild(answerEl);
    };

    questionEl.appendChild(questionTextEl);
    questionEl.appendChild(answerOlEl);

    mainEl.appendChild(questionEl);
    currentQuestion = obj;
};

// clear screen and replace with next div

const clearAndReplace = function(currentEl, questionNumber) {
    mainEl.removeChild(currentEl);
    input = questionRefs[questionNumber]
    console.log(input);
    displayQuestion(input);
    // displayQuestion(question1);
};

// start count down
const countDown = function() {
    let timeInterval = setInterval(function() {
        if (timeRemaining < 1) {
            timeRemaining = 0;
            console.log("time is up")
            clearInterval(timeInterval);
        };
    timeEl.textContent = timeRemaining;
    timeRemaining--;
    }, 1000);
};

const timePenalty = function() {
    if (timeRemaining > 0) {
        timeRemaining = timeRemaining - 10;
    }
};

displayWelcome();

// set up button event listener 

mainEl.addEventListener("click", function(event) {
    // get reference to what element was clicked
    const mouse = event.target;
    // get reference to the main element to clear it. 
    let parent = event.path.length - 6;

    // see if the user clicked a button
    if (mouse.className === "button") {
        // if that button is the start quiz button
        if (mouse.id === "start-quiz"){
            // start the timer
            countDown();
            // clear screen and display the questions
            clearAndReplace(event.path[parent], 0);
        } 
        // if that button is an answer button
        else if (mouse.hasAttribute("data-answer-id")) {
            selectedAnswer = mouse.getAttribute("data-answer-id");
            correctAnswer = question1.correct;
            if (selectedAnswer == correctAnswer) {
                console.log("that's it")
                score++;
                let currentQuestion = event.path[parent].getAttribute("data-question-id");
                clearAndReplace(event.path[parent], currentQuestion);
            } else {
                console.log("nope");
                timePenalty();
            };

        }
    } else {
        return;
    };
});

