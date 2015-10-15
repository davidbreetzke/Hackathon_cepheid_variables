/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke


***
renderView does all the drawing on the canvas element

This includes:
 lines to make up the grid,
 cells, cell regions,
 and ways of indicating the AI's move
*/


//__________DRAW_A_CELL_ON_CANVAS_AS_CIRCLE___________
function drawPiece(p, pieceType, selected) {
	var radius = (kPieceWidth/2) - (kPieceWidth/10);
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + (kPieceWidth/2);
    var y = (row * kPieceHeight) + (kPieceHeight/2);
	gDrawingContext.beginPath();

    switch(pieceType){ //colours and images for different pieceTypes
        case 1:
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.strokeStyle = "#C68691";
            gDrawingContext.stroke();
            gDrawingContext.fillStyle = "#B20000"; //red
            gDrawingContext.fill();
            pic01 = new Image();
            pic01.src = "media/alien01.png";
            pic01.onload = function(){
                gDrawingContext.drawImage(pic01,x - kPieceWidth/2,y - kPieceWidth/2 + kPieceHeight/30)
            }
            break;
        case 2:
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.strokeStyle = "#9186C6";
            gDrawingContext.stroke();
            gDrawingContext.fillStyle = "#2200CC"; //blue
            gDrawingContext.fill();
            pic02 = new Image();
            pic02.src = "media/alien02.png";
            pic02.onload = function(){
                gDrawingContext.beginPath();
                gDrawingContext.drawImage(pic02,x - kPieceWidth/2 + kPieceHeight/30,y - kPieceWidth/2)
                gDrawingContext.closePath();
            }
            break;
        case 7:
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.fillStyle = "#C68691"; //light maroon
            gDrawingContext.fill();
            break;
        case 8:
            radius -= (kPieceWidth/10);
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.fillStyle = "#9186C6"; // light blue
            gDrawingContext.fill();
            break;
        case 50:
            radius -= (kPieceWidth/5);
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.fillStyle = "#33CC33"; // green
            gDrawingContext.fill();
            break;
        case 60:
            radius -= (kPieceWidth/5);
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.fillStyle = "#33CC33"; // green
            gDrawingContext.fill();
            break;
        case 98:
            radius -= (kPieceWidth/10);
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.fillStyle = "#ADD8E6"; // bright blue
            gDrawingContext.fill();
            break;
        case 99:
            gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
            gDrawingContext.closePath();
            gDrawingContext.fillStyle = "#AD4379"; // maroon pink
            gDrawingContext.fill();
            break;
        default:
            gDrawingContext.fillStyle = "#04FF00"; //bright green, for debugging
            gDrawingContext.fill();
    }
	if(selected){
		gDrawingContext.beginPath();
		gDrawingContext.arc(x, y, radius/2, 0, Math.PI*2, false);
		gDrawingContext.closePath();
		gDrawingContext.strokeStyle = "#000";
		gDrawingContext.stroke();
		gDrawingContext.fillStyle = "#FFF";
		gDrawingContext.fill();
	}
}


//___________DRAW_AND_COLOUR_ALL_REGIONS__________
function colourRegions(){
		//colour all player one Auras
	for(var i = 0; i < boardSizeNxn; i++){
		for(var j = 0; j < boardSizeNxn; j++){
			if(regionsPlayer1[i][j] != 0)
			{
				drawPiece(new Cell(boardSizeNxn-i-1, j), 99,false);
			}
		}
	}	//colour all player two Auras
		//can be "on top" of player one Auras
	for(var i = 0; i < boardSizeNxn; i++){
		for(var j = 0; j < boardSizeNxn; j++){
			if(regionsPlayer2[i][j] != 0)
			{
				drawPiece(new Cell(boardSizeNxn-i-1, j), 98,false);
			}
		}
	}
}


//____________DRAW_THE_BOARD_ON_CANVAS________________
function drawBoard() {
    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
    gDrawingContext.beginPath();
    
    // vertical lines
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
	gDrawingContext.moveTo(0.5 + x, 0);
	gDrawingContext.lineTo(0.5 + x, kPixelHeight);
    }
    
    // horizontal lines
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
	gDrawingContext.moveTo(0, 0.5 + y);
	gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
    }
    
    gDrawingContext.strokeStyle = "#ccc";
    gDrawingContext.stroke();
	colourRegions();
	//colour in the cells
    for (var i = 0; i < gNumPieces; i++) {
		drawPiece(gPieces[i], getPieceType(gPieces[i]), i == gSelectedPieceIndex);
	}
	if(gameMode == 2 && gOldPosition2.row >= 0){
		drawPiece(gOldPosition2, 50, false);
		drawPiece(gNewPosition2, 50, false);
	}
	if(gameMode == 3){
		if(gOldPosition1.row >= 0){
			drawPiece(gOldPosition1, 60, false);
			drawPiece(gNewPosition1, 60, false);
		}
		if(gOldPosition2.row >= 0){
			drawPiece(gOldPosition2, 50, false);
			drawPiece(gNewPosition2, 50, false);
		}
	}
	if (gGameInProgress && isTheGameOver()) {
		endGame();
		}
    saveGameState();
}