var MyPaint={};
var color;
var sessionTools=[document.body, document.body];
var currentTool;
var currentToolName;
var flag=false;
var width=window.innerWidth;
var height=window.innerHeight;

MyPaint.start=function(){
    MyPaint.createBasis();
    MyPaint.createButtonField();
    MyPaint.bindActionButtons();
}

MyPaint.createBasis=function(){
  //create container for all elements
  window.addEventListener("resize", MyPaint.relocate);

  var containerAll=document.createElement("DIV");
  document.body.appendChild(containerAll);
  containerAll.className="doc-container";

  var toolTitle=document.createElement("DIV");
  var textTool=document.createTextNode("Tool Box");
  toolTitle.appendChild(textTool);
  containerAll.appendChild(toolTitle);
  toolTitle.style.width="700px";
  toolTitle.id="tool-box-name";
  toolTitle.className="tool-name";


  //Creating Toolbar
  var toolBox=document.createElement("DIV");
  containerAll.appendChild(toolBox);
  toolBox.style.width="500px";
  toolBox.style.height="100px";
  toolBox.style.border="0.5px solid black";
  toolBox.style.display="flex";
  toolBox.className="tool-wrapper";
  toolBox.id="tools-container";

      //create color picker field
      var colorField=document.createElement("DIV");
      toolBox.appendChild(colorField);
      colorField.style.width="20%";
      colorField.style.height="100%";
      colorField.id="color-field";

         //create divs inside colorsField
         for (var i=0; i<2; i++){
           var colorFieldDiv=document.createElement("DIV");
           colorField.appendChild(colorFieldDiv);
           colorFieldDiv.id="color-field"+i;
         }
            //create text for colorField
            var colorFieldText=document.createTextNode("Pick a color");
            document.getElementById("color-field0").appendChild(colorFieldText);
            //create color pallet
            var colorPallet=document.createElement("INPUT");
            colorPallet.id="color-picker";
            colorPallet.setAttribute("type", "color");
            document.getElementById("color-field1").appendChild(colorPallet);

      //create field for eraser
      var eraserField=document.createElement("DIV");
      toolBox.appendChild(eraserField);
      eraserField.style.width="30%";
      eraserField.style.height="100%";
      eraserField.id="eraser-field";
      eraserField.style.position="relative";

            for (var i=0; i<3; i++){
              var eraser=document.createElement("IMG");
              eraser.setAttribute("src", "./images/eraser"+i+".jpg");
              eraser.setAttribute("alt", "eraser");
              eraserField.appendChild(eraser);
              eraser.style.display="inline-block";
              eraser.id="eraser-tool"+i;
              eraser.className="erasers";
              eraser.style.position="absolute";
              eraser.addEventListener("click", MyPaint.selectTool);
            }

      //create field for brushes
      var brushesField=document.createElement("DIV");
      toolBox.appendChild(brushesField);
      brushesField.style.width="49%";
      brushesField.style.height="100%";
      brushesField.id="brushes-field";
      brushesField.style.position="relative";

            // brushes of different sizes

              var brushSquare=document.createElement("DIV");
              brushSquare.style.width="10px";
              brushSquare.style.height="10px";
              brushesField.appendChild(brushSquare);
              brushSquare.style.backgroundColor=document.getElementById("color-picker").value;
              brushSquare.style.display="inline-block";
              brushSquare.id="paint-brush1";
              brushSquare.className="brushes";
              brushSquare.style.position="absolute";
              brushSquare.addEventListener("click", MyPaint.selectTool);

              var brushRound=document.createElement("DIV");
              brushRound.style.width="20px";
              brushRound.style.height="20px";
              brushesField.appendChild(brushRound);
              brushRound.style.backgroundColor=document.getElementById("color-picker").value;
              brushRound.style.border="1px solid "+document.getElementById("color-picker").value;
              brushRound.style.borderRadius="50%";
              brushRound.style.display="inline-block";
              brushRound.id="paint-brush2";
              brushRound.className="brushes";
              brushRound.style.position="absolute";
              brushRound.addEventListener("click", MyPaint.selectTool);


              // Creating canvas field
              var canvasField=document.createElement("DIV");
              containerAll.appendChild(canvasField); //changed
              canvasField.style.width="500px";
              canvasField.style.height="500px";
              canvasField.style.border="0.5px solid black";
              canvasField.className="canvas-wrapper";
              canvasField.fontSize="0px";
              canvasField.style.display="flex";
              canvasField.id="container";
              canvasField.position="relative";

              canvasField.addEventListener("mousedown", MyPaint.engageMouseAction);
              canvasField.addEventListener("mouseup", MyPaint.stopMouseAction);

}

MyPaint.engageMouseAction=function(e){
   document.getElementById("container").addEventListener("mousemove", MyPaint.change);
    console.log("mouse is down");
}

MyPaint.change=function(e){

  if (flag){
     if (currentTool.className=="brushes"){
         color=document.getElementById("color-picker").value;

         if (currentToolName=="paint-brush1"){
           var canvas=document.getElementById("container");
           var brushSquare=document.createElement("DIV");
           brushSquare.style.width="10px";
           brushSquare.style.height="10px";
           canvas.appendChild(brushSquare);
           brushSquare.style.backgroundColor=color;
           brushSquare.style.top = e.clientY + "px";
           brushSquare.style.left = e.clientX + "px";
           brushSquare.style.display="inline-block";
           brushSquare.style.position="absolute";
           brushSquare.className="drawing";

         } else if (currentToolName=="paint-brush2"){
           var canvas=document.getElementById("container");
           var brushRound=document.createElement("DIV");
           brushRound.style.width="20px";
           brushRound.style.height="20px";
           canvas.appendChild(brushRound);
           brushRound.style.backgroundColor=color;
           brushRound.style.border="1px solid "+color
           brushRound.style.top = e.pageY + "px";
           brushRound.style.left = e.pageX + "px";
           brushRound.style.borderRadius="50%";
           brushRound.style.display="inline-block";
           brushRound.style.position="absolute";
           brushRound.className="drawing";
         }
     }
    else if (currentTool.className=="erasers"){
         color="inherit";

         if (currentToolName=="eraser-tool0"){
             var canvas=document.getElementById("container");
             var brushSquare=document.createElement("DIV");
             brushSquare.style.width="5px";
             brushSquare.style.height="5px";
             canvas.appendChild(brushSquare);
             brushSquare.style.backgroundColor=color;
             brushSquare.style.top = e.pageY + "px";
             brushSquare.style.left = e.pageX + "px";
             brushSquare.style.display="inline-block";
             brushSquare.style.position="absolute";

         } else if (currentToolName=="eraser-tool1"){
             var canvas=document.getElementById("container");
             var brushSquare=document.createElement("DIV");
             brushSquare.style.width="10px";
             brushSquare.style.height="10px";
             canvas.appendChild(brushSquare);
             brushSquare.style.backgroundColor=color;
             brushSquare.style.top = e.pageY + "px";
             brushSquare.style.left = e.pageX + "px";
             brushSquare.style.display="inline-block";
             brushSquare.style.position="absolute";

         } else if (currentToolName=="eraser-tool2"){
             var canvas=document.getElementById("container");
             var brushSquare=document.createElement("DIV");
             brushSquare.style.width="15px";
             brushSquare.style.height="15px";
             canvas.appendChild(brushSquare);
             brushSquare.style.backgroundColor=color;
             brushSquare.style.top = e.pageY + "px";
             brushSquare.style.left = e.pageX + "px";
             brushSquare.style.display="inline-block";
             brushSquare.style.position="absolute";
         }
     }
   }
   else{
     alert( "Please pick a tool" );
   }
}

MyPaint.stopMouseAction=function(e){
    document.getElementById("container").removeEventListener("mousemove", MyPaint.change);
}

MyPaint.selectTool=function(e){
    currentTool=event.target;
    currentToolName=event.target.id;
    event.target.style.opacity="0.8";
    event.target.style.boxShadow="2px 2px 3px grey";
    sessionTools.push(event.target);
    sessionTools[sessionTools.length-2].style.opacity="1";
    sessionTools[sessionTools.length-2].style.boxShadow="none";
    MyPaint.enable();

}

MyPaint.enable=function(){
    flag=true;
}

MyPaint.bindActionButtons=function(){
    MyPaint.createClearButton();

}

MyPaint.createButtonField=function(){
    var containerAll=document.getElementsByClassName("doc-container")[0];
    var buttonContainer=document.createElement("DIV");
    containerAll.appendChild(buttonContainer);
    buttonContainer.id="button-wrapper";
}

MyPaint.createClearButton=function(){
    var buttonContainer=document.getElementById("button-wrapper");
    var clearBtn=document.createElement("BUTTON");
    var buttonText=document.createTextNode("Reset");
    clearBtn.appendChild(buttonText);
    buttonContainer.appendChild(clearBtn);
    clearBtn.className="buttons";
    clearBtn.id="reset-button";
    clearBtn.addEventListener("click", MyPaint.clearCanvas);
}

MyPaint.clearCanvas=function(){

    var canvas=document.getElementById("container");
    var pic=document.getElementsByClassName("drawing");
    for (var i=pic.length-1; i>=0; i--){
        canvas.removeChild(pic[i]);
    }
}

MyPaint.relocate=function(){
    var picture=document.getElementsByClassName("drawing");
    newWidth=window.innerWidth;
    newHeight=window.innerHeight;

    for (var i=0; i<picture.length; i++){
      picture[i].style.left=(parseInt(picture[i].style.left)-Math.floor((width-newWidth)/2))+"px"; // this is because the left point of the canvas also moves by the half of the change in the screen size
      picture[i].style.top=(parseInt(picture[i].style.top)-Math.floor((height-newHeight)/2))+"px";
    }

    width=newWidth;
    height=newHeight;
}

MyPaint.start();
