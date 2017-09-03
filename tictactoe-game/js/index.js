var game_prop = {
    player: "",
    player_record: 0,
    com: "",
    com_record: 0,
    currentPlayer: "",
    moves: 1
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
        game_prop.player = com = "";
        game_prop.player_record = game_prop.com_record = 0;
        console.log( 'game reset');
	}


	

	//starting game events
	const startButtons = document.querySelectorAll('.btn-secondary');
    console.log(startButtons);

	startButtons.forEach(
		key => addEventListener('click', selectPlayerChar, false)		
    );

	
	function selectPlayerChar(element){
		//define chars for players
		if(element.target.getAttribute('id') === "start-btn"){
			console.log("select char & start");
			game_prop.player = element.target.getAttribute('data-player');
            game_prop.com = element.target.getAttribute('data-com');
            currentPlayer = game_prop.player; // switch each game (depending on number games realized)
            //hide starting block ^& show block
            document.querySelector(".start-block").className += ' m-fadeOut';
            document.querySelector(".white-block").className += ' m-fadeIn';
		}
	}


	//fill Board
	function icon(block_id){
		
        document.getElementById(block_id).removeAttribute("onClick");
        document.getElementById(block_id).innerText = game_prop.player;
	}







