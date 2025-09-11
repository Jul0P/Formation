import './styles/global.css';
import './styles/game.css';
import { DodgeGame } from './game/games/dodge/DodgeGame';

const initGame = (): void => {
    try {
        const game = new DodgeGame();
        (window as any).dodgeGame = game;
        console.log('Jeu initialisé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du jeu :', error);
    }
};

document.addEventListener('DOMContentLoaded', initGame);