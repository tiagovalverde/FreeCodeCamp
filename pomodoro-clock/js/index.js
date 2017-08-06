$(document).ready(function() {
  

 //sliders effects
 var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
      $(this).next(value).html(this.value);

     //console.log($(this).attr('id'));
     if($(this).attr('id') === 'sliderSession'){
      		
      		$('#countdown_display .minutes').html(this.value);
     }

      
    });
  });
};

rangeSlider();

//


 // Click events
 //$('#btn-play').click(function(){
 //	console.log($('.range-slider__value').first().text());
 	

 //});


/*
document.querySelector('#btn-play').addEventListener('click', function () {
       
});

document.querySelector('#btn-pause').addEventListener('click', function () {

});

document.querySelector('#btn-reset').addEventListener('click', function () {

});

*/

//every time there is a change in seconds element
$(".seconds").on('DOMSubtreeModified', function () {
    //check if finished the countdown
    if($(this).html() === '0' && $('.minutes').html() === '0'){

    	if($('#countdown_title').html() === 'Session'){
    		//starts the break countdown
    		timer.stop();
    		var slider_timeSeconds = parseInt($('.range-slider__value').eq(1).text()) * 60 ; 
            timer.start({precision: 'seconds',countdown: true, startValues: {seconds: 10}});
            $('#countdown_title').html('Break');
            test();
            startCircularCountdown(10);

    	}else{
    		//starts the Session countdown again
    		timer.stop();
    		var slider_timeSeconds = parseInt($('.range-slider__value').eq(0).text()) * 60 ; 

$('.circle_animation').css('stroke-dashoffset', initialOffset);
test();
            timer.start({precision: 'seconds',countdown: true, startValues: {seconds: 10}});
            $('#countdown_title').html('Session');
            startCircularCountdown(10);
    	}
    }
});


//easytimer call
var timer = new Timer();

$('.buttons #btn-play').click(function () {
	var slider_timeSeconds = parseInt($('.range-slider__value').first().text()) * 60 ; 
    timer.start({precision: 'seconds',countdown: true, startValues: {seconds: 10}});
    startCircularCountdown(10);
    disableSlider();
     flag_btnPressed = '';

     test();






});

$('.buttons #btn-pause').click(function () {
    timer.pause();
    pausedTime = time;
    flag_btnPressed = 'pause';
    i = time;
    console.log("pause pressed");
});

$('.buttons #btn-reset').click(function () {
    timer.stop();
    updateCounterPerSecond( $('.range-slider__value').first().text(), '00');
    enableSlider();
    flag_btnPressed = 'reset';
    i = time; //reset circular timer
});


timer.addEventListener('secondsUpdated', function (e) {
	updateCounterPerSecond( timer.getTimeValues().minutes, timer.getTimeValues().seconds);
});
    
timer.addEventListener('started', function (e) {
	 updateCounterPerSecond( timer.getTimeValues().minutes, timer.getTimeValues().seconds);
});


function test(){
	var bar = new ProgressBar.Circle(containerT, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 10000,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});
bar.animate(1.0);  // Number from 0.0 to 1.0
}

function disableSlider(){
	document.getElementById("sliderBreak").disabled = true;
    document.getElementById("sliderSession").disabled = true;
}

function enableSlider(){
	document.getElementById("sliderBreak").disabled = false;
    document.getElementById("sliderSession").disabled = false;
}

function updateCounterPerSecond( min, sec){
	 $('#countdown_display .minutes').html(min);
     $('#countdown_display .seconds').html(sec);
}


//circle animation
function resetCircularCountdown(){
	//$('.circle_animation').css('stroke-dashoffset', 440);
}

var flag_btnPressed = '';
var pausedTime;
var time;
var i;
var initialOffset = '440';

function startCircularCountdown(newTime){
	 time = newTime;

	i = 1;



	/* Need initial run as interval hasn't yet occured... */
	$('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));

	var interval = setInterval(function() {
			$('h2').text(i);
			if (i == time) {  

			    if(flag_btnPressed === '' || flag_btnPressed === 'reset'){
			    	clearInterval(interval);
			    	console.log("1111");
		            $('.circle_animation').css('stroke-dashoffset', initialOffset);
					return;
			    }else if(flag_btnPressed === 'pause'){
			    	console.log("AAAA");
			    	clearInterval(interval);
		            //$('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/pausedTime)));
					return;
			    }
	            
	    }
	    $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
	    i++;  
	}, 1000);

}





// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/









});
