var chrono = document.getElementById("chrono");
var score = document.getElementById("score");
var StartTime = 0;
var TimeInterval;
var minute;
var seconde;
var current_score = 0;
var Lbutton = document.getElementById("launch_button");
if (Lbutton) {
    Lbutton.addEventListener("click", function () {
        StartTime = Date.now();
        current_score = 0;
        TimeInterval = setInterval(function () {
            var elapsed = Date.now() - StartTime;
            minute = Math.floor(elapsed / 60000);
            seconde = Math.floor((elapsed % 60000) / 1000);
            var formated = "".concat(minute.toString().padStart(2, '0'), " : ").concat(seconde.toString().padStart(2, '0'));
            if (chrono) {
                chrono.textContent = "".concat(minute, " minute et ").concat(seconde, " seconde");
            }
            current_score += 1;
            if (score) {
                score.textContent = "Score : ".concat(current_score);
            }
        }, 1000);
    });
}
