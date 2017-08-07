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
		    
		    if($(this).attr('id') === 'sliderSession'){
		      	$('#countdown_display .minutes').html(this.value);
		    }
	    });
	 });
};

rangeSlider();


	//Verify if countdown finished
	$(".seconds").on('DOMSubtreeModified', function () {
	    
	    if($(this).html() === '0' && $('.minutes').html() === '0'){

	    	if($('#countdown_title').html() === 'Session'){
	    		//starts the break countdown
	    		timer.stop();
	    		var slider_timeSeconds = parseInt($('.range-slider__value').eq(1).text()) * 60 ; 
	            timer.start({precision: 'seconds',countdown: true, startValues: {seconds: slider_timeSeconds}});
	            playNotification();
	            $('#countdown_title').html('Break');
	            bar.destroy();
	            test(slider_timeSeconds * 1000);
	            $('svg').eq(1).prependTo('#containerT');

	    	}else{
	    		//starts the Session countdown again
	    		timer.stop();
	    		var slider_timeSeconds = parseInt($('.range-slider__value').eq(0).text()) * 60 ; 
	            timer.start({precision: 'seconds',countdown: true, startValues: {seconds: slider_timeSeconds}});
	            playNotification();
	            $('#countdown_title').html('Session');
	            bar.destroy();
	            test(slider_timeSeconds * 1000);
	            $('svg').eq(1).prependTo('#containerT');
	    	}
	    }
	});


	//easytimer call
	var timer = new Timer();
	$('#btn-play').click(function () {
		
		playNotification();

		var slider_timeSeconds = parseInt($('.range-slider__value').first().text()) * 60 ; 
	    timer.start({precision: 'seconds',countdown: true, startValues: {seconds: slider_timeSeconds}});
	    disableSlider();
	    
	    $('#staticSVG').hide();
	    test(slider_timeSeconds * 1000); //miliseconds
	    $('svg').eq(1).prependTo('#containerT'); //move svg to be the first child element
	});



	$('#btn-reset').click(function () {
	    timer.stop();
	    updateCounterPerSecond( $('.range-slider__value').first().text(), '00');
	    enableSlider();
	    bar.destroy(); 
	    $('#staticSVG').show();
	    $('#countdown_title').html('Session');

	});


	timer.addEventListener('secondsUpdated', function (e) {
		updateCounterPerSecond( timer.getTimeValues().minutes, timer.getTimeValues().seconds);
	});
	    
	timer.addEventListener('started', function (e) {
		 updateCounterPerSecond( timer.getTimeValues().minutes, timer.getTimeValues().seconds);
	});



	var bar;
	function test(miliseconds){
	    bar = new ProgressBar.Circle(containerT, {
			strokeWidth: 6,
			easing: 'linear',
			duration: miliseconds,
			color: '#0ac624',
			trailColor: '#eee',
			trailWidth: 4,
			svgStyle: null
		});

		// Animate to 100% and back to 0%
		function loop(cb) {
		  bar.animate(1.0, function() {
		    bar.animate(0.0);
		  }); 
		}
		// Loop the animation forever
		loop();
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

	function playNotification(){
		var audio = new Audio('sounds/stuffed-and-dropped.mp3');
		audio.play();
	}


}); // document ready end
