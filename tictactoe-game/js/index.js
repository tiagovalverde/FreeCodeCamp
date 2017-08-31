    //global vars
    var player = "";
    var player_record = 0;
    var com = "";
    var com_record = 0;


    //reset game
    var btn_reset = document.getElementById('btn-reset');
    btn_reset.onclick = function() {resetGame()};

	function resetGame(){
		//hide board, clean record, ask X or O, showboard
		document.querySelector(".start-block").classList.remove("m-fadeOut");
        document.querySelector(".white-block").classList.remove("m-fadeIn");
        player = com = "";
        player_record = com_record = 0
	}

	//board click events

	function addBoardClickEvents(){
		var board_pos = undefined;
		const board_list = document.querySelectorAll('.board-block');

	    board_list.forEach(
	    	key => addEventListener("click", fillBlock, false)

	    );


	    function fillBlock(element) {
		    
		    console.log( element.target.getAttribute('value') );
		}
	}

    

	//starting game events
	const startButtons = document.querySelectorAll('.btn-secondary');
    console.log(startButtons);

	startButtons.forEach(
		key => addEventListener('click', selectPlayerChar)
    );

	

	function selectPlayerChar(element){
		//define chars for players
		if(element.target.getAttribute('id') === "start-btn"){
			console.log("sss");
			player = element.target.getAttribute('data-player');
            com = element.target.getAttribute('data-com');
            //hide starting block ^& show block
            document.querySelector(".start-block").className += ' m-fadeOut';
            document.querySelector(".white-block").className += ' m-fadeIn';
		}
		
        
        
	}










