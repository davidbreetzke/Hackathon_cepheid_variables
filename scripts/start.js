/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke

 ***
Start deals with initialising the canvas and game arrays
*/


//______ADD_CANVAS_ELEMENT_AND_LISTENER_TO_DOM_________
function initGame(canvasElement){
	if (!canvasElement){
        canvasElement = document.createElement("canvas");
	canvasElement.id = "theGameCanvas";
	var main_form = document.getElementById("canvasPlacer");
	main_form.appendChild(canvasElement);
	}
	gCanvasElement = canvasElement;
	gCanvasElement.width = kPixelWidth;
	gCanvasElement.height = kPixelHeight;
	gCanvasElement.addEventListener("click", gameOnClick, false);
	gDrawingContext = gCanvasElement.getContext("2d");

	goFullscreen();
	newGame();
}

//_________INITIALISE_GAME_ARRAYS____________________
function newGame() {
	//create the 2D array to hold the board values
	theBoard = new Array(); //0 - empty, 1 - player1, 2 - player2
	regionsPlayer1 = new Array(); 
	regionsPlayer2 = new Array();
	
	for(var i = 0 ; i < boardSizeNxn ; i++){ //create 2D arrays
		theBoard[i] = new Array();
		regionsPlayer1[i] = new Array(); 
		regionsPlayer2[i] = new Array(); 
	}
	for(var i = 0 ; i < boardSizeNxn ; i++){ //Fill the board with empty spaces
        for (var j = 0 ; j < boardSizeNxn ; j++){
            theBoard[i][j] = 0;
			regionsPlayer1[i][j] = 0;
			regionsPlayer2[i][j] = 0;
        }
    }
	//Place cells in arrays
	for(var i = 0; i < cellsEach ; i++) // Place player one's cells
	{	//get random co-ordinates
		var row = getRandomInt(0, boardSizeNxn-1);  //full board range for rows
		var col = getRandomInt(0, boardSizeNxn/2-2); //only on the LEFT HALF of the board for columns

		while(theBoard[row][col] == 1){ //already a cell there. Get new random place
			row = getRandomInt(0, boardSizeNxn-1);
			col = getRandomInt(0, boardSizeNxn/2-2);
		}
		theBoard[row][col] = 1;
		for(var m = -1 ; m < 2 ; m++){//Fill the regions around each cell
			for(var n = -1 ; n < 2 ; n++)
			if(col+m >= 0 && col+m < boardSizeNxn){
				if(row+n >= 0 && row+n < boardSizeNxn){
					regionsPlayer1[row+n][col+m] = 1;
				}
			}
		}
	}
	for(var i = 0; i < cellsEach ; i++) // Place player two's cells
	{	//get random co-ordinates
		var row = getRandomInt(0, boardSizeNxn-1);//full board range for rows
		var col = getRandomInt(boardSizeNxn/2+1, boardSizeNxn-1); //only on the RIGHT HALF of the board for columns

		while(theBoard[row][col] == 2){ //already a cell there. Get new random place
			row = getRandomInt(0, boardSizeNxn-1);
			col = getRandomInt(0, boardSizeNxn/2+1);
		}
		theBoard[row][col] = 2;
		for(var m = -1 ; m < 2 ; m++) {//Fill the regions around each cell
			for(var n = -1 ; n < 2 ; n++)
			if(col+m >= 0 && col+m < boardSizeNxn){
				if(row+n >= 0 && row+n < boardSizeNxn){
					regionsPlayer2[row+n][col+m] = 2;
				}
			}
		}
	}
	for(var i = 0 ; i < boardSizeNxn ; i++){//Store the cells in gPieces Array
        for (var j = 0 ; j < boardSizeNxn ; j++)
        { //Store the cells in gPieces
			if(theBoard[i][j] != 0){
				gPieces.push(new Cell(boardSizeNxn-i-1, j))
			}
        }
    }
    gNumPieces = gPieces.length;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gGameInProgress = true;
	document.getElementById("responseDiv").hidden=false;
	toggleSetup(); // hide the setUp div
	regionsFiller(); //extend the regions as needed
    drawBoard(); //make it pretty!
}