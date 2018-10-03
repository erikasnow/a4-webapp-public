function changeScreen(newScreen, removeInventory) {
    newScreen = 'screens/' + newScreen + '.html';
    $('#initScreen').load(newScreen);

    if(removeInventory){
        clearInventory();
    }
}

function interaction(itemId, sceneId){
    //got to db to get interaction
    //run the functions in the db
}

function clearInventory() {
    var cellsRow = document.getElementById("inventoryCells");
    var cells = cellsRow.getElementsByTagName("td");

    for(let i = 0; i < cells.length; i++){
        console.log("entered for loop")
        cells[i].innerHTML = '';
    }
    var prompt = document.getElementById("objectInfo");
    prompt.innerHTML="";
    var picprompt = document.getElementById("objectPicture");
    picprompt.innerHTML= "";
    console.log("should have deleted all pictures from inventory");
    //switch to scene 1
    window.inventoryActive = "";
    window.inventoryActive2 = "";
    window.inventory[1]= {id:"", inspected:false};
    window.inventory[2]= {id:"", inspected:false};
    window.inventory[3]= {id:"", inspected:false};
    window.inventory[4]= {id:"", inspected:false};
    window.inventory[5]= {id:"", inspected:false};
    window.inventory[6]= {id:"", inspected:false};
}

//connect to server to get info about item
function itemclick(itemId){

}

//dissapear
function imageDisappear(imageId){
    document.getElementById(imageId).style.display = "none";
}

function imageAppear(imageName, xpos, ypos){

}

//movepos is a percentage, everything is done off of the bottom right corner
function imageMove(imageId, x, y){
    var image = document.getElementById(imageId);
    x = x + '%';
    image.style.right = x;
    y = y + '%';
    image.style.bottom = y;
}
