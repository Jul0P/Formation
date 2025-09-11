import type { IGameState } from "../types";
import { GameConfig } from "../../config/GameConfig";

export class GameState implements IGameState {
    public score: number = 0;
    public lives: number = GameConfig.MAX_LIVES;
    public playerPosition: number = 2;
    public isPlaying: boolean = false;
    public arrows: Map<string, any> = new Map();
    public isCubeGames: boolean = false;
    public isMathGames: boolean = false;
    public isFlappyGames: boolean = false;

    reset(): void {
        this.score = 0;
        this.lives = GameConfig.MAX_LIVES;
        this.playerPosition = 2;
        this.isPlaying = false;
        this.arrows.clear();
        this.isCubeGames = false;
        this.isMathGames = false;
        this.isFlappyGames = false;
    }
}