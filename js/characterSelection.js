//clickable for each charcter
function chooseCharacter(character){
    console.log("character"+character)
    window.character = character;
    console.log(window.character)
    updateInventory();
    displayCharacterDescription(character)
}


//don't know if this will be different from choose character
function switchCharacter(){

}

//put character information in text above
function displayCharacterDescription(character){
    let textprompt = document.getElementById("objectInfo");
    let text;
    switch (character) {
        case "Ally":
           text =  " Has a cat"
            break;
        case "Erika":
            text= " A strong willed woman"
            break;
        case "Joan":
            text =" Very thinker"
            break;
        case "Krysta":
           text= " Very Observant"
            break;
        default:
            break;
    }
    console.log(text)
    textprompt.innerHTML = character+ text;
}

