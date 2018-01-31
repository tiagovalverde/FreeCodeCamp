//Game object
SIMON_GAME = {
    counter: 0,
    sequence: [],
    next_to_validate: 0,
    is_off: true,
    is_playing_sequence: false,
    is_strict_mode: false,
    MAX_NUM_SEQUENCE: 20,
};

//controls events
var power_switch_btn = document.getElementById('power-switch');
var start_btn = document.getElementById('start');
var strict_btn = document.getElementById('strict');
var strict_indicator = document.getElementById('strict-indicator');
var counter_txt = document.getElementById('counter');


power_switch_btn.onclick = function() {onPowerSwitchClick()};

//click events
function onPowerSwitchClick(){
    console.log("power switch clicked");

    if(SIMON_GAME.is_off){
        power_switch_btn.classList.add('on');
        counter_txt.classList.remove('led-off');
        SIMON_GAME.is_off = false;
        start_btn.onclick = function() {onStartClick()};
        strict_btn.onclick = function() {onStrictClick()};
    }else{
        power_switch_btn.classList.remove('on');
        counter_txt.classList.add('led-off');
        strict_indicator.classList.remove("full-red");
        resetGameOnject();
        //disable color onclick ???
        //reset counter to "--"
        start_btn.onclick = null;
        strict_btn.onclick = null;
    }
}

function onStartClick(){
    console.log("start clicked");
}

function onStrictClick() {
    if(SIMON_GAME.is_strict_mode){
        SIMON_GAME.is_strict_mode = false;
        strict_indicator.classList.remove('full-red');
    }else{
        SIMON_GAME.is_strict_mode = true;
        strict_indicator.classList.add('full-red');
    }
    //console.log("srtict: " + SIMON_GAME.is_strict_mode);
}

function resetGameOnject() {
    SIMON_GAME.counter = 0;
    SIMON_GAME.sequence = [];
    SIMON_GAME.next_to_validate = 0;
    SIMON_GAME.is_off = true;
    SIMON_GAME.is_playing_sequence = false;
    SIMON_GAME.is_strict_mode = false;
    MAX_NUM_SEQUENCE = 20;
}