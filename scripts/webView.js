/* 
 Derivco SliceOfSource Hackathon UP
 August 2015

 Project Name: The Cepheid Variables
 Author: David Breetzke

***
webView manages html elements including setting hidden and required,
putting player responses in the reponseDiv for our entertainment,
removing the canvas element, and managing fullScreen requests
*/


//_____________REMOVE_CANVAS_ELEMENT_FROM_DOM__________
function endGame() {

    var message = "";
    if(getPieceType(gPieces[0]) == 1){
        message += "Player 1 ";
    }
    else if(getPieceType(gPieces[0]) == 2){
        message += "Player 2 ";
    }
    message += "Is the winner!";
    alert(message);
	var main_form = document.getElementById("canvasPlacer");
	var theCanvas = document.getElementById("theGameCanvas");
	main_form.removeChild(theCanvas);
	resetVariables();
	toggleSetup();
}


//_____________TOGGLE_SETUP_ELEMENTS_IN_DOM_______________
function toggleSetup()
{
	document.getElementById("mainForm").hidden = !document.getElementById("mainForm").hidden;
}

//____________TOGGLE_HELP_AND_ABOUT_DIV__________________
function toggleHelp(){
    if (document.getElementById("helpDiv").hidden){
        document.getElementById("helpDiv").hidden = false;
        document.getElementById("mainForm").hidden = true;
    }
    else{
        document.getElementById("helpDiv").hidden = true;
        document.getElementById("mainForm").hidden = false;
    }
}

//__________PUT_A_TEXT_RESPONSE_IN_REPONSEDIV_____________
function saySomething(){
    var response = "";
    var randomChoice = getRandomInt(0,6);
    document.getElementById("responseDiv").hidden = !gGameInProgress;

    if(whoseTurn == 1){
        response = "Player 1: <br/>";
        switch(randomChoice){
            case 0:
                response += "Oh wow... Let me Google that for you.";
                break;
            case 1:
                response += "No words.";
                break;
            case 2:
                response += "You remind me of Windows Vista.";
                break;
            case 3:
                response += "Don't be surprised if someone keys your spaceship!";
                break;
            case 4:
                response += "You can run, but this is fullscreen!";
                break;
            case 5:
                response += "I don't participate, I WIN!";
                break;
            case 6:
                response += "Hey! Look behind you! haha.";
                break;
            default:
                response += "We shall see.";
        }
    }
    else if(whoseTurn == 2){
        response = "Player 2: <br/>";
        switch(randomChoice){
            case 0:
                response += "Your Patronus is a dung beetle.";
                break;
            case 1:
                response += "Oh SNAP.";
                break;
            case 2:
                response += "BSOD me now.";
                break;
            case 3:
                response += "I'm better. That is all.";
                break;
            case 4:
                response += "Insert mind-blowing insult here.";
                break;
            case 5:
                response += "...";
                break;
            case 6:
                response += "Your mom.";
                break;
            default:
                response += "I know of a black hole you could visit.";
        }
    }
    document.getElementById("responseDiv").innerHTML = response;
}

function sayThis(toSay){
    document.getElementById("responseDiv").hidden = !gGameInProgress;

    if(whoseTurn == 1) {
        document.getElementById("responseDiv").innerHTML = "Player 1: <br/>" + toSay;
    }
    else{
        document.getElementById("responseDiv").innerHTML = "Player 2: <br/>" + toSay;
    }
}

//____________________FULL_SCREEN______________________
function goFullscreen() {
    var mainDiv = document.getElementById("setupDiv");
    if (mainDiv.mozRequestFullScreen) {
        mainDiv.mozRequestFullScreen();
    } else if (mainDiv.webkitRequestFullScreen) {
        mainDiv.webkitRequestFullScreen();
    }
}