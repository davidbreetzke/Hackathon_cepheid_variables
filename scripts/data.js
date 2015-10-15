/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke

 ***
The data.js holds all the Global Variables, and initialises most to a default value
*/

//_____________GLOBAL_VARIABLES_________________

//Arrays
var theBoard;  //2D Array
var regionsPlayer1; //2D Array
var regionsPlayer2; //2D Array
var gRegions = new Array();
var gPieces = new Array();
var gOldPosition1; //Cell
var gOldPosition2; //Cell
var gNewPosition1; //Cell
var gNewPosition2; //Cell
//Board Settings variables
var kBoardWidth = 8;
var kBoardHeight= 8;
var kPieceWidth = 50;
var kPieceHeight= 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);
var boardSizeNxn = 8;
//canvas element variables
var gCanvasElement;
var gDrawingContext;
//Game Engine Variables
var gNumPieces;
var gSelectedPieceIndex = -1;
var gSelectedPieceHasMoved;
var gGameInProgress;
var cellsEach = 3;
var whoseTurn = 1;
var gameMode = 1;//	1 - Player Vs Player
				//	2 - Player Vs RandomMover