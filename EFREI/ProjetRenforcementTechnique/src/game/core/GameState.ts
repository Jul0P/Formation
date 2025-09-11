import type { IGameState } from "../types";
import { GameConfig } from "../../config/GameConfig";

export class GameState implements IGameState {
    public score: number = 0;
    public lives: number = GameConfig.MAX_LIVES;
    public playerPosition: number = 2;
    public isPlaying: boolean = false;
    public arrows: Map<string, any> = new Map();
    public isSplit: boolean = false;
    public isThreeGames: boolean = false;
    public isFourGames: boolean = false;

    reset(): void {
        this.score = 0;
        this.lives = GameConfig.MAX_LIVES;
        this.playerPosition = 2;
        this.isPlaying = false;
        this.arrows.clear();
        this.isSplit = false;
        this.isThreeGames = false;
        this.isFourGames = false;
    }
}