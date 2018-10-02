//can call a function in an other .js file if that js file is declared before the one prior

//change what item is selected in the inventory
function itemSelection(inventoryNumber){
    //console.log("inventory selection")
    let itemId;
    let inventory =0;
    switch (inventoryNumber) {
        case "1":
        itemId = window.inventory[1].id;
        //console.log(window.inventory[1])
        inventory =1;
            break;
        case "2":
        itemId= window.inventory[2].id;
        inventory =2;
            break;
        case "3":
        itemId= window.inventory[3].id;
        inventory =3;
            break;
        case "4":
        itemId= window.inventory[4].id;
        inventory =4;
            break;
        case "5":
        itemId=window.inventory[5].id;
        inventory =5;
            break;
        case "6":
        itemId= window.inventory[6].id;
        inventory =6;
            break;
    
        default:
        itemId= 0;
        break;
    }
    window.inventoryActive2= window.inventoryActive;
    window.inventoryActive = itemId;
    displayItem(itemId, parseInt(inventory,10));
}
function displayItem(itemId, inventoryNumber){
    //console.log("inspected"+itemId+ inventoryNumber +window.inventory[inventoryNumber].inspected)
    let textprompt = document.getElementById("objectInfo");
    let text = "";
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:100%;height:100%">'
    var inspectD ={id:itemId, num:inventoryNumber};
    let picprompt = document.getElementById("objectPicture");
    picprompt.innerHTML = picElt;

    //console.log("display" + inspectD.id + inspectD.num)
    if(window.inventory[inventoryNumber].inspected == false){
        textprompt.innerHTML =  '<button id = "inspectButton">inspect</button>'+"???"+ text ;
    } else {
        textprompt.innerHTML =  '<button id= "inspectButton">inspect</button>'+itemId+ text ;
    }
    var inspectbutton = document.getElementById("inspectButton");
    inspectbutton.addEventListener('click', function(){
        inspect(inspectD);
    });
}
function updateDisplayItem(itemId, inventoryNumber){
    let textprompt = document.getElementById("objectInfo");
    let picprompt = document.getElementById("objectPicture");
    let text = "";
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:100%;height:100%">'
    let inspectD ={id:itemId, num:inventoryNumber};
    //console.log("update display" + inspect)
    picprompt.innerHTML = picElt;
    textprompt.innerHTML =  '<button id = "inspectButton">inspect</button>'+itemId+ text ;
    var inspectbutton = document.getElementById("inspectButton");
    inspectbutton.addEventListener('click', function(){
        inspect(inspectD);
    });
}

//inspect the item 
//on inspect button
function inspect(inspected){
    //console.log("INSPECTED"+ inspected.id + inspected.num )
    let itemId = inspected.id;
    let inventoryNumber= inspected.num;
    //console.log("line "+itemId+ "   " +inventoryNumber + typeof inventoryNumber)
    window.inventory[inventoryNumber].inspected = true;
    updateDisplayItem(itemId, inventoryNumber);
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
    //console.log("entered addToInventory");
    //put picture in the inventory
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style="width:50%;height:25%">';

    var cellsRow = document.getElementById("inventoryCells");
    var cells = cellsRow.getElementsByTagName("td");
    var emptyCell = cells[0];

    for(let i = 0; i < cells.length; i++){
        //console.log("entered for loop")
        if(cells[i].innerHTML == ''){
            //console.log("found empty cell");
            emptyCell = cells[i];
            var num = i +1;
            window.inventory[num].id = itemId;
            //console.log("add"+ window.inventory[num].id)
            break;
        }
    }

    emptyCell.innerHTML = picElt;
    //console.log("should have added picture to inventory");
}

