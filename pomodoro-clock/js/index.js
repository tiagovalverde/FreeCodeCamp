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


$(".seconds").on('DOMSubtreeModified', function () {
    //alert("Span HTML is now " + $(this).html());
    if($(this).html() === '0' && $('.minutes').html() === '0'){
    	console.log($('.seconds').html());
    	console.log("Finished"); //start next countdown
    	var slider_timeSeconds = parseInt($('.range-slider__value').second().text()) * 60 ; 
    	timer.start({precision: 'seconds',countdown: true, startValues: {seconds: slider_timeSeconds}});
    }
});


//easytimer call
var timer = new Timer();


$('.buttons #btn-play').click(function () {
	var slider_timeSeconds = parseInt($('.range-slider__value').first().text()) * 60 ; 
	console.log(slider_timeSeconds);
    timer.start({precision: 'seconds',countdown: true, startValues: {seconds: slider_timeSeconds}});
});

$('.buttons #btn-pause').click(function () {
    timer.pause();
});
$('.buttons #btn-reset').click(function () {
    timer.stop();
    $('#countdown_display .minutes').html($('.range-slider__value').first().text());
     $('#countdown_display .seconds').html("00");
});


timer.addEventListener('secondsUpdated', function (e) {
	 $('#countdown_display .minutes').html(timer.getTimeValues().minutes);
     $('#countdown_display .seconds').html(timer.getTimeValues().seconds);

});
    
timer.addEventListener('started', function (e) {
    	 $('#countdown_display .minutes').html(timer.getTimeValues().minutes);
     $('#countdown_display .seconds').html(timer.getTimeValues().seconds);
});





});


// Without JQuery
// With JQuery
// Without JQuery
