
if(!localStorage.getItem("offlineGA")){
  localStorage.setItem("offlineGA","[]");
}

document.addEventListener("deviceready", function() {
if(navigator.onLine || !("onLine" in navigator)){
  userOnline();
}else{
  ;
}
  }

var _ogaq = {
push : function(arr){
    if(navigator.onLine || !("onLine" in navigator)){ // if online or if browser doesn't support onLine/offLine detection.
      var stored = JSON.parse(localStorage.getItem("offlineGA"));
    if (stored.length == 1){
      //_gaq.push(arr);COMMENTED OUT FOR TESTING
      console.log(arr);
    }
    else if(stored.length > 1){
    stored.push(arr);
    localStorage.setItem("offlineGA", JSON.stringify(stored));
    userOnline();
       }
    }
    else{
     stored.push(arr);
     localStorage.setItem("offlineGA", JSON.stringify(stored));
    }
}
};

function userOnline(){ 
  console.log('Online');
  var stored = JSON.parse(localStorage.getItem("offlineGA"));
  delayedLoop();
}
function delayedLoop(){
    var stored = (JSON.parse(localStorage.getItem("offlineGA")));
    var length = stored.length;
    if(length < 9 && length > 0)
    {
       for(var i = 0; i <= length; i++){
        //send the last few
 console.log("less then 9: "+ stored[i]);
 //_gaq.push(stored[i]); COMMENTED OUT FOR TESTING
 removeSentGA();
}
    }
    else if(length > 0){
  for(var i = 0; i <= 9; i++){
  //once 9 are sent wait and send the next 9
 console.log("more then 9: "+ stored[i]);
 //_gaq.push(stored[i]); COMMENTED OUT FOR TESTING
      if(i == 9){
      removeSentGA();
      }  
  }
}
}
function removeSentGA(){
  //removes the already sent analytics from the json then runs loop again after delay.
    var stored = (JSON.parse(localStorage.getItem("offlineGA")));
    stored.splice(0,10);
    localStorage.setItem("offlineGA", JSON.stringify(stored)); 
    setTimeout(delayedLoop, 3000);   
}

//ATTACH TO CLICK EVENTS
function someClick(Category,Action, Label, Value) {
  _ogaq.push(["_trackEvent",Category, Action, Label, Value]);
}
//ALTERNATIVE METHOD FOR DELAYED SENDING TO GOOGLE
/*function delayedLoop(){
var stored = (JSON.parse(localStorage.getItem("offlineGA")));
var length = stored.length;
 var i = 0;
    var intId = setInterval(addGA,1000);
    function addGA(){
        if (i < length) {
            i++;
            console.log(stored[i]);
        } else {
            clearInterval(intId);
            removeSentGA(length, stored);  
        }
    }
}
function removeSentGA(length, stored){
    console.log("before splice: " + stored);
    stored.splice(0,length);
    localStorage.setItem("offlineGA", JSON.stringify(stored));
    console.log("after splice: " + stored);
}*/