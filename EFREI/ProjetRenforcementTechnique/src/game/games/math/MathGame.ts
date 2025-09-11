import type { DodgeGame } from "../dodge/DodgeGame";

export class MathGame {
    private question = document.getElementById("question") as HTMLParagraphElement | null
    private calcTimer = document.getElementById("calcTimer") as HTMLParagraphElement |null
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
        
        // input focus
        setTimeout(() => {
            if (this.response_input) {
                this.response_input.focus();
            }
        }, 100);
    }

    private generateQuestion(): void {
        let a: number, b: number, op: string, result: number;
        
        do {
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * 9) + 1;
            const operations = ["+", "-", "*"] as const;
            op = operations[Math.floor(Math.random() * operations.length)];

            switch (op) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    // 
                    if (a >= b) {
                        result = a - b;
                    } else {
                        result = b - a;
                        [a, b] = [b, a];
                    }
                    break;
                case "*":
                    result = a * b;
                    break;
                default:
                    result = 10; // nouvelle iteration
            }
        } while (result > 9 || result < 0);

        this.answer = result;
        
        if (this.question) this.question.textContent = `${a} ${op} ${b} = ?`;
        this.resetInput();
        this.startTimer();
    }

    private resetInput(): void {
        if (this.response_input) {
            this.response_input.value = "";
            // micro-délai pour initialiser le focus
            setTimeout(() => {
                if (this.response_input) {
                    this.response_input.focus();
                }
            }, 10);
        }
    }

    private startTimer(): void {
        let timeleft = this.timelimit;
        if (this.calcTimer) this.calcTimer.textContent = `Temps: ${timeleft}s`

        clearInterval(this.timerId);
        this.timerId = window.setInterval(() => {
            timeleft--;
            if (this.calcTimer) this.calcTimer.textContent = `Temps: ${timeleft}s`;
            if (timeleft <= 0){
                clearInterval(this.timerId);
                this.dodgegame.handleHit();
                
                if (this.dodgegame.state.lives > 0) {
                    this.generateQuestion();
                }
            }
        }, 1000)
    }

    private enableInputs(): void {
        if (this.response_input) {
            this.response_input.disabled = false;
            
            this.response_input.addEventListener('keydown', (e) => {
                const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter'];
                
                const isDigit = /^[0-9]$/.test(e.key);
                
                if (!isDigit && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                    return;
                }
            });
            
            this.response_input.addEventListener('input', () => {
                const value = this.response_input?.value;
                if (value && value.length > 0) {
                    setTimeout(() => this.validateAnswer(), 100);
                }
            });

            this.response_input.addEventListener('paste', (e) => {
                e.preventDefault();
                const paste = e.clipboardData?.getData('text');
                if (paste && /^[0-9]+$/.test(paste)) {
                    this.response_input!.value = paste.slice(0, 2);
                    setTimeout(() => this.validateAnswer(), 100);
                }
            });
        }
    }

    private validateAnswer(): void {
        const userAnswer = this.response_input ? Number(this.response_input.value) : NaN;
        
        if (isNaN(userAnswer) || userAnswer !== this.answer) {
            this.dodgegame.handleHit();
            
            if (this.dodgegame.state.lives > 0) {
                this.generateQuestion();
            }
        } else {
            clearInterval(this.timerId);
            this.generateQuestion();
        }
    }

    public endgame(): void {
        clearInterval(this.timerId);
        
        if (this.response_input) {
            this.response_input.disabled = true;
            this.response_input.value = "";
            const newInput = this.response_input.cloneNode(true) as HTMLInputElement;
            this.response_input.parentNode?.replaceChild(newInput, this.response_input);
            this.response_input = newInput;
        }
        
        if (this.question) this.question.textContent = "";
        if (this.calcTimer) this.calcTimer.textContent = "";
    }
}