$(function(){
  intializeVariables();
  intializeListeners();
  typeWriter('.type1');
  typeWriter('.type2');
  typeWriter('.type3');








});

function typeWriter(elem) {
  var text = $(elem).text();
  var length = text.length;
  var timeOut;
  var character = 0;
  console.log({text,length,character});
    timeOut = setInterval(function() {
        character++;
        console.log(character);
        var type = text.substring(0, character);
        $(elem).text(type);

        if (character == length) {
            clearInterval(timeOut);
        }

    }, 200);
}






//Initiate listeners
function intializeListeners(){
  $(".hexa-parent").click(toggleHexagon);
  $(document).mouseup(function(e)
  {
    var container = $(".hexa-parent");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        $(".hexa-detail").addClass("hide");
        $(".hexa-parent").removeClass("hide");
    }
  });
  $("#showcase").mousemove(mouseMoveListener);
  $("#read-more").click(function(){
    $("body").animate({
      scrollTop: $("#read-more-section").offset().top
    }, 400);
  });
}



//Hexagon toggling in SMART SECTIOn

function toggleHexagon(){
  $(".hexa-parent").not(this).toggleClass("hide");
  $(this).next(".hexa-detail").toggleClass("hide");
}



//FOR FINDING ANGLE OF CURSOR
function findAngle(x,y,xCenter,yCenter){
  x = (x - xCenter);
  y = -1* (y - yCenter);
  if(x<0 && y<0){
    return 180;
  }
  else if(x>0 && y>0){
    return 0;
  }
  else if(y>0){
    return 270;
  }
  else{
    return 90;
  }

}


//Mouse move Listener to rotate compass
function mouseMoveListener(event){
  var angle = findAngle(event.clientX,event.clientY,xCenter,yCenter);
  if(angleDif = angleSum%360- angle){
    if(angleDif%270){
      angleSum-= angleDif;
    }
    else {
      angleSum+= angleDif/3;
    }
    console.log(angleSum);
    $("#showcase img").css("transform","translate(-50%,-50%) rotateZ("+(angleSum)+"deg)");
  }
}

//Intializing Variables
function intializeVariables(){
  //hexaClick = 1;
  xCenter = $("#showcase").width()/2.0;
  yCenter = $("#showcase").height()/2.0;
  currentAngle = 0;
  angleSum = 360;
}
