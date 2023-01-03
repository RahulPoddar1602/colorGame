var colors =["Blue","Red","Green","Yellow","Black","White"]
var checkmark = document.getElementById("checkmark");
var wrong = document.getElementById("wrong");
var correct = document.getElementById("correct");
var correctInt=0;
function startGame(){
    setInterval(timer, 1000);
    reset();
}
function checkColor(color, correctAnswer){
    if(color===correctAnswer){
        correctInt++;
        checkmark.classList.add("fadeAway");
    }else{
        wrong.classList.add("fadeAway");
    }
    setTimeout(function(){
        checkmark.classList.remove("fadeAway");
        wrong.classList.remove("fadeAway");
    },500);
    reset();
    correct.innerHTML = `SCORE : ${correctInt}`;
}
function reset(){
    var random1 = Math.floor(Math.random()*2);
    if(random1==0){
        var color1 = document.getElementById("color1");
        var color2 = document.getElementById("color2");
    }else{
        var color2 = document.getElementById("color1");
        var color1 = document.getElementById("color2");
    }
    document.getElementById("start").style.display = "none";
    document.getElementById("instruction").style.display = "none";
    stopwatch.play();
    var random = Math.floor(Math.random() * 6);
    var correctAnswer = colors[random];
    color1.innerHTML = correctAnswer;
    color2.style.color = correctAnswer;
    var random2,random3;
    while(true)
    {
        random2 = Math.floor(Math.random() * 6);
        if(random2!=random){
            break;
        }
    }
    while(true)
    {
        random3 = Math.floor(Math.random() * 6);
        if(random3!=random && random3!=random2){
            break;
        }
    }
    color1.style.color = colors[random3];
    color2.innerHTML = colors[random2];
    color1.style.display = "block";
    color2.style.display = "block";
    addClick("Blue", correctAnswer);
    addClick("Red", correctAnswer);
    addClick("Green", correctAnswer);
    addClick("Yellow", correctAnswer);
    addClick("Black", correctAnswer);
    addClick("White", correctAnswer);
}
function addClick(color, correctAnswer){
    var colorSpan = document.getElementById(color);
    let onclick = `checkColor(${color},${correctAnswer})`;
    colorSpan.setAttribute("onclick", onclick);
}
var countdown = 30;
function timer(){
    document.getElementById("time").innerHTML = `TIME: ${countdown}`;
    if(countdown==0){
        stopwatch.pause();
        clearInterval(timer);
        if(correctInt>localStorage.getItem("highscore")){
            localStorage.setItem("highscore", correctInt);
        }
        alert("Game Over. Score: " + correctInt);
        location.reload();
    }
    countdown--;
}
if(localStorage.getItem("highscore")===null){
    localStorage.setItem("highscore", 0);
}
document.getElementById("highestScore").innerHTML =`BEST : ${localStorage.getItem("highscore")} `;
var stopwatch = new Audio("./Timer.mp3");
