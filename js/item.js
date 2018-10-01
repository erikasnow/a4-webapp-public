//can call a function in an other .js file if that js file is declared before the one prior

//change what item is selected in the inventory
function itemSelection(inventoryNumber){
    console.log("inventory selection")
    let itemId;
    let inventory =0;
    switch (inventoryNumber) {
        case "1":
        itemId = window.inventory[1];
        console.log(window.inventory[1])
        inventory =1;
            break;
        case "2":
        itemId= window.inventory[2];
        inventory =2;
            break;
        case "3":
        itemId= window.inventory[3];
        inventory =3;
            break;
        case "4":
        itemId= window.inventory[4];
        inventory =4;
            break;
        case "5":
        itemId=window.inventory[5];
        inventory =5;
            break;
        case "6":
        itemId= window.inventory[6];
        inventory =6;
            break;
    
        default:
        itemId= 0;
        break;
    }
    window.inventoryActive2= window.inventoryActive;
    window.inventoryActive = itemId;
    displayItem(itemId, inventoryNumber);
}
function displayItem(itemId, inventoryNumber){
    let textprompt = document.getElementById("textprompt");
    let text = "";
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:30%;height:40%">'
    if(window.inspected[inventoryNumber].inspected ==false){
        textprompt.innerHTML =picElt+  '<button onclick="inspect(\''+itemId+'\'' + inventoryNumber+'\')">inspect</button>'+"???"+ text ;
    } else {
        textprompt.innerHTML =picElt+  '<button onclick="inspect(\''+itemId+'\'' + inventoryNumber+'\')">inspect</button>'+itemId+ text ;
    }
}
function updateDisplayItem(itemId){
    let textprompt = document.getElementById("textprompt");
    let text = "";
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:30%;height:40%">'
      
    textprompt.innerHTML =picElt+  '<button onclick="inspect(\''+itemId+'\')">inspect</button>'+itemId+ text ;
}

//inspect the item 
//on inspect button
function inspect(itemId, inventoryNumber){
    window.inventory[inventoryNumber].inspected = true;
    console.log(itemId)
    updateDisplayItem(itemId);
}

//inventory switch between char selections
//takes in array
function updateInventory(){
    console.log("Update Inventory")
    for(let i = 1; i >=window.inventory.length; i++ ){
        inspect(window.inventory[i]);
    }
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

