var game_prop = {
    plr: "",
    plr_rcrd: 0,
    com: "",
    com_rcrd: 0,
    crrt_plr: "",
    moves: 0,
	board: [0,1,2,3,4,5,6,7,8],
	game_over: 0 //0: fa;se, 1: true
	
 };

//elements
const boardBlocks = document.querySelectorAll('.board-block');

//starting game properties
const startButtons = document.querySelectorAll('.btn-secondary');

startButtons.forEach(
	key => addEventListener('click', selectPlayerChar, false)		
);

function selectPlayerChar(element){
	//define chars for players
	if(element.target.getAttribute('id') === "start-btn"){
        setupGameProp(element);
        showGameBoard();
        setupRecordDataAttr(element); 
		}

}   

//reset game
var btn_reset = document.getElementById('btn-reset');
btn_reset.onclick = function() {resetGame()};

function resetGame(){
	//hide board, clean record, ask X or O, showboard
	hideGameBoard();
    resetGameProp();
	resetBoard();
	resetBoardRecords();
	
}

//fill Board
function fillBlock(block_id){
	const blockInnerText = document.getElementById(block_id).innerText;
	if(blockInnerText === ''){
		updateBoardBlock(block_id);
		//every time a block is filled
		//check state of the game
		checkStateGame(game_prop.crrt_plr, block_id);
		//change current player (to change char)
		game_prop.crrt_plr === game_prop.plr ? game_prop.crrt_plr = game_prop.com : game_prop.crrt_plr = game_prop.plr;
		//increment number plays done
		game_prop.moves++;
		//check if is com turn (apply here the minimax alghoritm)
		//remove block click event
		document.getElementById(block_id).removeAttribute("onClick");
	}
	


	
}

//fillBlock()
function updateBoardBlock(block_id){
	//fill block with current player char
    document.getElementById(block_id).innerText = game_prop.crrt_plr;
    game_prop.board[block_id] = game_prop.crrt_plr;
}


	//increments victory on winner and highlights board blocks
	function showWinner(blocksWinID, winner){

		//disable onclick events on blocks
		//highlight board
		boardBlocks.forEach(block => {
			
			document.getElementById(block.id).onclick = null;

			
			if(block.id == blocksWinID[0] || block.id == blocksWinID[1] || block.id == blocksWinID[2]){
				document.getElementById(blocksWinID[0]).classList.add("win");
				document.getElementById(blocksWinID[1]).classList.add("win");
				document.getElementById(blocksWinID[2]).classList.add("win");
			}
		});

		setTimeout(updateRecord, 1000);
		clearInterval(updateRecord);

		setTimeout(resetBoard, 1500);
		clearInterval(resetBoard);

		function updateRecord(){
		    if(winner === document.querySelectorAll(".record")[0].getAttribute('data-player')){
				game_prop.plr_rcrd += 1;
				//document.querySelectorAll(".record span")[0].innerText = game_prop.plr_rcrd;

				document.querySelectorAll(".record")[0]
					.innerText = 'Comp. [' + game_prop.plr + ']: ' + game_prop.plr_rcrd;





		    }else{
				game_prop.com_rcrd += 1;
				//document.querySelectorAll(".record span")[1].innerText = game_prop.com_rcrd;
				document.querySelectorAll(".record")[1]
					.innerText = 'Comp. [' + game_prop.com + ']: ' + game_prop.com_rcrd;
			}
		}
	}


	//highlight all blocks due to tie
	function highlightBlocksTie(){
		boardBlocks.forEach(block => {
			block.classList.add("tie");
		});
	}

	//check if board is full
	function checkIfBoardFull(){

		isFull = 0;
		boardBlocks.forEach(block => {

			if(block.innerText != ''){
				isFull++;
			}

			if(isFull === 9){
				//tie
				highlightBlocksTie();
				setTimeout(resetBoard, 1500);
		        clearInterval(resetBoard);
			}
		});
	}

	function checkStateGame(currentPlayer, block_id){
		//when top right clicked
		if(+block_id === 0) {
			if(game_prop.board[1] === currentPlayer && game_prop.board[2] === currentPlayer){
				const winnerBlocksPos = [0,1,2];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[3] === currentPlayer && game_prop.board[6] === currentPlayer){
				const winnerBlocksPos = [0,3,6];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[8] === currentPlayer){
				const winnerBlocksPos = [0,4,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//when top middle clicked
		if(+block_id === 1) {
			if(game_prop.board[4] === currentPlayer && game_prop.board[7] === currentPlayer){

				const winnerBlocksPos = [1,4,7];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[0] === currentPlayer && game_prop.board[2] === currentPlayer){
				const winnerBlocksPos = [0,1,2];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			console.log("no winner - check if full")
			checkIfBoardFull();
		}
		//when top right clicked
		if(+block_id === 2) {
			if(game_prop.board[0] === currentPlayer && game_prop.board[1] === currentPlayer){
				
				const winnerBlocksPos = [0,1,2];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[5] === currentPlayer && game_prop.board[8] === currentPlayer){
				const winnerBlocksPos = [2, 5, 8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[6] === currentPlayer){
				const winnerBlocksPos = [2,4,6];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//when middle left clicked
		if(+block_id === 3) {
			if(game_prop.board[0] === currentPlayer && game_prop.board[6] === currentPlayer){
				const winnerBlocksPos = [0,3,6];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[4] === currentPlayer && game_prop.board[5] === currentPlayer){
				const winnerBlocksPos = [3,4,5];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//when middle middle clicked
		if(+block_id === 4) {
			if(game_prop.board[3] === currentPlayer && game_prop.board[5] === currentPlayer){
				const winnerBlocksPos = [3,4,5];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[1] === currentPlayer && game_prop.board[7] === currentPlayer){
				const winnerBlocksPos = [1,4,7];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[0] === currentPlayer && game_prop.board[8] === currentPlayer){
				const winnerBlocksPos = [0,4,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[2] === currentPlayer && game_prop.board[6] === currentPlayer){
				const winnerBlocksPos = [2,4,6];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//middle right clicked
		if(+block_id === 5) {
			if(game_prop.board[2] === currentPlayer && game_prop.board[8] === currentPlayer){
				const winnerBlocksPos = [2,5,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[3] === currentPlayer && game_prop.board[4] === currentPlayer){
				const winnerBlocksPos = [3,4,5];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//bottom left clicked
		if(+block_id === 6) {
			if(game_prop.board[0] === currentPlayer && game_prop.board[3] === currentPlayer){
				const winnerBlocksPos = [0,3,6];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[7] === currentPlayer && game_prop.board[8] === currentPlayer){
				const winnerBlocksPos = [6,7,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[2] === currentPlayer){
				const winnerBlocksPos = [6,4,2];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//bottom middle
		if(+block_id === 7) {
			if(game_prop.board[1] === currentPlayer && game_prop.board[4] === currentPlayer){
				const winnerBlocksPos = [1,4,7];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			else if(game_prop.board[6] === currentPlayer && game_prop.board[8] === currentPlayer){
				const winnerBlocksPos = [6,7,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}
		//bottom right clicked
		if(+block_id === 8) {
			if(game_prop.board[0] === currentPlayer && game_prop.board[4] === currentPlayer){
				const winnerBlocksPos = [0,4,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[7] === currentPlayer && game_prop.board[6] === currentPlayer){
				const winnerBlocksPos = [6,7,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}else if(game_prop.board[2] === currentPlayer && game_prop.board[5] === currentPlayer){
				const winnerBlocksPos = [2,5,8];
				showWinner(winnerBlocksPos,currentPlayer );
				return;
			}
			checkIfBoardFull();
		}		
			
	}


// Helpers
//selectPlayerChar()
function showGameBoard(){
    document.querySelector(".start-block").className += ' m-fadeOut';
    document.querySelector(".white-block").className += ' m-fadeIn';
}

function setupGameProp(element){
	game_prop.plr = element.target.getAttribute('data-player');
    game_prop.com = element.target.getAttribute('data-com');
	game_prop.crrt_plr = game_prop.plr; // switch each game (depending on number games realized)
	//update players html elements symbol
	document.querySelectorAll(".record")[0].innerText = 'Player [' + game_prop.plr + ']';
    document.querySelectorAll(".record")[1].innerText = 'Comp. [' + game_prop.com + ']';
}

function setupRecordDataAttr(element){
    document.querySelectorAll(".record")[0].setAttribute('data-player',element.target.getAttribute('data-player'));
    document.querySelectorAll(".record")[1].setAttribute('data-player',element.target.getAttribute('data-com'));
}



//resetGame()
function hideGameBoard(){
	document.querySelector(".start-block").classList.remove("m-fadeOut");
    document.querySelector(".white-block").classList.remove("m-fadeIn");
}

function resetGameProp(){
	//reset game properties (variables)
    game_prop.plr = game_prop.com = game_prop.crrt_plr = "";
    game_prop.plr_rcrd = game_prop.com_rcrd = 0;
    game_prop.moves = 0;
	game_prop.board = [0,1,2,3,4,5,6,7,8];
	game_prop.game_over = 0;
}

function resetBoardProp(){
	game_prop.moves = 0;
	game_prop.board = [0,1,2,3,4,5,6,7,8];
}

function resetBoard(){
	//reset game properties (elements)
    boardBlocks.forEach(block => {
    	block.innerHTML = "";
    	block.onclick = function() {fillBlock(this.id)};
		block.classList.remove("win");
		block.classList.remove("tie");
		resetBoardProp();


    	//add onclick attribute
    });
}

function resetBoardRecords(){
		//reset records
		document.querySelectorAll(".record span")[0].innerText = 0;
		document.querySelectorAll(".record span")[1].innerText = 0;
}






