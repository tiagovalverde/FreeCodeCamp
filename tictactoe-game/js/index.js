var game_prop = {
    plr: "",
    plr_rcrd: 0,
    com: "",
    com_rcrd: 0,
    crrt_plr: "",
    moves: 0,
    board: [0,1,2,3,4,5,6,7,8]
 };


    //reset game
    var btn_reset = document.getElementById('btn-reset');
    btn_reset.onclick = function() {resetGame()};

	function resetGame(){
		//hide board, clean record, ask X or O, showboard
		
		//styling
		document.querySelector(".start-block").classList.remove("m-fadeOut");
        document.querySelector(".white-block").classList.remove("m-fadeIn");
        
        //set up game properties
        game_prop.plr = com = "";
        game_prop.plr_rcrd = game_prop.com_rcrd = 0;
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

	function checkStateGame(currentPlayer){

		var temp = currentPlayer + "WINSSS!";

		if(game_prop.board[0] === currentPlayer){

			if(game_prop.board[1] === currentPlayer && game_prop.board[2] === currentPlayer){
				console.log(temp);
			}else if(game_prop.board[3] === currentPlayer && game_prop.board[6] === currentPlayer){
				console.log(temp);
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[8] === currentPlayer){
				console.log(temp);
			}


		}else if(game_prop.board[1] === currentPlayer){

			if(game_prop.board[4] === currentPlayer && game_prop.board[7] === currentPlayer){
				console.log(temp);
			}

		}else if(game_prop.board[2] === currentPlayer){

			if(game_prop.board[5] === currentPlayer && game_prop.board[8] === currentPlayer){
				console.log(temp);
			}else if(game_prop.board[4] === currentPlayer && game_prop.board[6] === currentPlayer){
				console.log(temp);
			}

		}else if(game_prop.board[3] === currentPlayer){
			
			if(game_prop.board[4] === currentPlayer && game_prop.board[5] === currentPlayer){
				console.log(temp);
			}

		}else if(game_prop.board[6] === currentPlayer){
			
			if(game_prop.board[7] === currentPlayer && game_prop.board[8] === currentPlayer){
				console.log(temp);
			}

		}

	}







