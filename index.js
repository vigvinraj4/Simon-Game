var buttonColours=["red","blue","green","yellow"];
var randomChosenColor;
var gamePattern=[];
var userChosenColour;
var userClickedPattern=[];
var level=0;
var patterns=[];
var started=false;
function nextSequence(){
  userClickedPattern.length=0;
  level++;
  $("#level-title").text("level"+ level);
   var randomNumber=Math.floor(Math.random()*4);
   randomChosenColor=buttonColours[randomNumber];
   gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
  return randomChosenColor;

}


$(".btn").click(function(){
  userChosenColour=this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
   console.log(userClickedPattern.length);
});


function playSound(name){
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
}


function animatePress(selectedColor){
   $("#"+selectedColor).addClass("pressed");
   setTimeout(function(){
      $("#"+selectedColor).removeClass("pressed");
   },100);
}

$(document).keypress(function(){
  if(!started){
  $("#level-title").text("level"+ level);
  nextSequence();
  started=true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("sucess");
    console.log(gamePattern[currentLevel]);
    if(userClickedPattern.length==gamePattern.length){
      console.log(userClickedPattern.length);
      console.log(gamePattern.length);
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
       $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern.length=0;
  started=false;
  $("h1").html("Game Over press any key start the game again");
  $(document).keypress(function(){
    if(!started){
    $("#level-title").text("level"+ level);
    nextSequence();
    started=true;
    }
  });
}
