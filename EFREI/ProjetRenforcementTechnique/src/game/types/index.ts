export interface IGameState {
    score: number;
    lives: number;
    playerPosition: number;
    isPlaying: boolean;
    isCubeGames: boolean;
    isMathGames: boolean;
    isFlappyGames: boolean;
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
    CUBE_GAME_SCORE: number;
    MATH_GAME_SCORE: number;
    FLAPPY_GAME_SCORE: number;
    MAX_LIVES: number;
}

export type GameArea = 'game1' | 'game2' | 'game3' | 'game4';
export type Direction = -1 | 1;
