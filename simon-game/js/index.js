//Game object
SIMON_GAME = {
    counter: 0,
    sequence: [],
    next_to_validate: 0,
    is_off: true,
    is_playing_sequence: false,
    is_strict_mode: false,
    MAX_NUM_SEQUENCE: 20,
    colors:  ['blue','red','green', 'yellow']
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

async function onStartClick(){
    //flashes counter led
    var result = await flashCounterLed();
    console.log(result);
    //starts sequence
    playSequence();
}

async function playSequence(){
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

function setupColorsOnClick(){
    var color_blocks = document.querySelectorAll('.color-blocks');

    color_blocks.forEach((color) => {
        color.onclick = function() {onClickColor(color.id)};
    });

    function onClickColor(color_id){
        console.log(color_id);
    }
}

function displaySequence() {
    SIMON_GAME.is_playing_sequence = true;

    return new Promise(resolve => {
        let in_out = 0;
        SIMON_GAME.sequence.map(function (color, index) {

            setTimeout(() => {
                document.getElementById(color).classList.add(color+'-light');
            }, 1000);

            setTimeout(() => {
                document.getElementById(color).classList.remove(color+'-light');
                if(index === SIMON_GAME.sequence.length -1){
                             resolve('sequence done');
                }
            }, 2000);

            // setTimeout(() => {
            //     if(in_out === 0){
            //         document.getElementById(color).classList.add(color+'-light');
            //         in_out++;
            //         index--;
            //         //resolve('sequence done');
            //     }else if (in_out === 1) {t
            //         document.getElementById(color).classList.remove(color+'-light');
            //         in_out = 0;
            //     }
            //     if(index === SIMON_GAME.sequence.length -1 && in_out == 1){
            //         //run entire sequence
            //         resolve('sequence done');
            //     }   
            // }, 1000);
        });
    });
}

function getNextColorRand(){
    const randIndex= Math.floor(Math.random() * Math.floor(4));
    return SIMON_GAME.colors[randIndex];
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

function flashCounterLed() {
    //add remove class
    function addLed(){ counter_txt.classList.add('led-off');}
    function removeLed(){ counter_txt.classList.remove('led-off'); }

    //array with flashing sequence
    let flashingArray = 
        [addLed, removeLed, addLed, removeLed,addLed, removeLed];

    //switch between add and remove functions with timers
    //javascript does not keep running unitl resolve returned
    return new Promise(resolve => {
        flashingArray.map(function (fun, index) {
            setTimeout(() => {
                fun();
                if( index === 5) {
                    resolve('flashing done');
                }
            }, 500 + index * 500);
        });
    });
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