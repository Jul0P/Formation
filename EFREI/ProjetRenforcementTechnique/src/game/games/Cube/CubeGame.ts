import type { DodgeGame } from "../dodge/DodgeGame";

export class CubeGame {
    private gameArea : HTMLElement
    private player : HTMLDivElement
    private activeZones: { element: HTMLDivElement; timer: number }[] = [];
    private posx = 285
    private posy = 185
    private step = 15;
    private zonespawner: number = 0;
    private dodgegame: DodgeGame;
    private keys: Set<string> = new Set();
    private movementInterval?: number;

    constructor(dodgegame: DodgeGame) {
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

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        
        this.movementInterval = setInterval(() => this.updateMovement(), 50);
        this.zonespawner = setInterval(() => this.spawnZone(), 5000)
    }

    private handleKeyDown = (e: KeyboardEvent): void => {
        const key = e.key.toLowerCase();
        if (['z', 's', 'q', 'd'].includes(key)) {
            this.keys.add(key);
        }
    }

    private handleKeyUp = (e: KeyboardEvent): void => {
        const key = e.key.toLowerCase();
        this.keys.delete(key);
    }

    private updateMovement(): void {
        let newX = this.posx;
        let newY = this.posy;

        if (this.keys.has('z')) newY = Math.max(0, newY - this.step);
        if (this.keys.has('s')) newY = Math.min(this.gameArea.clientHeight - 30, newY + this.step);
        if (this.keys.has('q')) newX = Math.max(0, newX - this.step);
        if (this.keys.has('d')) newX = Math.min(this.gameArea.clientWidth - 30, newX + this.step);

        this.posx = newX;
        this.posy = newY;
        this.player.style.top = `${this.posy}px`;
        this.player.style.left = `${this.posx}px`;

        this.checkZoneCollisions();
    }

    private checkZoneCollisions(): void {
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
                }
            }
        });
    }

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
                clearInterval(timer);
                if (this.gameArea.contains(zone)) {
                    this.gameArea.removeChild(zone);
                }
                const zoneIndex = this.activeZones.findIndex(activeZone => activeZone.element === zone);
                if (zoneIndex !== -1) {
                    this.activeZones.splice(zoneIndex, 1);
                }
                this.dodgegame.handleHit();
            }
        }, 1000)
        this.activeZones.push({element : zone , timer})
    }

    public stop() : void {
        clearInterval(this.zonespawner);
        if (this.movementInterval) clearInterval(this.movementInterval);
        
        this.clearZones();
        
        this.keys.clear();
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
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
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.activeZones.length = 0;
        
        const remainingZones = this.gameArea.querySelectorAll('.zone');
        remainingZones.forEach(zone => {
            if (zone.parentNode) {
                zone.parentNode.removeChild(zone);
            }
        });
    }
}