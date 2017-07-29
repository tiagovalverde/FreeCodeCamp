$(document).ready(function() {
  
  var input = ""; //used everytime one btn is pressed
  var result = "0"; //used when pressed equals
  var history = "0"; //historic of entire operation
  var MAX_LENGTH = 9; //max digits allowed in screen
  var MAX_LENGTH_HISTORY = 22;
  
  //click event adding chars to string
  $('button').click(function(){
    //value of button pressed
    input = $(this).attr("value");
    
    //check if max reached
    if( result.length < MAX_LENGTH || history.length <  MAX_LENGTH_HISTORY  ){
      
      //check if is digit
      if(!isNaN(input)){

          if(checkZero()){
            //set
            setResult(input);
            setHistory(input);
          }else if(checkSign()){
             setResult(input);
             concHistory(input);
          }else{
            concResult(input);
            concHistory(input);
          }
          
          

      //check if is dot
      }else if(input === "."){
        //check if dot already in result
         checkDotExists();


      }else if(input === "/" || input === "x" || input === "+" || input === "-"){

        // check is sign already in result
        if(!checkSign()){
                  //set result to the sign only
        //add sign to history
          concHistory(input);
          setResult(input);
        }else if(checkSignHistory()){
          setResult(input);
        }
        

      }else if(input === "="){
        console.log("equal sign");
        //execute calculation
        //show result in result
        //show result after history


      }else if(input === "ac"){ 
        console.log("clear all");
        reset_all();
        
      }else if(input === "ce"){ 
        console.log("ce input");
        //result reset only, save history
        
        history = history.substring(0, history.length - result.length);
        setHistory(history);
        setResult("0");
      }
    
    }else{
      console.log("max reached");

      result = "0";
      history = "LIMIT REACHED";
      setResult(result);
      setHistory(history);
    }
     
      
  });


  //check if result only have a operation sign
  function checkSign(){
    return result.length === 1 && (result === "/" || result === "x" || result === "+" || result === "-");
  }

  //check if last character of history is a sign
  function checkSignHistory(){
     var lastChar = history.charAt(history.length-1);
     console.log(lastChar);
     return lastChar === "/" || lastChar === "x" || lastChar === "+" ||lastChar === "-";
  }

  //check if str result only contains "0"
  function checkZero(){
    return result.length === 1 && result.charAt(0) === "0";
  }


  function checkDotExists(){
    //looks for dot in result
    //yes does nothing & exit
    //no adds result and history & exit  
    if(result.indexOf(".") < 0){
            concResult(input);
            concHistory(input);
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
    setResult("0");
    setHistory("0");
  }


  function  setResult(newResult){
    result = newResult;
    $('.result > p').text(newResult);
  }

  function setHistory(newHistory){
    history = newHistory; 
    $('.history > p').text(newHistory);
  }


});