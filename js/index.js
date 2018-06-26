$(document).ready(function(){
  var userMove="X";
  var compMove="O";
  var firstCompMove=true;
  var game=false;
  var boxId, i, j;
  var firstArr = [0,2,4,6,8];
  var boxes = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var win = [            
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  $("#playX").click(function(){
    userMove="X";
    compMove="O";
    reset();
    $(".tooltipped").tooltip({delay:50});
  });
  $("#playO").click(function(){
    userMove="O";
    compMove="X";
    reset();
    compTurn();
    $(".tooltipped").tooltip({delay:50});
  });

  $(".box").click(function(){
    boxId=$(this).attr("id");
    if(game && boxes[boxId]==" "){
      usersTurn(boxId,userMove);
      compTurn();

    } 

  });
  function reset(){
    boxes.fill(" ");
    $(".box").removeClass("X");
    $(".box").removeClass("O");
    $(".box").text(" ");
    game=true;
  };
  function usersTurn(x, sign){
    boxes[x] = sign;
    $("#" + x).addClass(sign);
    $("#" + x).text(sign);
    checkWin();
    checkTie();

  }
  function checkTie(){
    var tieFlag=true;
    for(i=0;i<8;i++){
      var winStr=boxes[win[i][0]]+boxes[win[i][1]]+boxes[win[i][2]];
      if(winStr.indexOf("X")==-1 || winStr.indexOf("O") ==-1){
        tieFlag=false;
      }

    }
    if(tieFlag){
      Materialize.toast("It's a tie!",4000,'black');
      game=false;
      firstCompMove=true;

    }
  }
  function checkWin(){
    for(i=0;i<8;i++){
      var winStr=boxes[win[i][0]]+boxes[win[i][1]]+boxes[win[i][2]];
      if(winStr==userMove+userMove+userMove){
        if(userMove=="X"){
          Materialize.toast("You won!",4000,'blue' );
        }else{
          Materialize.toast('You won!', 4000, 'blue');

        }
        game=false;
        firstCompMove=true;
      }else if(winStr==compMove + compMove + compMove ){
        if(compMove=='O'){
          Materialize.toast('Computer won!',4000, 'green');
        } else {
          Materialize.toast('Computer won!', 4000, 'green');
        } 
        game=false;
        firstCompMove=true;
      }
    }
  }

  function compTurn(){
    if (game){
      if(firstCompMove){
        if(boxes[4]==" "){
          boxes[4]=compMove;
          $("#4").addClass(compMove);
          $("#4").text(compMove);
          firstCompMove=false;
          return;
        }else{
          do{
            var a=firstArr[Math.floor((Math.random()*4)+1)];
          }
          while (boxes[a]==userMove);
          boxes[a]=compMove;
          $("#" + a).addClass(compMove);
          $("#" + a).text(compMove);
          firstCompMove=false;
          return;
        }
      }
      for(i=0;i<8;i++){
        var winStr=boxes[win[i][0]]+boxes[win[i][1]]+boxes[win[i][2]];
        if(winStr==" "+ compMove + compMove){
          boxes[win[i][0]]=compMove;
          $('#' + win[i][0]).addClass(compMove);
          $('#' + win[i][0]).text(compMove);
          checkWin();
          return;
        }else if(winStr == compMove + " " + compMove) {
          boxes[win[i][1]] = compMove;
          $('#' + win[i][1]).addClass(compMove);
          $('#' + win[i][1]).text(compMove);
          checkWin();
          return;
        }else if(winStr == compMove + compMove + " ") {
          boxes[win[i][2]]=compMove;
          $('#' + win[i][2]).addClass(compMove);
          $('#' + win[i][2]).text(compMove);
          checkWin();
          return;
        }
      }
      for(i=0;i<8;i++){
        var winStr=boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if(winStr==" " + userMove + userMove){
          boxes[win[i][0]]=compMove;
          $('#' + win[i][0]).addClass(compMove);
          $('#' + win[i][0]).text(compMove);
          checkWin();
          checkTie();
          return;
        }else if(winStr== userMove + " " + userMove){
          boxes[win[i][1]]=compMove;
          $('#' + win[i][1]).addClass(compMove);
          $('#' + win[i][1]).text(compMove);
          checkWin();
          checkTie();
          return;
        }else if(winStr== userMove + userMove + " "){
          boxes[win[i][2]]=compMove;
          $('#' + win[i][2]).addClass(compMove);
          $('#' + win[i][2]).text(compMove);
          checkWin();
          checkTie();
          return;
        }
      }
      for(i=0;i<8;i++){
        var winStr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if(winStr.indexOf(userMove) == -1 && winStr.indexOf(compMove) == 1) {
          for(j=0; j<3; j++){
            if(boxes[win[i][j]] == " "){
              boxes[win[i][j]] = compMove;
              $("#" + win[i][j]).addClass(compMove);
              $("#" + win[i][j]).text(compMove);
              checkWin();
              checkTie();
              return;
            }
          }
        }
      }
      for(i=0; i<8; i++) {
        var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if(winstr == "   "){
          boxes[win[i][0]] = compMove;
          $("#" + win[i][0]).addClass(compMove);
          $("#" + win[i][0]).text(compMove);
          checkWin();
          checkTie();
          return;
        }
      }
      for(i=0; i<8; i++){
        if(boxes[i] == " "){
          boxes[i] = compMove;
          $("#" + i).addClass(compMove);
          $("#" + i).text(compMove);
          checkWin();
          checkTie();
          return;
        }
      }
    }
  }

  function chargebattery() {
    var a;
    a = document.getElementById("charging");
    a.innerHTML = "&#xf244;";
    setTimeout(function () {
      a.innerHTML = "&#xf243;";
    }, 1000);
    setTimeout(function () {
      a.innerHTML = "&#xf242;";
    }, 2000);
    setTimeout(function () {
      a.innerHTML = "&#xf241;";
    }, 3000);
    setTimeout(function () {
      a.innerHTML = "&#xf240;";
    }, 4000);
  }
  chargebattery();
  setInterval(chargebattery, 5000);


  function smile() {
    var a;
    a = document.getElementById("face");
    a.innerHTML = "&#xf118;";
    setTimeout(function () {
      a.innerHTML = "&#xf11a;";
    }, 1000);
    setTimeout(function () {
      a.innerHTML = "&#xf119;";
    }, 2000);
    setTimeout(function () {
      a.innerHTML = "&#xf11a;";
    }, 3000);
  }
  smile();
  setInterval(smile, 4000);
});