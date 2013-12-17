$(document).ready(function() {
  var starship = 8;
  var success = 0;
  var score = 0;
  var game=true;
  var k=0;
  var level = 1;
  var enemy = [];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.translate(0,500);
  ctx.rotate(Math.PI*3/2);

  ctx.lineWidth = 3;
  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.strokeStyle = "rgb(255, 0, 0)";

  function initEnemy(){
    enemy = [        //ініціалізація матриці
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,true,true,false,false,false,false,false,false,true,true,false,false,false],
    [false,false,true,true,true,true,false,false,false,false,true,true,true,true,false,false],
    [false,true,true,true,true,true,true,false,false,true,true,true,true,true,true,false],
    [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    ];
    }

  function starshipShoot(n){
    for(i=0;i<11;i++){
      if (enemy[i][starship]) {
        (enemy[i][starship])=false;
        success++;
        score+=1000;
        show();
        $( "#score" )
        .html( "Score: " + score );
        if(success==40){
          alert("Good job!\nNext Level");
          initEnemy();
          k=0;
          success=0;
          level++;
          show();
          $( "#level" )
          .html( "Level: " + level );
        }
        return;
      }
    }
  }

  function starshipLeft(){
    if(starship>0){
      starship--;
      show();
    }
  }

  function starshipRight(){
    if(starship<15){
      starship++;
      show();
    }
  }

  function show(){
    ctx.lineWidth = 3;
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.clearRect(-500,-500,1600,1600);
    for(i=0;i<11;i++){
      for(j=0;j<16;j++){
        if (enemy[i][j]) {
          ctx.beginPath();
          ctx.moveTo(i*50+50, j*50+5);
          ctx.lineTo(i*50+20, j*50+5);
          ctx.lineTo(i*50+20, j*50+20);
          ctx.lineTo(i*50+5, j*50+20);
          ctx.lineTo(i*50+5, j*50+30);
          ctx.lineTo(i*50+20, j*50+30);
          ctx.lineTo(i*50+20, j*50+45);
          ctx.lineTo(i*50+50, j*50+45);
          ctx.lineTo(i*50+50, j*50+30);
          ctx.lineTo(i*50+35, j*50+30);
          ctx.lineTo(i*50+35, j*50+20);
          ctx.lineTo(i*50+50, j*50+20);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
    ctx.beginPath();
    ctx.moveTo(0, starship*50+5);
    ctx.lineTo(30, starship*50+5);
    ctx.lineTo(30, starship*50+20);
    ctx.lineTo(45, starship*50+20);
    ctx.lineTo(45, starship*50+30);
    ctx.lineTo(30, starship*50+30);
    ctx.lineTo(30, starship*50+45);
    ctx.lineTo(0, starship*50+45);
    ctx.lineTo(0, starship*50+30);
    ctx.lineTo(15, starship*50+30);
    ctx.lineTo(15, starship*50+20);
    ctx.lineTo(0, starship*50+20);
    ctx.closePath();
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fill();
  }

  function step(){
    for(i=0;i<10;i++){
      enemy[i]=enemy[i+1]
    }
    for(j=0;j<16;j++){
      enemy[10][j]=false;
    }
    k++;
    for(i=0;i<16;i++){
      if(enemy[0][i]){
        game=false;
        break;
      }
    }
    show();
    if(game){
      setTimeout(step, 3500-level*300);
    }
    else{
      alert("Game over!");
      location.reload();
    }
  }

  initEnemy();
  show();
  setTimeout(step, 3500);

  $(window).keydown(function (e){
    if (e.which==32) starshipShoot();
    if (e.which==37) starshipLeft();
    if (e.which==39) starshipRight();
  });

});
