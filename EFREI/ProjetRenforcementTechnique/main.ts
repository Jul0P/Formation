const chrono = document.getElementById("chrono") as HTMLParagraphElement | null;
const score = document.getElementById("score") as HTMLParagraphElement | null;

let StartTime = 0;
let TimeInterval;
let minute;
let seconde;
let current_score = 0;

let Lbutton = document.getElementById("launch_button") as HTMLButtonElement | null;
    if (Lbutton){
            Lbutton.addEventListener("click", function(){

            StartTime = Date.now();
            current_score = 0;

            TimeInterval = setInterval(function(){
            let elapsed = Date.now() - StartTime;
            minute = Math.floor(elapsed / 60000);
            seconde = Math.floor((elapsed % 60000)/1000);

            const formated = `${minute.toString().padStart( 2 , '0')} : ${seconde.toString().padStart(2 , '0')}`
            
                if (chrono) {
                    chrono.textContent = `${minute} minute et ${seconde} seconde`  }
                    
                    
                current_score += 1

                if (score){
                    score.textContent = `Score : ${current_score}`
                }
                }

                
     
            ,1000)})}
