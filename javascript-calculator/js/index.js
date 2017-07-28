$(document).ready(function() {
  
  var input = ""; //used everytime one btn is pressed
  var result = ""; //used when pressed equals
  var history = ""; //historic of entire operation
  var MAX_LENGTH = 9; //max digits allowed in screen
  
  //click event adding chars to string
  $('button').click(function(){
    //value of button pressed
    input = $(this).attr("value");
    
    //check if max reached
    if( result.length < MAX_LENGTH ){
      
      //check if is digit
      if(!isNaN(input)){
        concResult(input);
        concHistory(input);

        //conc digit in history 
      }else if(input === "."){
        console.log("dot");
        //check if dot already in result
         checkDotExists();
          //yes does nothing & exit
          //no adds result and history & exit     


      }else if(input === "/" || input === "x" || input === "+" || input === "-"){
        console.log("artithmetic sign");
        //set result to the sign only
        //add sign to history


      }else if(input === "="){
        console.log("equal sign");
        //execute calculation
        //show result in result
        //show result after history


      }else if(input === "ac"){ 
        console.log("clear all");
        reset_all();
        
      }else if(input === "ce"){ 
        console.log("celar input");
        //result reset only, save history
      }
    
    }else{
      console.log("max reached");
      
      result = "0";
      history = "LIMIT REACHED";
      setResult(result);
      setHistory(history);
    }
     
      
  });

  function checkDotExists(){
    //looks for dot in result
    if(result.indexOf(".") < 0){
      result += input;
      setResult(result);
    }
  }

  function concHistory(newInput){
    history += newInput;
    setHistory(history);


  }

  function concResult(newInput){
    result += newInput;
    setResult(result);
  }
  
  function reset_all(){
    input = "";
    result = "0";
    history = "0";
    setResult(result);
    setHistory(history);
  }


  function  setResult(newResult){
    $('.result > p').text(newResult);
  }

  function setHistory(newHistory){
    $('.history > p').text(newHistory);
  }


});