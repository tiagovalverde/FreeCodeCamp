//Game object
SIMON_GAME = {
	counter: 0,
	sequence: [],
	user_click_counter: 0,
	is_off: true,
	is_playing_sequence: false,
	is_strict_mode: false,
	MAX_NUM_SEQUENCE: 5,
	colors: ['blue', 'red', 'green', 'yellow'],

};

//controls events
var power_switch_btn = document.getElementById('power-switch');
var start_btn = document.getElementById('start');
var strict_btn = document.getElementById('strict');
var strict_indicator = document.getElementById('strict-indicator');
var counter_txt = document.getElementById('counter');
//btn labels
var labels = document.querySelectorAll('.control-desc');
var start_label = labels[0];

power_switch_btn.onclick = function () {
	onPowerSwitchClick();
};

//click events
function onPowerSwitchClick() {
	if (SIMON_GAME.is_off) {
		power_switch_btn.classList.add('on');
		counter_txt.classList.remove('led-off');
		SIMON_GAME.is_off = false;
		enableStartButton();
		enableStrictButton();
	} else {
		power_switch_btn.classList.remove('on');
		counter_txt.classList.add('led-off');
		strict_indicator.classList.remove('full-red');
		resetGameOnject();
		disableStartButton();
		disableStrictButton();
	}
}

function enableStrictButton() {
	strict_btn.classList.add('clickable');
	strict_btn.onclick = function () {
		onStrictClick();
	};
}

function enableStartButton() {
	if (SIMON_GAME.sequence.length !== 0) {
		start_label.innerHTML = 'RESTART';
	} else {
		start_label.innerHTML = 'START';
	}

	start_label.classList.remove('line-through');
	start_btn.classList.add('clickable');
	start_btn.onclick = function () {
		onStartClick();
	};
}

function disableStrictButton() {
	strict_btn.classList.remove('clickable');
	strict_btn.onclick = null;
}

function disableStartButton() {
	start_label.classList.add('line-through');
	start_btn.classList.remove('clickable');
	start_btn.onclick = null;

}

async function onStartClick() {
	//check if game is starting
	if (SIMON_GAME.sequence.length !== 0) {
		resetGameOnject(); //if is in progress
		removeColorsOnClick();
		resetGameDesign();
		start_label.innerHTML = 'START';
	}
	var result = await flashCounterLed();
	playSequence();
}

async function replaySequence() {
	//disable start button
	disableStartButton();
	counter_txt.innerText = SIMON_GAME.counter;
	SIMON_GAME.is_playing_sequence = true;
	var result = await displaySequence();
	//enable start button to be Restart
	enableStartButton();
	SIMON_GAME.is_playing_sequence = false;
}

async function playSequence() {
	if (SIMON_GAME.sequence.length < SIMON_GAME.MAX_NUM_SEQUENCE) {
		SIMON_GAME.is_playing_sequence = true;
		SIMON_GAME.counter++;
		SIMON_GAME.sequence.push(getNextColorRand());
		counter_txt.innerText = SIMON_GAME.counter;
		removeColorsOnClick();
		disableStartButton();
		var result = await displaySequence();
		enableStartButton();
		//player turn
		SIMON_GAME.is_playing_sequence = false;
		setupColorsOnClick();
	} else {
		//wind condition
		counter_txt.innerText = 'WON';
		var result = await flashCounterLed();
		resetGameDesign();
		resetGameOnject();
		removeColorsOnClick();
	}



}

function setupColorsOnClick() {
	var color_blocks = document.querySelectorAll('.color-blocks');

	color_blocks.forEach(color => {
		color.onclick = function () {
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
		if (SIMON_GAME.user_click_counter === SIMON_GAME.sequence.length - 1) {
			removeColorsOnClick();
			SIMON_GAME.user_click_counter = 0;
			playSequence();
		} else {
			SIMON_GAME.user_click_counter++;
		}
	} else {
		//if no match
		if (SIMON_GAME.is_strict_mode) {
			//Loser -> start over
			counter_txt.innerText = 'XX';
			var result = await flashCounterLed();
			resetGameOnject(); //if is in progress
			removeColorsOnClick();
			resetGameDesign();
			playSequence();
		} else {
			//same sequence is played again
			removeColorsOnClick();
			counter_txt.innerText = 'X';
			var result = await flashCounterLed();
			SIMON_GAME.user_click_counter = 0;
			await replaySequence();
			setupColorsOnClick();
		}
	}
}

function displaySequence() {
	SIMON_GAME.is_playing_sequence = true;
	return new Promise(resolve => {
		let in_out = 0;
		SIMON_GAME.sequence.map(function (color, index) {
			var lighter = setTimeout(() => {
				document.getElementById(color).classList.add(color + '-light');
			}, 500 + index * 1000);

			var darker = setTimeout(() => {
				document.getElementById(color).classList.remove(color + '-light');
				if (index === SIMON_GAME.sequence.length - 1) {
					resolve('sequence done');
				}
			}, 1000 + index * 1000);
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
		flashingArray.map(function (fun, index) {
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
}

function resetGameDesign() {
	counter_txt.innerText = '--';
}