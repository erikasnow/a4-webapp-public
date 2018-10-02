var timerO;
function startTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var timerD = document.getElementById("timerDisplay");
        if(window.timerTime == null){
            timerD.innerText= minutes+":"+seconds;
        }
        window.timer = minutes*60+seconds;
        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    timer();
    timerO = setInterval(timer, 1000);
}

function timerStop(){
     window.timerTime = window.timer;
     console.log(window.timerTime)
     var timerD = document.getElementById("timerDisplay");
    timerD.innerText="";
    clearInterval(timerO)
}