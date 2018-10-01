//change what item is selected in the inventory
function itemSelection(inventoryNumber){
    console.log("inventory selection")
    let itemId;
    switch (inventoryNumber) {
        case "1":
        itemId = window.inventory[1];
        console.log(window.inventory[1])
            break;
        case "2":
        itemId= window.inventory[2];
            break;
        case "3":
        itemId= window.inventory[3];
            break;
        case "4":
        itemId= window.inventory[4];
            break;
        case "5":
        itemId=window.inventory[5];
            break;
        case "6":
        itemId= window.inventory[6];
            break;
    
        default:
        itemId= 0;
        break;
    }    console.log(inventoryNumber+typeof inventoryNumber)

    displayItem(itemId);
}
function displayItem(itemId){
    let textprompt = document.getElementById("textprompt");
    let text = "";
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:30%;height:40%">'
      
    textprompt.innerHTML =picElt+  '<button onclick="inspect(\''+itemId+'\')">inspect</button>'+itemId+ text ;
}

//inspect the item 
//on inspect button
function inspect(itemId){
    console.log(itemId)
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

    for(let i = 0; i < cells.length; i++){
        console.log("entered for loop")
        if(cells[i].innerHTML == ''){
            console.log("found empty cell");
            emptyCell = cells[i];
            var num = i +1;
            window.inventory[num] = itemId;
            break;
        }
    }

    emptyCell.innerHTML = picElt;
    console.log("should have added picture to inventory");
}

