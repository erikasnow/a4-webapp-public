//can call a function in an other .js file if that js file is declared before the one prior

//change what item is selected in the inventory
function itemSelection(inventoryNumber) {
    let itemId;
    let inventory = 0;
    let description ="";
    switch (inventoryNumber) {
        case "1":
            itemId = window.inventory[1].id;
            inventory = 1;
            description = window.inventory[1].description
            window.activeSlot = 1;
            break;
        case "2":
            itemId = window.inventory[2].id;
            inventory = 2;
            description = window.inventory[2].description
            window.activeSlot = 2;
            break;
        case "3":
            itemId = window.inventory[3].id;
            inventory = 3;
            description = window.inventory[3].description
            window.activeSlot = 3;
            break;
        case "4":
            itemId = window.inventory[4].id;
            inventory = 4;
            description = window.inventory[4].description
            window.activeSlot = 4;
            break;
        case "5":
            itemId = window.inventory[5].id;
            inventory = 5;
            description = window.inventory[5].description
            break;
        case "6":
            itemId = window.inventory[6].id;
            inventory = 6;
            description = window.inventory[6].description
            window.activeSlot = 6;
            break;
        default:
            itemId = 0;
            description ='';
            break;
    }
    console.log("ITEM"+ itemId+description)
    window.inventoryActive2 = window.inventoryActive;
    window.inventoryActive = itemId;
    if (itemId != "") {
        displayItem(itemId, parseInt(inventory, 10), description);
    }
}
function displayItem(itemId, inventoryNumber, description ="") {
    let textprompt = document.getElementById("objectInfo");
    let text = description;
    var picID = stripName(itemId)
    var pic = "assets/items/" + picID + '.png';
    var picElt = '<img src="' + pic + '" style="width:100%;height:80%">'
    var inspectD;
    if(window.inventory[inventoryNumber].id != undefined){
         inspectD = { id: window.inventory[inventoryNumber].id, num: inventoryNumber };
    } else {
         inspectD = { id: itemId, num: inventoryNumber };

    }
    let picprompt = document.getElementById("objectPicture");
    picprompt.innerHTML = '<div style="text-align:center;">' + picElt + '<button  id = "inspectButton">inspect</button> </div>';
    if (window.inventory[inventoryNumber].inspected == false) {
        textprompt.innerHTML = "???";
    } else {
        textprompt.innerHTML = text;
    }
    var inspectbutton = document.getElementById("inspectButton");
    inspectbutton.addEventListener('click', function () {
        inspect(inspectD);
    });
}
function updateDisplayItem(itemId, inventoryNumber, description = "") {
    let textprompt = document.getElementById("objectInfo");
    let picprompt = document.getElementById("objectPicture");
    let text = description;
    var picID;
    console.log("invenum"+ inventoryNumber+ window.inventory[inventoryNumber])
    if(window.inventory[inventoryNumber].id != undefined){
         picID = stripName( window.inventory[inventoryNumber].id)
    } else {
         picID = stripName(itemId);
    }
    var pic = "assets/items/" + picID + '.png';
    var picElt = '<img src="' + pic + '" style="width:100%;height:80%">'
    let inspectD;
    if(window.inventory[inventoryNumber].id == undefined){
        inspectD = { id:  itemId, num: inventoryNumber };
    } else {
        inspectD = { id:  window.inventory[inventoryNumber].id, num: inventoryNumber };
    }
    picprompt.innerHTML = '<div style="text-align:center;">' + picElt + '<button  id = "inspectButton">inspect</button> </div>';
    textprompt.innerHTML = text;
    var inspectbutton = document.getElementById("inspectButton");
    inspectbutton.addEventListener('click', function () {
        console.log("FROM UPDATE")
        inspect(inspectD);
    });
}

function stripName(itemId) {
    //console.log("ID"+itemId +typeof itemId)
    return itemId.replace(/[0-9]/g, '');
}

//inspect the item 
//on inspect button
function inspect(inspected) {
    let itemId = inspected.id;
    let inventoryNumber = inspected.num;
    var id = itemId
    console.log("IMVE"+ window.inventory[inventoryNumber].id)
    if(window.inventory[inventoryNumber].inspected==false){
        getInspectResultId(window.character, id);
        var result = (window.inspectResult)
        console.log("result1" + result+ typeof result)
        if(result != undefined) {
            window.inventory[inventoryNumber].inspected = true;
            window.inventory[inventoryNumber].id = result.use_id;
            window.inventory[inventoryNumber].description = result.description
        }
        updateDisplayItem(itemId, inventoryNumber, result.description);    
    } else {
        //console.log("INSPECT2")
        getInspectResultId2( window.inventory[inventoryNumber].id);
        var result = (window.inspectResult)
        console.log("result2" + result+ typeof result)
        if(result != undefined) {
            window.inventory[inventoryNumber].inspected = true;
            window.inventory[inventoryNumber].id = result.use_id;
            window.inventory[inventoryNumber].description = result.description
        }
        updateDisplayItem( itemId, inventoryNumber, result.description);
    }
}

//inventory switch between char selections
//takes in array
function updateInventory() {
    console.log("Update Inventory")
    for (let i = 1; i >= window.inventory.length; i++) {
        inspect(window.inventory[i]);
    }
}

//add the item to the character inventory
function addToInventory(itemId) {
    //console.log("entered addToInventory");
    //put picture in the inventory
    var picID = stripName(itemId)
    var pic = "assets/items/" + picID + '.png';
    var picElt = '<img src="' + pic + '" style="width:50%;height:25%">';

    var cellsRow = document.getElementById("inventoryCells");
    var cells = cellsRow.getElementsByTagName("td");
    var emptyCell = cells[0];
    window.inventoryActive=itemId
    for (let i = 0; i < cells.length; i++) {
        //console.log("entered for loop")
        if (cells[i].innerHTML == '') {
            //console.log("found empty cell");
            emptyCell = cells[i];
            var num = i + 1;
            window.inventory[num].id = itemId;
            //console.log("add"+ window.inventory[num].id)
            break;
        }
    }

    emptyCell.innerHTML = picElt;
    //console.log("should have added picture to inventory");
}

function deleteFromInventory() {
    var cellsRow = document.getElementById("inventoryCells");
    var cells = cellsRow.getElementsByTagName("td");
    cells[window.activeSlot-1].innerHTML= "";
    var prompt = document.getElementById("objectInfo");
    prompt.innerHTML="";
    var picprompt = document.getElementById("objectPicture");
    picprompt.innerHTML= "";
    //switch to scene 1
    window.inventoryActive = "";
    window.inventoryActive2 = "";
    window.inventory[window.activeSlot] = {id:"", inspected:false};

}
