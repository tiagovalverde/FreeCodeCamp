//Game object
SIMON_GAME = {
  counter: 0,
  sequence: [],
  user_click_counter: 0,
  is_off: true,
  is_playing_sequence: false,
  is_strict_mode: false,
  MAX_NUM_SEQUENCE: 20,
  colors: ["blue", "red", "green", "yellow"]
};

//controls events
var power_switch_btn = document.getElementById("power-switch");
var start_btn = document.getElementById("start");
var strict_btn = document.getElementById("strict");
var strict_indicator = document.getElementById("strict-indicator");
var counter_txt = document.getElementById("counter");

power_switch_btn.onclick = function() {
  onPowerSwitchClick();
};

//click events
function onPowerSwitchClick() {
  console.log("power switch clicked");

  if (SIMON_GAME.is_off) {
    power_switch_btn.classList.add("on");
    counter_txt.classList.remove("led-off");
    SIMON_GAME.is_off = false;
    start_btn.onclick = function() {
      onStartClick();
    };
    strict_btn.onclick = function() {
      onStrictClick();
    };
  } else {
    power_switch_btn.classList.remove("on");
    counter_txt.classList.add("led-off");
    strict_indicator.classList.remove("full-red");
    resetGameOnject();
    //disable color onclick ???
    //reset counter to "--"
    start_btn.onclick = null;
    strict_btn.onclick = null;
  }
}

async function onStartClick() {
  //flashes counter led
  var result = await flashCounterLed();
  console.log(result);
  //starts sequence
  playSequence();
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
  //add onCLick events on colors
  setupColorsOnClick();
  //finish and wait for user clicks
}

function setupColorsOnClick() {
  var color_blocks = document.querySelectorAll(".color-blocks");

  color_blocks.forEach(color => {
    color.onclick = function() {
      onClickColor(color.id);
    };
  });
}

function removeColorsOnClick() {
  var color_blocks = document.querySelectorAll(".color-blocks");

  color_blocks.forEach(color => {
    color.onclick = null;
  });
}

function onClickColor(color_id) {
  console.log("compare");
  console.log(color_id);
  console.log(SIMON_GAME.sequence[SIMON_GAME.user_click_counter]);
  console.log("---------");
  //check if value on index match user id
  if (color_id === SIMON_GAME.sequence[SIMON_GAME.user_click_counter]) {
    console.log("match");
    if (SIMON_GAME.user_click_counter === SIMON_GAME.sequence.length - 1) {
      console.log("finished guessing sequence");
      removeColorsOnClick();
      SIMON_GAME.user_click_counter = 0;
      playSequence();
    } else {
      console.log("continue guessing sequence");
      SIMON_GAME.user_click_counter++;
    }
    //finished the sequence
  } else {
    console.log("fail");
    //if match , user can keep clicking
    //if no match
    //same sequence is played again (strict false)
    //or start from 1 again (stict true)
  }
}

function displaySequence() {
  SIMON_GAME.is_playing_sequence = true;

  return new Promise(resolve => {
    let in_out = 0;
    SIMON_GAME.sequence.map(function(color, index) {
      setTimeout(() => {
        document.getElementById(color).classList.add(color + "-light");
      }, 500 + index * 1000);

      setTimeout(() => {
        document.getElementById(color).classList.remove(color + "-light");
        if (index === SIMON_GAME.sequence.length - 1) {
          resolve("sequence done");
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
    strict_indicator.classList.remove("full-red");
  } else {
    SIMON_GAME.is_strict_mode = true;
    strict_indicator.classList.add("full-red");
  }
  //console.log("srtict: " + SIMON_GAME.is_strict_mode);
}

function flashCounterLed() {
  //add remove class
  function addLed() {
    counter_txt.classList.add("led-off");
  }
  function removeLed() {
    counter_txt.classList.remove("led-off");
  }

  //array with flashing sequence
  let flashingArray = [addLed, removeLed, addLed, removeLed, addLed, removeLed];

  //switch between add and remove functions with timers
  //javascript does not keep running unitl resolve returned
  return new Promise(resolve => {
    flashingArray.map(function(fun, index) {
      setTimeout(() => {
        fun();
        if (index === 5) {
          resolve("flashing done");
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
