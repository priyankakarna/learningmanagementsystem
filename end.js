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
Build-A-Quiz-App-With-HTML-CSS-and-JavaScript/Quiz App Master/end.js / Jump to 
Find file 
Copy path 
 jamesqquick Final project folders based on videos and updated readme 
9417134 on Feb 11, 2019 
1 contributor 
30 lines (23 sloc) 854 Bytes 
Raw
Blame
History


const username = document.getElementById("username");

const saveScoreBtn = document.getElementById("saveScoreBtn");

const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");



const highScores = JSON.parse(localStorage.getItem("highScores")) || [];



const MAX_HIGH_SCORES = 5;



finalScore.innerText = mostRecentScore;



username.addEventListener("keyup", () => {

  saveScoreBtn.disabled = !username.value;

});



saveHighScore = e => {

  console.log("clicked the save button!");

  e.preventDefault();



  const score = {

    score: Math.floor(Math.random() * 100),

    name: username.value

  };

  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(5);



  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.assign("/");

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

