//Game object
SIMON_GAME = {
	counter: 0,
	sequence: [],
	user_click_counter: 0,
	is_off: true,
	is_playing_sequence: false,
	is_strict_mode: false,
	MAX_NUM_SEQUENCE: 20,
	colors: ['blue', 'red', 'green', 'yellow'],
	interrupt: false, //flag var for start new game (promise handler)
};

//controls events
var power_switch_btn = document.getElementById('power-switch');
var start_btn = document.getElementById('start');
var strict_btn = document.getElementById('strict');
var strict_indicator = document.getElementById('strict-indicator');
var counter_txt = document.getElementById('counter');

power_switch_btn.onclick = function() {
	onPowerSwitchClick();
};

//click events
function onPowerSwitchClick() {
	console.log('power switch clicked');

	if (SIMON_GAME.is_off) {
		power_switch_btn.classList.add('on');
		counter_txt.classList.remove('led-off');
		SIMON_GAME.is_off = false;
		start_btn.onclick = function() {
			onStartClick();
		};
		strict_btn.onclick = function() {
			onStrictClick();
		};
	} else {
		power_switch_btn.classList.remove('on');
		counter_txt.classList.add('led-off');
		strict_indicator.classList.remove('full-red');
		resetGameOnject();
		//disable color onclick ???
		//reset counter to "--"
		start_btn.onclick = null;
		strict_btn.onclick = null;
	}
}

async function onStartClick() {
	//check if game is starting
	if (SIMON_GAME.sequence.length !== 0) {
		SIMON_GAME.interrupt = true;
		resetGameOnject(); //if is in progress
		removeColorsOnClick();
		resetGameDesign();
	}
	var result = await flashCounterLed();
	console.log(result);
	playSequence();
}

async function replaySequence() {
	counter_txt.innerText = SIMON_GAME.counter;
	SIMON_GAME.is_playing_sequence = true;
	var result = await displaySequence();
	SIMON_GAME.is_playing_sequence = false;
	if (result === 'interrupted') {
		return;
	}
	setupColorsOnClick();
}

async function playSequence() {
	SIMON_GAME.is_playing_sequence = true;
	SIMON_GAME.counter++;
	SIMON_GAME.sequence.push(getNextColorRand());
	counter_txt.innerText = SIMON_GAME.counter;
	console.log(SIMON_GAME.sequence);
	var result = await displaySequence();
	console.log(result);
	//player turn
	SIMON_GAME.is_playing_sequence = false;
	if (result === 'interrupted') {
		return;
	}
	//add onCLick events on colors
	setupColorsOnClick();
	//finish and wait for user clicks
}

function setupColorsOnClick() {
	var color_blocks = document.querySelectorAll('.color-blocks');

	color_blocks.forEach(color => {
		color.onclick = function() {
			onClickColor(color.id);
		};

		color.addEventListener('mousedown', addLightColor);
		color.addEventListener('mouseup', removeLightColor);
	});
}

function removeColorsOnClick() {
	var color_blocks = document.querySelectorAll('.color-blocks');

	color_blocks.forEach(color => {
		color.onclick = null;
		color.removeEventListener('mousedown', addLightColor);
		color.removeEventListener('mouseup', removeLightColor);
	});
}

function addLightColor() {
	this.classList.add(this.id + '-light');
}
function removeLightColor() {
	this.classList.remove(this.id + '-light');
}

async function onClickColor(color_id) {
	//check if value on index match user id
	if (color_id === SIMON_GAME.sequence[SIMON_GAME.user_click_counter]) {
		console.log('match');
		if (SIMON_GAME.user_click_counter === SIMON_GAME.sequence.length - 1) {
			console.log('finished guessing sequence');
			removeColorsOnClick();
			SIMON_GAME.user_click_counter = 0;
			playSequence();
		} else {
			console.log('continue guessing sequence');
			SIMON_GAME.user_click_counter++;
		}
	} else {
		console.log('fail');
		//if no match
		if (SIMON_GAME.is_strict_mode) {
			//reset and start sequence over
		} else {
			//same sequence is played again (strict false)

			counter_txt.innerText = 'NO';
			var result = await flashCounterLed();
			SIMON_GAME.user_click_counter = 0;
			removeColorsOnClick();
			replaySequence();
		}
	}
}

function displaySequence() {
	SIMON_GAME.is_playing_sequence = true;

	return new Promise(resolve => {
		let in_out = 0;
		SIMON_GAME.sequence.map(function(color, index) {
			var lighter = setTimeout(() => {
				document.getElementById(color).classList.add(color + '-light');
			}, 500 + index * 1000);

			var darker = setTimeout(() => {
				document.getElementById(color).classList.remove(color + '-light');
				if (index === SIMON_GAME.sequence.length - 1) {
					resolve('sequence done');
				}
			}, 1000 + index * 1000);

			//interrupted by user
			if (SIMON_GAME.interrupt) {
				clearTimeout(lighter);
				clearTimeout(darker);
				resolve('interrupted');
			} else {
				lighter;
				darker;
			}
		});
	});
}

function getNextColorRand() {
	const randIndex = Math.floor(Math.random() * Math.floor(4));
	return SIMON_GAME.colors[randIndex];
}

function onStrictClick() {
	if (SIMON_GAME.is_strict_mode) {
		SIMON_GAME.is_strict_mode = false;
		strict_indicator.classList.remove('full-red');
	} else {
		SIMON_GAME.is_strict_mode = true;
		strict_indicator.classList.add('full-red');
	}
	//console.log("srtict: " + SIMON_GAME.is_strict_mode);
}

function flashCounterLed() {
	//add remove class
	function addLed() {
		counter_txt.classList.add('led-off');
	}
	function removeLed() {
		counter_txt.classList.remove('led-off');
	}

	//array with flashing sequence
	let flashingArray = [addLed, removeLed, addLed, removeLed];

	//switch between add and remove functions with timers
	//javascript does not keep running unitl resolve returned
	return new Promise(resolve => {
		flashingArray.map(function(fun, index) {
			setTimeout(() => {
				fun();

				if (index === 3) {
					resolve('flashing done');
				}
			}, 500 + index * 500);
		});
	});
}

function resetGameOnject() {
	SIMON_GAME.counter = 0;
	SIMON_GAME.sequence = [];
	SIMON_GAME.user_click_counter = 0;
	SIMON_GAME.is_off = true;
	SIMON_GAME.is_playing_sequence = false;
	SIMON_GAME.is_strict_mode = false;
	MAX_NUM_SEQUENCE = 20;
}

function resetGameDesign() {
	counter_txt.innerText = '--';
}
