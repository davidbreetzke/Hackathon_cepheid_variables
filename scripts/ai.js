/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke

***
This file supports future AI implementations
*/



//_______RANDOM_MOVER____________
function aiMakeRandomMove(){
    var index = getRandomInt(0, gNumPieces - 1);
    while (getPieceType(gPieces[index]) != whoseTurn) {
        index = getRandomInt(0, gNumPieces - 1);
    }
	var row = boardSizeNxn - gPieces[index].row - 1;
	var col = gPieces[index].column;
	var rowDestination = row;
	var colDestination = col;
	var max = getMaxMoveDistance(gPieces[index]);
	var distanceToMove = getRandomInt(1, max);
	var direction = getRandomInt(1, 4); //up, down, left, right
	var valid = false;
	while(theBoard[rowDestination][colDestination] != 0){
		direction = getRandomInt(1, 4);
		while(!valid){
			if(direction == 1 && row - distanceToMove >= 0 //up
			|| direction == 2 && row + distanceToMove < boardSizeNxn //down
			|| direction == 3 && col - distanceToMove >= 0 //left
			|| direction == 4 && row + distanceToMove < boardSizeNxn) //right
			{valid = true;}
			else
			{
				direction = getRandomInt(1, 4);
			}
		}
		if(direction == 1){
			rowDestination = row - distanceToMove;
		}
		else if(direction == 2){
			rowDestination = row + distanceToMove;
		}		
		else if(direction == 3){
			colDestination = col - distanceToMove;
		}		
		else if(direction == 4){
			colDestination = col + distanceToMove;
		}
	}
	theBoard[row][col] = 0;

	if(whoseTurn == 2){
		gOldPosition2.row = gPieces[index].row;
		gOldPosition2.column = gPieces[index].column;
		theBoard[rowDestination][colDestination] = 2;
		gNewPosition2.row = boardSizeNxn - rowDestination - 1;
		gNewPosition2.column = colDestination;
        //think(getPlyDepth()*getPlyDepth());
	}
	gPieces[index].row = boardSizeNxn - rowDestination - 1;
	gPieces[index].column = colDestination;
}


//_____________RETURNS_AN_ARRAY_OF_MOVE(a,b,x,y)_ALL_VALID_MOVES____________
function getAllMoves(){
    var allMoves = new Array();
    var maxMoveDistance = 0;
    var c = gPieces[0];
    for(var i = 0; i < gNumPieces ; i++){
        c = gPieces[i];
        if(getPieceType(c) == whoseTurn){
            maxMoveDistance = getMaxMoveDistance(c);
            for(var j = 1; j <= maxMoveDistance ; j++){
                if(c.column-j >= 0) {
                    if (theBoard[boardSizeNxn - c.row - 1][c.column - j] == 0) {//left
                        allMoves.push(new Move(c.row, c.column, c.row , c.column - j));
                    }
                }
                if(c.column+j < boardSizeNxn) {
                    if(theBoard[boardSizeNxn - c.row - 1][c.column + j] == 0){//right
                        allMoves.push(new Move(c.row, c.column, c.row, c.column + j));
                    }
                }
                if(c.row - j >= 0){//up
                    if(theBoard[boardSizeNxn - c.row - 1 + j][c.column] == 0) {
                        allMoves.push(new Move(c.row, c.column, c.row - j, c.column));
                    }
                }
                if(c.row + j < boardSizeNxn){ //down
                    if(theBoard[boardSizeNxn - c.row - 1 - j][c.column] == 0) {
                        allMoves.push(new Move(c.row, c.column, c.row + j, c.column));
                    }
                }
            }
        }
    }
    return allMoves;
}


//______________POSSIBILITY_FOR_TEMPLATE METHOD_FOR_FUTURE_AI______________
function aiMove(){
    aiMakeRandomMove();
}





































