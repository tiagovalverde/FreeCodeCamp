var game_prop = {
    plr: "",
    plr_rcrd: 0,
    com: "",
    com_rcrd: 0,
    crrt_plr: "",
    moves: 0,
    board: [0,1,2,3,4,5,6,7,8]
 };

const boardBlocks = document.querySelectorAll('.board-block');


    //reset game
    var btn_reset = document.getElementById('btn-reset');
    btn_reset.onclick = function() {resetGame()};

	function resetGame(){
		//hide board, clean record, ask X or O, showboard
		




		//styling
		document.querySelector(".start-block").classList.remove("m-fadeOut");
        document.querySelector(".white-block").classList.remove("m-fadeIn");
        
        //reset game properties (variables)
        game_prop.plr = game_prop.com = game_prop.crrt_plr = "";
        game_prop.plr_rcrd = game_prop.com_rcrd = 0;
        game_prop.moves = 0;
        game_prop.board = [0,1,2,3,4,5,6,7,8];
        //reset game properties (elements)
        boardBlocks.forEach(block => {
        	block.innerHTML = "";
        	block.onclick = function() {fillBlock(this.id)};
        	block.classList.remove("win");
        	//add onclick attribute
        });
        


        console.log( 'game reset');
	}


	

	//starting game events
	const startButtons = document.querySelectorAll('.btn-secondary');

	startButtons.forEach(
		key => addEventListener('click', selectPlayerChar, false)		
    );

	
	function selectPlayerChar(element){
		//define chars for players
		if(element.target.getAttribute('id') === "start-btn"){
			console.log("select char & start");

			game_prop.plr = element.target.getAttribute('data-player');
            game_prop.com = element.target.getAttribute('data-com');
            game_prop.crrt_plr = game_prop.plr; // switch each game (depending on number games realized)
            
            //hide starting block ^& show block
            document.querySelector(".start-block").className += ' m-fadeOut';
            document.querySelector(".white-block").className += ' m-fadeIn';

            //document.querySelector("record").dataset.player = element.target.getAttribute('data-player');
            document.querySelectorAll(".record")[0].setAttribute('data-player',element.target.getAttribute('data-player'));
			document.querySelectorAll(".record")[1].setAttribute('data-player',element.target.getAttribute('data-com'));
			}

	}


	//fill Board
	function fillBlock(block_id){
		
        //fill block with current player char
        document.getElementById(block_id).innerText = game_prop.crrt_plr;
        game_prop.board[block_id] = game_prop.crrt_plr;
        console.log(game_prop.board);

        //every time a block is filled

        //check state of the game
        checkStateGame(game_prop.crrt_plr);

        //change current player (to change char)
        game_prop.crrt_plr === game_prop.plr ? game_prop.crrt_plr = game_prop.com : game_prop.crrt_plr = game_prop.plr;
        
        //increment number plays done
        game_prop.moves++;

        
        //check if is com turn (apply here the minimax alghoritm)



        //remove block click event
        document.getElementById(block_id).removeAttribute("onClick");
	}

	function showWinner(blocksWinID, winner){
		
		

		boardBlocks.forEach(block => {
			if(block.id == blocksWinID[0] || block.id == blocksWinID[1] || block.id == blocksWinID[2]){
				document.getElementById(blocksWinID[0]).classList.add("win");
				document.getElementById(blocksWinID[1]).classList.add("win");
				document.getElementById(blocksWinID[2]).classList.add("win");
			}
		});

		setInterval(updateRecord, 1000);

		function updateRecord(){
		    if(winner === document.querySelectorAll(".record")[0].getAttribute('data-player')){
		    	document.querySelectorAll(".record span")[0].innerText = 
		    }

		}

		


	}

	function checkStateGame(currentPlayer){

		var temp = currentPlayer + "WINSSS!";

		if(game_prop.board[0] === currentPlayer){

			if(game_prop.board[1] === currentPlayer && game_prop.board[2] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [0,1,2];
				showWinner(winnerBlocksPos,currentPlayer );
			}else if(game_prop.board[3] === currentPlayer && game_prop.board[6] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [0,3,6];
				showWinner(winnerBlocksPos,currentPlayer );
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[8] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [0,4,8];
				showWinner(winnerBlocksPos,currentPlayer );
			}


		}else if(game_prop.board[1] === currentPlayer){

			if(game_prop.board[4] === currentPlayer && game_prop.board[7] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [1,4,7];
				showWinner(winnerBlocksPos,currentPlayer );
			}

		}else if(game_prop.board[2] === currentPlayer){

			if(game_prop.board[5] === currentPlayer && game_prop.board[8] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [2,5,8];
				showWinner(winnerBlocksPos,currentPlayer );
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[6] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [2,4,6];
				showWinner(winnerBlocksPos,currentPlayer );
			}

		}else if(game_prop.board[3] === currentPlayer){
			
			if(game_prop.board[4] === currentPlayer && game_prop.board[5] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [3,4,5];
				showWinner(winnerBlocksPos,currentPlayer );
			}

		}else if(game_prop.board[6] === currentPlayer){
			
			if(game_prop.board[7] === currentPlayer && game_prop.board[8] === currentPlayer){
				console.log(temp);
				const winnerBlocksPos = [6,7,8];
				showWinner(winnerBlocksPos,currentPlayer );
			}

		}

	}








