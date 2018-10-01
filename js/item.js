//change what item is selected in the inventory
function itemSelection(inventoryNumber){
    let itemId;
    switch (inventoryNumber) {
        case 1:
        itemId = 1;
            break;
        case 2:
        itemId= 2;
            break;
        case 3:
        itemId= 2;
            break;
        case 4:
        itemId= 2;
            break;
        case 5:
        itemId= 2;
            break;
        case 6:
        itemId= 2;
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

}