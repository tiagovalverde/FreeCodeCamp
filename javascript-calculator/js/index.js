$(document).ready(function() {
  
  var input = ""; //used everytime a button is pressed
  var result = "0"; //used when pressed equals
  var history = "0"; //historic of entire operation
  var answer = "";
  var MAX_LENGTH = 9; //max digits allowed in screen
  var MAX_LENGTH_HISTORY = 18;
  
  //click event adding chars to string
  $('button').click(function(){
    //value of button pressed
    input = $(this).attr("value");
    //console.log(result.length < MAX_LENGTH);
    //check if max reached
    if(result.length <= MAX_LENGTH){
      
      //check if is digit
      if(!isNaN(input)){

          if(answer === ""){
              isDigit(input);  
          }else if(!isNaN(answer)){
              var curr_input = input;
              reset_all();
              setResult(curr_input);
              setHistory(curr_input);
          }
          
      //check if is dot
      }else if(input === "."){
        //check if dot already in result
         checkDotExists();


      }else if(input === "/" || input === "*" || input === "+" || input === "-"){

        if(checkZero()){ //avoids sign to be the first input in chain
          return;
        }

        if(answer===""){
            // check is sign already in result
            if(!checkSign()){
                      //set result to the sign only
            //add sign to history
              concHistory(input);
              setResult(input);
            }else if(checkSignHistory()){
              //setResult(input);
            }

          }else if (!isNaN(answer)){//
              setHistory(answer + input);
              setResult(input);
              answer = "";
          }



        
        

      }else if(input === "="){
          
            //console.log(history);
            try{
              answer = eval(history);
              //console.log(answer);
              answer = Math.round(answer * 100) / 100;

              if(answer.toString().length > MAX_LENGTH || 
                (history + "=" + answer).length >  MAX_LENGTH_HISTORY  ){
                  //reset limit
                  limitReached();
                  console.log("AAAAA");
                  return;
              }

              setResult(answer +"");
              concHistory("=" + answer);
              //console.log("ANS: " + answer);
            }catch(err){
              console.log(err.message + ": " + "Incomplete arithmetic operation.");
            }
        
        
        //execute calculation
        //show result in result
        //show result after history
      }else if(input === "ac"){       
        reset_all();
      }else if(input === "ce"){ 
        
        //result reset only, save history
        if(history.length - result.length !== 0){
          history = history.substring(0, history.length - result.length);
        }else{
          history = "0";
        }
        
        setHistory(history);
        setResult("0");
      }
    
    }else{
      limitReached();
    }
     
      
  });


  //helper functions

  //resets all fields if limit reached
  function limitReached(){
      result = "0";
      history = "LIMIT REACHED";
      answer = "";
      setResult(result);
      setHistory(history);
  }


  //process if digit is clicked
  function isDigit(newDigit){
      if(checkZero()){
        //set
        setResult(newDigit);
        setHistory(newDigit);
      }else if(checkSign()){
         setResult(newDigit);
         concHistory(newDigit);
      }else{
        concResult(newDigit);
        concHistory(newDigit);
      }
  }

  //check if result field only have a operation sign
  function checkSign(){
    return result.length === 1 && (result === "/" || result === "*" || result === "+" || result === "-");
  }

  //check if last character of history is a sign
  function checkSignHistory(){
     var lastChar = history.charAt(history.length-1);
     return lastChar === "/" || lastChar === "*" || lastChar === "+" ||lastChar === "-";
  }

  //check if result field only contains "0"
  function checkZero(){
    return result.length === 1 && result.charAt(0) === "0";
  }

  //check if dot was already inserted
  function checkDotExists(){
    //looks for dot in result
    //yes does nothing & exit
    //no adds result and history & exit  
    if(result.indexOf(".") < 0){
            concResult(input);
            concHistory(input);
    }
  }

  //concatenates the new input to history field
  function concHistory(newInput){
    history += newInput;
    setHistory(history);
  }
  
  //concatenates the new input to result field 
  function concResult(newInput){
       result += newInput;
       setResult(result);
   
  }
  
  //reset all fields - AC button
  function reset_all(){
    input = "";
    result = "0";
    history = "0";
    answer = "";
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