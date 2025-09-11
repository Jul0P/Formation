export interface IGameState {
    score: number;
    lives: number;
    playerPosition: number;
    isPlaying: boolean;
    isSplit: boolean;
    isThreeGames: boolean;
    isFourGames: boolean;
    reset(): void;
}

export interface IArrow {
    lane: number;
    element: HTMLElement;
    fromTop: boolean;
    stop?: () => void;
}

export interface IGameConfig {
    GRID_SIZE: number;
    ARROW_SPAWN_RATE: number;
    ARROW_SPEED: number;
    SPLIT_SCORE: number;
    THIRD_GAME_SCORE: number;
    FOURTH_GAME_SCORE: number;
    MAX_LIVES: number;
    CUBE_START_SCORE: number;
}

export type GameArea = 'game1' | 'game2' | 'game3' | 'game4';
export type Direction = -1 | 1;
