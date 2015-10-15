/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke

 ***

The gameEngine listens for clicks on the canvas element and then processes the action.
It can be seen as the game loop.
It implements the game rules.
It waits for a human player, or instructs an AI player to make a move.
*/


//_____________FUNCTIONS_USED_AS_OBJECTS_____________
function Cell(row, column) {
    this.row = row;
    this.column = column;
}
function Move(a, b, x, y){
    this.a = a;
    this.b = b;
    this.x = x;
    this.y = y;
}


//______________CLICK_ON_CANVAS_ELEMENT_______________
function getCursorPosition(e) { // returns Cell with .row and .column attributes
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Cell(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
    return cell;
}
function gameOnClick(e) { //click event listener on canvas
    if(gameMode == 2 && whoseTurn == 2){ //Player vs RandomMover
        aiMove();
        regionsFiller();
        changeCellsTakenBy(whoseTurn);
        regionsFiller();
        saySomething();
        changeTurn();
        drawBoard();
        return;
    }
    var cell = getCursorPosition(e);
    for (var i = 0; i < gNumPieces; i++) {
		if ((gPieces[i].row == cell.row) && 
			(gPieces[i].column == cell.column)) {
			clickOnPiece(i);
			return;
		}
    }
    clickOnEmptyCell(cell);
}

function clickOnPiece(pieceIndex) {
    if (gSelectedPieceIndex == pieceIndex || getPieceType(gPieces[pieceIndex]) != whoseTurn)
		{ return; }
    gSelectedPieceIndex = pieceIndex;
    gSelectedPieceHasMoved = false;
    drawBoard();
}

function clickOnEmptyCell(cell) {
    if (gSelectedPieceIndex == -1) //no piece is selected
		{ return; }

	var c = gPieces[gSelectedPieceIndex]; //store "From" cell
	var turn = theBoard[boardSizeNxn-c.row-1][c.column]; //whose turn it is, 1 or 2
	var maxDistance = getMaxMoveDistance(c);
	var rowDiff = Math.abs(c.row - cell.row);
	var colDiff = Math.abs(c.column - cell.column);

    if( (c.row == cell.row && colDiff <= maxDistance) //is the move valid
	|| (c.column == cell.column	&& rowDiff <= maxDistance)){
		theBoard[boardSizeNxn-c.row-1][c.column] = 0;
		gPieces[gSelectedPieceIndex].row = cell.row;
		gPieces[gSelectedPieceIndex].column = cell.column;
		c = gPieces[gSelectedPieceIndex];
		//copy the type into the new position
		theBoard[boardSizeNxn-c.row-1][c.column] = turn;
		regionsFiller();
		changeCellsTakenBy(turn);
		regionsFiller();
		gSelectedPieceIndex = -1;
		gSelectedPieceHasMoved = false;
		drawBoard();
        saySomething();
		changeTurn();
		return;
    }
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
	regionsFiller();
    drawBoard();
}


//______________MAX_MOVES_A_CELL_CAN_MAKE______________
function getMaxMoveDistance(cell){ //returns int
	var player = getPieceType(cell);
	var cellRow = boardSizeNxn - cell.row - 1;
	var cellCol = cell.column;
	var distance = 0;
	var currentRow;
	var currentCol;
	
	//find the top row of the region
	if (player == 1){
		while (regionsPlayer1[cellRow][cellCol] == 1){
			cellRow--;
			if(cellRow < 0) {break;}
		}
		cellRow++;
	}
	else if (player == 2){
		while (regionsPlayer2[cellRow][cellCol] == 2){
			cellRow--;
			if(cellRow < 0) {break;}
		}
		cellRow++;
	}
	//find the left-most column
	if (player == 1){
		while (regionsPlayer1[cellRow][cellCol] == 1){
			cellCol--;
			if(cellCol < 0) {break;}
		}
		cellCol++;
	}
	else if (player == 2){
		while (regionsPlayer2[cellRow][cellCol] == 2){
			cellCol--;
			if(cellCol < 0) {break;}
		}
		cellCol++;
	}
	//iterate over region
	if( player == 1){
		currentRow = cellRow;
		currentCol = cellCol;
		while(regionsPlayer1[currentRow][currentCol] == 1)
		{
			while(regionsPlayer1[currentRow][currentCol] == 1)
			{	//if cell, increment distance
				if(theBoard[currentRow][currentCol] == 1)
				{distance++;}
				currentCol++;
				if(currentCol == boardSizeNxn)
				{break;}
			}
			currentRow++;
			currentCol = cellCol;
			if(currentRow == boardSizeNxn)
			{break;}
		}
	}
	else if( player == 2){
		currentRow = cellRow;
		currentCol = cellCol;
		while(regionsPlayer2[currentRow][currentCol] == 2)
		{
			while(regionsPlayer2[currentRow][currentCol] == 2)
			{	//if cell, increment distance
				if(theBoard[currentRow][currentCol] == 2)
				{distance++;}
				currentCol++;
				if(currentCol == boardSizeNxn)
				{break;}
			}
			currentRow++;
			currentCol = cellCol;
			if(currentRow == boardSizeNxn)
			{break;}
		}
	}
	
	return distance;
}


//_____________TAKE_CELLS______________ 
//This needs to be optimised where possible as complexity is high!!
function changeCellsTakenBy(player){
//player1
	if(player == 1){
	//for the whole board
		for(var i = 0 ; i < boardSizeNxn ; i++){
		regionsFiller();
			for (var j = 0 ; j < boardSizeNxn ; j++){
			//if cell is 2
			if(theBoard[i][j] == 2){
				//compare surrounding cell to regionsPlayer1
				if(i-1 >= 0){
				if(regionsPlayer1[i-1][j] == 1)
					{theBoard[i][j] = 1;
					i=0;j=0;
					break;}
				}
				if(i+1 < boardSizeNxn){
				if(regionsPlayer1[i+1][j] == 1)
					{theBoard[i][j] = 1;
					i=0;j=0;
					break;}
				}
				if(j-1 >= 0){
				if(regionsPlayer1[i][j-1] == 1)
					{theBoard[i][j] = 1;
					i=0;j=0;
					break;}
				}
				if(j+1 < boardSizeNxn){
				if(regionsPlayer1[i][j+1] == 1)
					{theBoard[i][j] = 1;
					i=0;j=0;
					break;}
				}
			}
			}
		}	
	}
			
	else if(player == 2){
	//for the whole board
		for(var i = 0 ; i < boardSizeNxn ; i++){
		regionsFiller();
			for (var j = 0 ; j < boardSizeNxn ; j++){
			//if cell is 1
			if(theBoard[i][j] == 1){
				//compare surrounding cell to regionsPlayer2
				if(i-1 >= 0){
				if(regionsPlayer2[i-1][j] == 2)
					{theBoard[i][j] = 2;
					i=0;j=0;
					break;}
				}
				if(i+1 < boardSizeNxn){
				if(regionsPlayer2[i+1][j] == 2)
					{theBoard[i][j] = 2;
					i=0;j=0;
					break;}
				}
				if(j-1 >= 0){
				if(regionsPlayer2[i][j-1] == 2)
					{theBoard[i][j] = 2;
					i=0;j=0;
					break;}
				}
				if(j+1 < boardSizeNxn){
				if(regionsPlayer2[i][j+1] == 2)
					{theBoard[i][j] = 2;
					i=0;j=0;
					break;}
				}
			}
			}
		}	
	}

}

//________UPDATES_REGION_ARRAYS_FOR_BOTH_PLAYERS________
function regionsFiller(){ 
	for(var i = 0 ; i < boardSizeNxn ; i++){ //All regions empty
        for (var j = 0 ; j < boardSizeNxn ; j++){
			regionsPlayer1[i][j] = 0;
			regionsPlayer2[i][j] = 0;
			}
		}
		//Simply surround each cell
		for(var i = 0 ; i < boardSizeNxn ; i++){
			for (var j = 0 ; j < boardSizeNxn ; j++){
				var regType = 0;
				if(theBoard[i][j] != 0){
					regType = theBoard[i][j];
					for(var m = -1 ; m < 2 ; m++)
					{
					for(var n = -1 ; n < 2 ; n++)
						if(i+m >= 0 && i+m < boardSizeNxn){
							if(j+n >= 0 && j+n < boardSizeNxn){
								if( regType == 1)
								{regionsPlayer1[i+m][j+n] = regType;}
								else if( regType == 2)
								{regionsPlayer2[i+m][j+n] = regType;}
							}
						}
					}
				}
			}
		}
	//Extend player one's regions
	for(var i = 0 ; i < boardSizeNxn ; i++){
		for (var j = 0 ; j < boardSizeNxn ; j++){
			for (var k = 0 ; k < boardSizeNxn ; k++){
			if(regionsPlayer1[j][k] == 0){
				if(j!=0 && k!=0){ //left and below
					if(regionsPlayer1[j-1][k] == regionsPlayer1[j][k-1] 
						&& regionsPlayer1[j][k-1] != 0 && regionsPlayer1[j-1][k-1] != 0)
					{regionsPlayer1[j][k] = regionsPlayer1[j][k-1]; break;}
				}
				if(j!=0 && k!=boardSizeNxn-1){ //left and above
					if(regionsPlayer1[j-1][k] == regionsPlayer1[j][k+1] 
						&& regionsPlayer1[j][k+1] != 0 && regionsPlayer1[j-1][k+1] != 0)
					{regionsPlayer1[j][k] = regionsPlayer1[j][k+1]; break;}
				}
				if(j!=boardSizeNxn-1 && k!=0){ //right and below
					if(regionsPlayer1[j+1][k] == regionsPlayer1[j][k-1] 
						&& regionsPlayer1[j][k-1] != 0 && regionsPlayer1[j+1][k-1] != 0)
					{regionsPlayer1[j][k] = regionsPlayer1[j][k-1]; break;}
				}
				if(j!=boardSizeNxn-1 && k!=boardSizeNxn-1){ //right and above
					if(regionsPlayer1[j+1][k] == regionsPlayer1[j][k+1] 
						&& regionsPlayer1[j][k+1] != 0 && regionsPlayer1[j+1][k+1] != 0)
					{regionsPlayer1[j][k] = regionsPlayer1[j][k+1]; break;}
					}
				}	
			}	
		}	
	}
	//Extend player two's regions
	for(var i = 0 ; i < boardSizeNxn ; i++){
		for (var j = 0 ; j < boardSizeNxn ; j++){
			for (var k = 0 ; k < boardSizeNxn ; k++){
			if(regionsPlayer2[j][k] == 0){
				if(j!=0 && k!=0){ //left and below
					if(regionsPlayer2[j-1][k] == regionsPlayer2[j][k-1] 
						&& regionsPlayer2[j][k-1] != 0 && regionsPlayer2[j-1][k-1] != 0)
					{regionsPlayer2[j][k] = regionsPlayer2[j][k-1]; break;}
				}
				if(j!=0 && k!=boardSizeNxn-1){ //left and above
					if(regionsPlayer2[j-1][k] == regionsPlayer2[j][k+1] 
						&& regionsPlayer2[j][k+1] != 0 && regionsPlayer2[j-1][k+1] != 0)
					{regionsPlayer2[j][k] = regionsPlayer2[j][k+1]; break;}
				}
				if(j!=boardSizeNxn-1 && k!=0){ //right and below
					if(regionsPlayer2[j+1][k] == regionsPlayer2[j][k-1] 
						&& regionsPlayer2[j][k-1] != 0 && regionsPlayer2[j+1][k-1] != 0)
					{regionsPlayer2[j][k] = regionsPlayer2[j][k-1]; break;}
				}
				if(j!=boardSizeNxn-1 && k!=boardSizeNxn-1){ //right and above
					if(regionsPlayer2[j+1][k] == regionsPlayer2[j][k+1] 
						&& regionsPlayer2[j][k+1] != 0 && regionsPlayer2[j+1][k+1] != 0)
					{regionsPlayer2[j][k] = regionsPlayer2[j][k+1]; break;}
					}
				}	
			}	
		}	
	}
	
}


//________________GAME_FUNCTIONS_____________________
function changeTurn(){
	if(whoseTurn == 1)
		{whoseTurn = 2;}
	else {whoseTurn = 1;}
}

function resetVariables(){
	boardSizeNxn = 8;
	gRegions = new Array();
	gPieces = new Array();
	theBoard = new Array();
	regionsPlayer1 = new Array();
	regionsPlayer2 = new Array();
	whoseTurn = 2;
	gSelectedPieceIndex = -1;
    gGameInProgress = false;
    document.getElementById("responseDiv").hidden = true;
}


//____________HELPER_FUNCTIONS____________________
function getRandomInt(min, max) { //inclusive of min and max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPieceType(p){ //return int, 0, 1 or 2 For empty cell or the player occupying it
	return theBoard[boardSizeNxn-p.row-1][p.column];
}

//used for switching turns
if (typeof resumeGame != "function") {
    saveGameState = function() {
	return false;
    };
    resumeGame = function() {
	return false;
    }
}

function isTheGameOver() {
 var t = getPieceType(gPieces[0]);
 for(var i = 1; i < gNumPieces; i++){
	if(getPieceType(gPieces[i]) != t)
	{return false;}
 }
    return true;
}