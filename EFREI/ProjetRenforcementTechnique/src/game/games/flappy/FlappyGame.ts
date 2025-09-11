import type { DodgeGame } from "../dodge/DodgeGame";

export class FlappyGame {
    private gameArea: HTMLElement;
    private ball: HTMLDivElement;
    private dodgeGame: DodgeGame;
    
    private ballY: number = 0;
    private ballVelocity: number = 0;
    private isSpacePressed: boolean = false;
    private animationId?: number;
    private obstacleSpawnTimer?: number;
    private hitObstacles: Set<HTMLDivElement> = new Set();
    
    private readonly GRAVITY = 0.8;
    private readonly LIFT_FORCE = -12;
    private readonly BALL_SIZE = 20;
    private readonly OBSTACLE_WIDTH = 30;
    private readonly OBSTACLE_SPEED = 2;
    private readonly SPAWN_INTERVAL = 2000;
    
    private obstacles: { element: HTMLDivElement; x: number; isTop: boolean }[] = [];

    constructor(dodgeGame: DodgeGame) {
        this.dodgeGame = dodgeGame;
        
        const area = document.getElementById('flappy-area');
        const ballElement = document.getElementById('flappy-ball');
        
        if (!area || !(ballElement instanceof HTMLDivElement)) {
            throw new Error('Éléments FlappyGame manquants dans le DOM');
        }
        
        this.gameArea = area;
        this.ball = ballElement;
    }

    public start(): void {
        this.gameArea.classList.add('active');
        
        this.ballY = this.gameArea.clientHeight / 2;
        this.ballVelocity = 0;
        this.updateBallPosition();
        
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        
        this.gameLoop();
        
        this.obstacleSpawnTimer = setInterval(() => {
            this.spawnObstacle();
        }, this.SPAWN_INTERVAL);
    }

    private handleKeyDown = (e: KeyboardEvent): void => {
        if (e.code === 'Space') {
            e.preventDefault();
            this.isSpacePressed = true;
        }
    }

    private handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === 'Space') {
            e.preventDefault();
            this.isSpacePressed = false;
        }
    }

    private gameLoop = (): void => {
        this.updatePhysics();
        this.updateBallPosition();
        this.updateObstacles();
        this.checkCollisions();
        
        this.animationId = requestAnimationFrame(this.gameLoop);
    }

    private updatePhysics(): void {
        if (this.isSpacePressed) {
            this.ballVelocity = this.LIFT_FORCE;
        } else {
            this.ballVelocity += this.GRAVITY;
        }
        
        this.ballY += this.ballVelocity;
        
        if (this.ballY < 0) {
            this.ballY = 0;
            this.ballVelocity = 0;
        }
        
        if (this.ballY > this.gameArea.clientHeight - this.BALL_SIZE) {
            this.ballY = this.gameArea.clientHeight - this.BALL_SIZE;
            this.ballVelocity = 0;
        }
    }

    private updateBallPosition(): void {
        this.ball.style.top = `${this.ballY}px`;
    }

    private spawnObstacle(): void {
        const isTop = Math.random() < 0.5;
        const obstacle = document.createElement('div');
        obstacle.className = 'flappy-obstacle';
        
        const height = this.gameArea.clientHeight / 2;
        obstacle.style.width = `${this.OBSTACLE_WIDTH}px`;
        obstacle.style.height = `${height}px`;
        obstacle.style.left = `${this.gameArea.clientWidth}px`;
        
        if (isTop) {
            obstacle.style.top = '0px';
            obstacle.classList.add('obstacle-top');
        } else {
            obstacle.style.bottom = '0px';
            obstacle.classList.add('obstacle-bottom');
        }
        
        this.gameArea.appendChild(obstacle);
        
        this.obstacles.push({
            element: obstacle,
            x: this.gameArea.clientWidth,
            isTop
        });
    }

    private updateObstacles(): void {
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.x -= this.OBSTACLE_SPEED;
            obstacle.element.style.left = `${obstacle.x}px`;
            
            if (obstacle.x + this.OBSTACLE_WIDTH < 0) {
                this.hitObstacles.delete(obstacle.element);
                obstacle.element.remove();
                return false;
            }
            
            return true;
        });
    }

    private checkCollisions(): void {
        const ballRect = {
            x: 50,
            y: this.ballY,
            width: this.BALL_SIZE,
            height: this.BALL_SIZE
        };

        this.obstacles.forEach(obstacle => {
            const obstacleRect = {
                x: obstacle.x,
                y: obstacle.isTop ? 0 : this.gameArea.clientHeight / 2,
                width: this.OBSTACLE_WIDTH,
                height: this.gameArea.clientHeight / 2
            };

            const isColliding = ballRect.x < obstacleRect.x + obstacleRect.width &&
                ballRect.x + ballRect.width > obstacleRect.x &&
                ballRect.y < obstacleRect.y + obstacleRect.height &&
                ballRect.y + ballRect.height > obstacleRect.y;
                
            if (isColliding && !this.hitObstacles.has(obstacle.element)) {
                this.hitObstacles.add(obstacle.element);
                this.dodgeGame.handleHit();
            }
        });
    }

    public stop(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = undefined;
        }
        
        if (this.obstacleSpawnTimer) {
            clearInterval(this.obstacleSpawnTimer);
            this.obstacleSpawnTimer = undefined;
        }
        
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        
        this.clearObstacles();
        
        this.gameArea.classList.remove('active');
        
        this.ballY = 0;
        this.ballVelocity = 0;
        this.isSpacePressed = false;
        this.hitObstacles.clear();
    }

    public clearObstacles(): void {
        this.obstacles.forEach(obstacle => {
            obstacle.element.remove();
        });
        this.obstacles = [];
        this.hitObstacles.clear();
    }

    public resetPosition(): void {
        this.ballY = this.gameArea.clientHeight / 2;
        this.ballVelocity = 0;
        this.hitObstacles.clear();
        this.updateBallPosition();
    }
}