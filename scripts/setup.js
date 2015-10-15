/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke

 ***
Setup deals with setting variables that are gained from user form input, as well as validation in those fields.
Once setup has run, it calls initGame() in start.js
*/

//_____________GAME_MODE_FROM_DOM____________
function getGameMode(){
	if(document.getElementById("gameOption2").checked){
		return 2;}
	else {return 1;}
}


//_____________FORM_VALIDATION_________________
function validateSettings(){
	var gSize = document.getElementById("gridSize").value;
	if(gSize < 8 || (gSize)%2 !=0 || gSize > 30){
		alert("Grid Size: Please enter a positive even integer from 8 to 30");
		return false;
	}
	var gCells = document.getElementById("cellsEach").value;
	if(gCells < 1 || gCells > 8 || gCells%1 != 0){
		alert("Cells Each: Please enter an integer from 1 to 8");
		return false;
	}
	else{
		return true;
	}
}


//_______________SETUP_GAME___________________
function setUpGame(){
	if(!validateSettings()) //call form validation
	{	return;}
	cellsEach = document.getElementById("cellsEach").value;
	boardSizeNxn = document.getElementById("gridSize").value;
	kBoardWidth = boardSizeNxn;
	kBoardHeight = boardSizeNxn;
	if(boardSizeNxn > 16){ //scale down the size of cells
		kPieceWidth = 860/boardSizeNxn;
		kPieceHeight = 860/boardSizeNxn;
	}
	kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
	kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

	gameMode = getGameMode();
	if(gameMode == 2){
		gOldPosition2 = new Cell(-1, -1); //Cell
		gNewPosition2 = new Cell(-1, -1); //Cell
	}
	initGame(null);
}