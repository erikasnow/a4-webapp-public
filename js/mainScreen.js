//How to button
function howto() {
    //switch text on screen (popup maybe?)
}

//on start button
//not clickable until character is selected
function start() {
    //switch to scene 1
    window.inventoryActive = "";
    window.inventoryActive2 = "";
    window.inventory[1]= {id:"", inspected:false};
    window.inventory[2]= {id:"", inspected:false};
    window.inventory[3]= {id:"", inspected:false};
    window.inventory[4]= {id:"", inspected:false};
    window.inventory[5]= {id:"", inspected:false};
    window.inventory[6]= {id:"", inspected:false};
    window.timerTime=null;
    
}
window.onload=function() {
    var audio = document.getElementById("audio");
    audio.volume = 0.1;
    
}

//Start playing music if we want any
function musicMainScreen() {
    //Get the file and play it
}


