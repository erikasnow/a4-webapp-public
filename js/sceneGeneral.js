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
