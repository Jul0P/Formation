import { GameState } from "../../core/GameState";
import type { DodgeGame } from "../dodge/DodgeGame";

export class CubeGame {
    private gameArea : HTMLElement
    private player : HTMLDivElement
    private activeZones: { element: HTMLDivElement; timer: number }[] = [];
    private posx = 285
    private posy = 185
    private step = 10;
    private zonespawner : number = 0
    private state : GameState
    private dodgegame : DodgeGame;

    constructor(state : GameState, dodgegame : DodgeGame) {
        this.state = state;
        this.dodgegame = dodgegame;
        const area = document.getElementById('cube-area')
        const playerC = document.getElementById("player_cube")

        if (!area || !(playerC instanceof HTMLDivElement)) throw new Error('erreur element manquant')

        this.gameArea = area;
        this.player = playerC;
    }

    public start() : void {
        this.gameArea.classList.add('active');
        this.posx = this.gameArea.clientWidth / 2;
        this.posy = this.gameArea.clientHeight / 2;
        this.player.style.left = `${this.posx}px`;
        this.player.style.top = `${this.posy}px`;

        document.addEventListener('keydown', this.movement)
        this.zonespawner = setInterval(() => this.spawnZone(), 5000)
    }

     private movement = (e: KeyboardEvent): void => {
  switch (e.key.toLowerCase()) {
    case "z": this.posy = Math.max(0, this.posy - this.step); break;
    case "s": this.posy = Math.min(this.gameArea.clientHeight - 30, this.posy + this.step); break;
    case "q": this.posx = Math.max(0, this.posx - this.step); break;
    case "d": this.posx = Math.min(this.gameArea.clientWidth - 30, this.posx + this.step); break;
  }

  this.player.style.top = `${this.posy}px`;
  this.player.style.left = `${this.posx}px`;

  const playerRect = this.player.getBoundingClientRect();

  this.activeZones.forEach(({ element, timer }, index) => {
    const zoneRect = element.getBoundingClientRect();
    const overlap = !(
      zoneRect.right < playerRect.left ||
      zoneRect.left > playerRect.right ||
      zoneRect.bottom < playerRect.top ||
      zoneRect.top > playerRect.bottom
    );

    if (overlap) {
      clearInterval(timer);
      if (this.gameArea.contains(element)) {
        this.gameArea.removeChild(element);
        this.activeZones.splice(index, 1);
        this.state.score += 10;
        const scoreC = document.getElementById('score');
        if (scoreC) scoreC.textContent = `Score : ${this.state.score}`;
      }
    }
  });
};


private spawnZone(): void {
    const zone = document.createElement("div");
    zone.classList.add("zone");

        const x = Math.floor(Math.random() * (this.gameArea.clientWidth - 50 ));
        const y = Math.floor(Math.random() * (this.gameArea.clientHeight - 50));
        zone.style.left = `${x}px`;
        zone.style.top = `${y}px`

        let countdown = 10;
        zone.textContent = countdown.toString();
        this.gameArea.appendChild(zone)

        const timer = setInterval(() => {
            countdown--;
            zone.textContent = countdown.toString();

            if (countdown <= 0){
                clearInterval(timer)
                if (this.gameArea.contains(zone)) {
                this.gameArea.removeChild(zone); 
                this.dodgegame.stopall()
                this.clearZones()
            }
            }
        }, 1000)
        this.activeZones.push({element : zone , timer})
}

    public stop() : void {
        clearInterval(this.zonespawner);
        this.activeZones.forEach(({ timer }) => clearInterval (timer));
        this.activeZones.length = 0;
        document.removeEventListener('keydown', this.movement);
        this.gameArea.classList.remove('active')
    }

    public resetPosition(): void {
    this.posx = this.gameArea.clientWidth / 2;
    this.posy = this.gameArea.clientHeight / 2;
    this.player.style.left = `${this.posx}px`;
    this.player.style.top = `${this.posy}px`;
    }

    public clearZones(): void {
        this.activeZones.forEach(({ timer, element }) => {
        clearInterval(timer); 
        if (this.gameArea.contains(element)) {
            this.gameArea.removeChild(element);
        }
        });
        this.activeZones.length = 0;
}






}

