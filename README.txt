
##The Name
Why "The Cepheid Variables" ?
	The "Cepheid Variables" are some important stars which were discovered by South African astronomers
	This is in line with the specified hackthon space theme as well as the more obvious connection to coding with "variables"


##The Code
	The code is organised into a logical model-view-controller.
	The project can easily be packed to run on Windows, Android and iOS as it is HTML5 based.
	This game uses the template method design pattern in calling the random move pc player.
	This supports the future possibility of AI implementations (different diffculty levels) such as a min-max algorithm with different ply-depths.


##The Game
	The object of the game is to capture all your opponent's aliens.
	Each alien has an aura surrounding it. 
	You can capture another alien by getting your aura to touch the side of another alien.
	When aliens of the same team have their auras touching, the collective aura will extend to be a large rectangle enclosing the individual auras. 
	Aliens can move either vertically or horizontally. The maximum distance any alien may move is  equal to the amount of aliens enclosed in its aura.
	Make a move by clicking on one of your aliens and then clicking on a valid new cell on the board.

##Player Vs PC (RandomMover)
	Player makes a move as detailed above. Click anywhere on the board to make the PC play. The PC's old position is marked by a green dot and the alien which was last moved by the PC appears to be selected (it has green eyes and mouth).