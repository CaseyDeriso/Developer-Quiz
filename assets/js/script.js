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
// get reference to each question object for input as function parameters
const questionRefs = [q1, q2, q3];





// create welcome element
const displayWelcome = function() {
    score = 0;
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

// display end screen after last question
const displayEndScreen = function() {
    endEl = document.createElement("div");
    h1El = document.createElement("h1");

    h1El.textContent = "Game over, man."
    endEl.setAttribute("class", "big-div");

    endEl.appendChild(h1El);
    mainEl.appendChild(endEl);
    localStorage.setItem("high-score", score);
    timeRemaining = 0;
}

const displayHighScore = function() {
    timeRemaining = 0;

    scoreEl = document.createElement("div");
    h1El = document.createElement("h1");
    scoreDisplayEl = document.createElement("h2");
    buttonEl = document.createElement("div")
    startButton = document.createElement("button")


    scoreEl.setAttribute("class", "big-div");
    h1El.textContent = "High Score: "
    startButton.textContent = "Start Quiz"
    startButton.setAttribute("id", "start-quiz")
    startButton.setAttribute("class", "button")

    if (localStorage.getItem("high-score") == null) {
        scoreDisplayEl.textContent = "There is no High Score set!"
    } 
    else {
    scoreDisplayEl.textContent = localStorage.getItem("high-score") + " " + localStorage.getItem("initials");
    }
    buttonEl.appendChild(startButton);
    scoreEl.appendChild(h1El);
    scoreEl.appendChild(scoreDisplayEl);
    scoreEl.appendChild(buttonEl);

    mainEl.appendChild(scoreEl);
}



// clear screen and replace with next div
const clearAndReplace = function(nextEl) {
    const displayEl = document.querySelector(".big-div")
    mainEl.removeChild(displayEl);
    // see if we are replacing current element with high score screen
    if (nextEl === "highScore") {
        displayHighScore()
    } 
    // check if question number for next El is greater than the list of questions
    else if (nextEl > questionRefs.length - 1) {
        displayEndScreen()
    } 
    // display next question
    else {
    input = questionRefs[nextEl]
    displayQuestion(input);
    };
};

// start count down
const countDown = function() {
    let timeInterval = setInterval(function() {
        if (timeRemaining < 1) {
            timeRemaining = 0;
            clearInterval(timeInterval);
            clearAndReplace(questionRefs.length)
        };
    timeEl.textContent = timeRemaining;
    timeRemaining--;
    }, 1000);
};

// subtract 10 seconds from clock
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
            // reset timer 
            timeRemaining = 60;
            // start the timer
            countDown();
            // clear screen and display the questions
            clearAndReplace(0);
        } 
        // if that button is an answer button
        else if (mouse.hasAttribute("data-answer-id")) {
            // get reference to which answer was clicked
            selectedAnswer = mouse.getAttribute("data-answer-id");
            // get reference to the current question ID (1 index)
            let currentQuestionId = event.path[parent].getAttribute("data-question-id");
            // use question ID to get reference to question object
            let currentQuestionObj = questionRefs[currentQuestionId - 1]
            // get reference to the correct answer
            correctAnswer = currentQuestionObj.correct;
            // if answer is correct
            if (selectedAnswer == correctAnswer) {
                console.log("that's it")
                // increment the score
                score++;
                clearAndReplace(currentQuestionId);
            } 
            // if answer is incorrect, remove time
            else {
                console.log("nope");
                timePenalty();
            };
        };
    }
    // if the user clicked the high scores button
    else if (mouse.id === "high-score") {
        if (timeRemaining > 0) {
            alert("Please finish your quiz!")
        }
        else {
        clearAndReplace("highScore");
        }
    }
    // if the user didn't click a button or the high scores
    else {
        return;
    };
});

