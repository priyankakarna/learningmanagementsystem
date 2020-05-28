Skip to content


  
Pull requests 
Issues 
Marketplace 
Explore 


 



Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request. 
Read the guide 


jamesqquick 
/
Build-A-Quiz-App-With-HTML-CSS-and-JavaScript 
Watch 
13 
Star 
130 
Fork 
140 
Code 
Issues 3 
Pull requests 0 
Actions 
Projects 0 
Wiki 
Security 0 
Insights 

Branch: master 
Build-A-Quiz-App-With-HTML-CSS-and-JavaScript/Quiz App Master/game.js / Jump to 
Find file 
Copy path 
 jamesqquick Using innerHTML instead of innerText to handle encoding problems on d… 
bb69bba on Apr 15, 2019 
1 contributor 
114 lines (95 sloc) 3.11 KB 
Raw
Blame
History


const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");

const scoreText = document.getElementById("score");

const progressBarFull = document.getElementById("progressBarFull");

const loader = document.getElementById("loader");

const game = document.getElementById("game");

let currentQuestion = {};

let acceptingAnswers = false;

let score = 0;

let questionCounter = 0;

let availableQuesions = [];



let questions = [];



fetch(

  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"

)

  .then(res => {

    return res.json();

  })

  .then(loadedQuestions => {

    console.log(loadedQuestions.results);

    questions = loadedQuestions.results.map(loadedQuestion => {

      const formattedQuestion = {

        question: loadedQuestion.question

      };



      const answerChoices = [...loadedQuestion.incorrect_answers];

      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

      answerChoices.splice(

        formattedQuestion.answer - 1,

        0,

        loadedQuestion.correct_answer

      );



      answerChoices.forEach((choice, index) => {

        formattedQuestion["choice" + (index + 1)] = choice;

      });



      return formattedQuestion;

    });



    startGame();

  })

  .catch(err => {

    console.error(err);

  });



//CONSTANTS

const CORRECT_BONUS = 10;

const MAX_QUESTIONS = 3;



startGame = () => {

  questionCounter = 0;

  score = 0;

  availableQuesions = [...questions];

  getNewQuestion();

  game.classList.remove("hidden");

  loader.classList.add("hidden");

};



getNewQuestion = () => {

  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {

    localStorage.setItem("mostRecentScore", score);

    //go to the end page

    return window.location.assign("/end.html");

  }

  questionCounter++;

  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;



  const questionIndex = Math.floor(Math.random() * availableQuesions.length);

  currentQuestion = availableQuesions[questionIndex];

  question.innerHTML = currentQuestion.question;



  choices.forEach(choice => {

    const number = choice.dataset["number"];

    choice.innerHTML = currentQuestion["choice" + number];

  });



  availableQuesions.splice(questionIndex, 1);

  acceptingAnswers = true;

};



choices.forEach(choice => {

  choice.addEventListener("click", e => {

    if (!acceptingAnswers) return;



    acceptingAnswers = false;

    const selectedChoice = e.target;

    const selectedAnswer = selectedChoice.dataset["number"];



    const classToApply =

      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";



    if (classToApply === "correct") {

      incrementScore(CORRECT_BONUS);

    }



    selectedChoice.parentElement.classList.add(classToApply);



    setTimeout(() => {

      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();

    }, 1000);

  });

});



incrementScore = num => {

  score += num;

  scoreText.innerText = score;

};

© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help

Contact GitHub
Pricing
API
Training
Blog
About

