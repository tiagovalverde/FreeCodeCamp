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
var btn_power_switch = document.getElementById('power-switch');

btn_power_switch.onclick = function() {onPowerSwitchClick()};


//click events
function onPowerSwitchClick(){
    console.log("power switch clicked");
    console.log(btn_power_switch);
    if(SIMON_GAME.is_off){
        btn_power_switch.classList.add('on');
        SIMON_GAME.is_off = false;
    }else{
        btn_power_switch.classList.remove('on');
        SIMON_GAME.is_off = true;
    }
   
}