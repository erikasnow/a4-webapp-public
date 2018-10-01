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
           text =  ": Has a spoiled cat, Bambi, who ocassionally helps Ally if she's so inclined."
            break;
        case "Erika":
            text= ": The only girl on her wrestling team. Strong, but not the brightest."
            break;
        case "Joan":
            text =": Very bright. Currently studying to be an engineer."
            break;
        case "Krysta":
           text= ": Great observational skills. Aspiring to be the next Sherlock Holmes."
            break;
        default:
            break;
    }
    console.log(text)
    textprompt.innerHTML = character+ text;
}

