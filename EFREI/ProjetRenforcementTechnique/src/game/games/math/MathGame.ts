import type { DodgeGame } from "../dodge/DodgeGame";

export class MathGame {
    private question = document.getElementById("question") as HTMLParagraphElement | null
    private calcTimer = document.getElementById("calcTimer") as HTMLParagraphElement |null
    private validate_button = document.getElementById("Validez") as HTMLButtonElement | null
    private response_input = document.getElementById('response') as HTMLInputElement | null

    private answer : number = 0;
    private timerId : number = 0;
    private readonly timelimit = 10;
    private dodgegame : DodgeGame;

    constructor(dodgegame :DodgeGame){
        this.dodgegame = dodgegame
    }

    public start(): void {
        this.generateQuestion();
        this.enableInputs();
    }


    private generateQuestion(): void {
        const a = Math.floor(Math.random() * 10 ) + 1;
        const b = Math.floor(Math.random() * 10 ) + 1;
        const operation = ["+", "-", "*"] as const;
        const op = operation[Math.floor(Math.random() * operation.length)];

        switch (op) {
            case "+" : this.answer = a + b; break
            case "-" : this.answer = a - b; break
            case "*" : this.answer = a * b; break 
        }
        if (this.question) this.question.textContent = `${a} ${op} ${b} = ?`
        if (this.response_input){
            this.response_input.value = ""
            this.response_input.focus()
        }
        this.startTimer();
    }

    private startTimer(): void {
        let timeleft = this.timelimit;
        if (this.calcTimer) this.calcTimer.textContent = `Temps restant : ${timeleft}`

        clearInterval(this.timerId);
        this.timerId = window.setInterval(() => {
            timeleft--;
            if (this.calcTimer) this.calcTimer.textContent = `Temps restant : ${timeleft}`;
            if (timeleft <= 0){
                clearInterval(this.timerId);
                this.endgame();
            }
        }, 1000)
    }
    private enableInputs(): void {
        if (this.validate_button){
            this.validate_button.disabled = false;
            this.validate_button.onclick = () => {
                const useranswer = this.response_input ? Number(this.response_input.value) : NaN;
                if (isNaN(useranswer) || useranswer !== this.answer){
                    this.endgame()
                }else {
                    clearInterval(this.timerId);
                    this.generateQuestion();
                    this.enableInputs()
                }
            }
        }
        if (this.response_input) this.response_input.disabled = false;
    }
    public endgame(): void {
        clearInterval(this.timerId);
        if (this.validate_button) this.validate_button.disabled = true
        if (this.response_input) this.response_input.disabled = true
        this.dodgegame.stopall()
    }
}