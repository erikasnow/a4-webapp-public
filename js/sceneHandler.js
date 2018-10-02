function changeScreen(newScreen, removeInventory) {
    newScreen = 'screens/' + newScreen + '.html';
    $('#initScreen').load(newScreen);

    if(removeInventory){
        clearInventory();
    }
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
}