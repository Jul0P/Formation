import { GameState } from '../../core/GameState';
import { ArrowManager } from './ArrowManager';
import { GameConfig } from '../../../config/GameConfig';
import type { Direction } from '../../types';
import { saveHighScore } from '../../../shared/storage';
import { SoundManager } from '../../utils/SoundManager';

export class DodgeGame {
    public state: GameState;
    private gridElement: HTMLElement | null;
    private gameArea: HTMLElement | null;
    private arrowManager: ArrowManager;
    private soundManager: SoundManager;
    private scoreInterval?: number;
    private spawnInterval?: number;
    
    
    constructor() {
        this.state = new GameState();
        this.gridElement = document.getElementById('dodge-grid');
        this.gameArea = document.getElementById('game1');
        this.soundManager = new SoundManager();
        
        if (!this.gridElement || !this.gameArea) {
            throw new Error('Éléments DOM requis non trouvés');
        }
        
        this.arrowManager = new ArrowManager(this.gameArea, this.gridElement);
        
        this.init();
    }
    
    private async init(): Promise<void> {
        try {
            await this.soundManager.preloadSounds();
            console.log('Sons chargés avec succès');
        } catch (error) {
            console.log(`Erreur lors du chargement des sons: ${error}`);
        }

        this.createGrid();
        this.setupEventListeners();
        this.updateUI();
        this.showStart(); // Afficher le popup de démarrage
    }
    
    private createGrid(): void {
        if (!this.gridElement) return;
        
        this.gridElement.innerHTML = '';

        for (let i = 0; i < GameConfig.GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.position = String(i); // Stocker la position dans un data-attribute
            
            if (i === this.state.playerPosition) {
                const player = document.createElement('div');
                player.className = 'player-square';
                player.id = 'player';
                cell.appendChild(player);
            }
            
            this.gridElement.appendChild(cell);
        }
    }
    
    private setupEventListeners(): void {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // Optional chaining
        document.getElementById('restart-button')?.addEventListener('click', () => {
            this.hideGameOver();
            this.reset();
            this.showStart();
        });
        
        document.getElementById('home-button')?.addEventListener('click', () => {
            window.location.href = '/';
        });
    }
    
    private handleKeyPress(event: KeyboardEvent): void {
        const { key } = event; // Destructuration
        const startPopover = document.getElementById('start-popover');
        
        if (startPopover && !startPopover.classList.contains('hidden')) {
            this.hideStart();
            this.start();
            return;
        }
        
        if (!this.state.isPlaying) return;
        
        switch(key) {
            case 'ArrowLeft':
                event.preventDefault(); // Empêcher le scroll de la page lors de l'appui sur les flèches
                this.movePlayer(-1 as Direction);
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.movePlayer(1 as Direction);
                break;
        }
    }
    
    private movePlayer(direction: Direction): void {
        const newPosition = this.state.playerPosition + direction;
        
        if (newPosition >= 0 && newPosition < GameConfig.GRID_SIZE) {
            const cells = this.gridElement?.querySelectorAll('.cell');
            const player = document.getElementById('player');
            
            if (cells && player) {
                this.state.playerPosition = newPosition;
                cells[newPosition].appendChild(player);
            }
        }
    }
    
    private checkCollision(lane: number): boolean {
        if (lane === this.state.playerPosition) {
            this.handleHit();
            return true;
        }
        return false;
    }
    
    public handleHit(): void {
        this.state.lives--;
        this.updateUI();

        this.soundManager.play('hit', 0.5);
        
        const player = document.getElementById('player');
        if (player) {
            player.style.background = '#ff0000';
            setTimeout(() => {
                if (player) player.style.background = '#00ff88';
            }, 200);
        }
        
        if (this.state.lives <= 0) {
            this.gameOver();
        }
    }

    public start(): void {
        this.state.isPlaying = true;
        
        this.scoreInterval = setInterval(() => {
            if (this.state.isPlaying) {
                this.state.score++;
                this.updateUI();
                
                if (this.state.score >= GameConfig.SPLIT_SCORE && !this.state.isSplit) {
                    this.triggerSplit();
                }
                if (this.state.score >= GameConfig.CUBE_START_SCORE && !this.cubeGame) {
                this.triggerCubeGame();
                }
                
                if (this.state.score >= GameConfig.THIRD_GAME_SCORE && !this.state.isThreeGames) {
                    this.triggerThirdGame();
                }
                
                if (this.state.score >= GameConfig.FOURTH_GAME_SCORE && !this.state.isFourGames) {
                    this.triggerFourthGame();
                }
            }
        }, 1000);
        
        this.spawnInterval = setInterval(() => {
            if (this.state.isPlaying) {
                const lane = Math.floor(Math.random() * GameConfig.GRID_SIZE);
                this.arrowManager.spawn(lane, this.checkCollision.bind(this));
            }
        }, GameConfig.ARROW_SPAWN_RATE);
    }
    
    private triggerSplit(): void {
        this.state.isSplit = true;
        this.arrowManager.clear();
        
        const game1 = document.getElementById('game1');
        const game2 = document.getElementById('game2');
        
        if (game1 && game2) {
            game1.classList.remove('full');
            game1.classList.add('split');
            
            setTimeout(() => {
                this.arrowManager.clear();
                
                game2.classList.add('active', 'split');
              
            }, 250);
        }
    }
    
    private triggerThirdGame(): void {
        this.state.isThreeGames = true;
        this.arrowManager.clear();
        
        const gameContainer = document.querySelector('.game-container');
        const game3 = document.getElementById('game3');
        
        if (gameContainer && game3) {
            gameContainer.setAttribute('data-games', '3');
            
            setTimeout(() => {
                this.arrowManager.clear();
                game3.classList.add('active');
                if (this.cubeGame) {
                    this.cubeGame.resetPosition();
                    this.cubeGame.clearZones()
                }  

                if (!mathGame) {
                mathGame = new MathGame(this);
                mathGame.start();
            }
            }, 250);
        }
    }
    
    private triggerFourthGame(): void {
        this.state.isFourGames = true;
        this.arrowManager.clear();
        
        const gameContainer = document.querySelector('.game-container');
        const game4 = document.getElementById('game4');
        
        if (gameContainer && game4) {
            gameContainer.setAttribute('data-games', '4');
            
            setTimeout(() => {
                this.arrowManager.clear();
                game4.classList.add('active');
            }, 250);
        }
    }
    
    public updateUI(): void {
        const score = document.getElementById('score');
        const lives = document.getElementById('lives');

        if (score) score.textContent = `${this.state.score}`;
        if (lives) lives.textContent = `${this.state.lives}`;
    }
    
    private gameOver(): void {
        this.state.isPlaying = false;
        
        if (this.scoreInterval) clearInterval(this.scoreInterval);
        if (this.spawnInterval) clearInterval(this.spawnInterval);
        
        this.arrowManager.clear();

        this.soundManager.play("game-over", 0.8);
        
        saveHighScore(this.state.score);
        
        const popup = document.getElementById('game-over-popover');
        const finalScore = document.getElementById('final-score');

        if (popup && finalScore) {
            finalScore.textContent = `${this.state.score}`;
            popup.classList.remove('hidden');
        }

        if (this.cubeGame) {
            this.cubeGame.stop()
            this.cubeGame = undefined
        }
        this.stopall()
    }
    
    private showStart(): void {
        document.getElementById('start-popover')?.classList.remove('hidden');
    }
    
    private hideStart(): void {
        document.getElementById('start-popover')?.classList.add('hidden');
    }
    
    private hideGameOver(): void {
        document.getElementById('game-over-popover')?.classList.add('hidden');
    }
    
    private reset(): void {
        this.state.reset();
        
        const gameContainer = document.querySelector('.game-container');
        const games = ['game1', 'game2', 'game3', 'game4'];
        
        if (gameContainer) {
            gameContainer.removeAttribute('data-games');
        }
        if (this.cubeGame) {
            this.cubeGame.stop()
            this.cubeGame = undefined
        }
        
        games.forEach((id, index) => {
            const game = document.getElementById(id);
            if (game) {
                if (index === 0) {
                    game.classList.add('full');
                    game.classList.remove('split');
                } else {
                    game.classList.remove('active', 'split');
                }
            }
        });
        
        this.createGrid();
        this.updateUI();
    }

    private triggerCubeGame(): void {
        try {
            this.cubeGame = new CubeGame(this.state, this)
            this.cubeGame.start();
        } catch {
        }
    }

    public stopall(): void {
            this.state.isPlaying = false;
            if (this.scoreInterval) clearInterval(this.scoreInterval);
            if (this.spawnInterval) clearInterval(this.spawnInterval);
            this.arrowManager.clear();

            if (this.cubeGame){
                this.cubeGame.stop()
                this.cubeGame.clearZones()
                this.cubeGame = undefined
            }

            if (mathGame) {
            mathGame.endgame(); 
            mathGame = undefined;
              }
            this.updateUI();
    }
}