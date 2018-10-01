//change what item is selected in the inventory
function itemSelection(inventoryNumber){
    let itemId;
    switch (inventoryNumber) {
        case "1":
        itemId = 1;
            break;
        case "2":
        itemId= 2;
            break;
        case "3":
        itemId= 3;
            break;
        case "4":
        itemId= 4;
            break;
        case "5":
        itemId= 5;
            break;
        case "6":
        itemId= 6;
            break;
    
        default:
        itemId= 0;
        break;
    }
    displayItem(itemId);
}
function displayItem(itemId){
    let textprompt = document.getElementById("textprompt");
    let text ="";
    textprompt.innerHTML = itemId+ text;
}

//inspect the item 
//on inspect button
function inspect(itemId){

}

//inventory switch between char selections
//takes in array
function updateInventory(itemIds){

}

//add the item to the character inventory
function addToInventory(itemId){
    console.log("entered addToInventory");
    //put picture in the inventory
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:50%;height:25%">';

    var cellsRow = document.getElementById("inventoryCells");
    var cells = cellsRow.getElementsByTagName("td");
    var emptyCell = cells[0];

    for(let i = 0; i < cells; i++){
        console.log("entered for loop")
        if(cells[i].innerHTML == ''){
            console.log("found empty cell");
            emptyCell = cells[i];
            break;
        }
    }

    emptyCell.innerHTML = picElt;
    console.log("should have added picture to inventory");
}

