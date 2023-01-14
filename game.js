var buttonColours =["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern = [];
var level=0;
var started=false;

$(document).on("keydown",function(){
  if(!started){
    $("#level-title").text("level-"+level);
    nextSequence();
    started=true;       
  }
});

$(".btn").click(function(event){
    //console.log(event);
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    //console.log(userClickedPattern);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
    
    
});   

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }     
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
           $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
    console.log(gamePattern);
    console.log(userClickedPattern);
}




function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("level-"+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 

}
//nextSequence();

function playSound(chosenColor){
    var audio = new Audio("sounds/" + chosenColor + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




