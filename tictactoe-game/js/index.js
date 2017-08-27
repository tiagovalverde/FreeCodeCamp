$(document).ready(function() {
	
	var btn_reset = document.getElementById('btn-reset');
    btn_reset.onclick = function() {resetGame()};

	function resetGame(){
		console.log('hide board, clean record, ask X or O, showboard');
	}


var board_pos = undefined;

	const board_list = document.querySelectorAll('.board-block');

    board_list.forEach(
    	key => addEventListener("click", once, false)

    );





    function once(element) {
	    
	    console.log( element.target.getAttribute('value') );
	  }

});




