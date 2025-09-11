import './styles/global.css';
import './styles/home.css';
import { loadHighScores } from './shared/storage';

const initHomePage = (): void => {
    const highscores = loadHighScores();
    const highscoresBody = document.getElementById('highscores-body');

    if (highscoresBody) {
        if (highscores.length > 0) {
            highscoresBody.innerHTML = highscores
                .map((score, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${score.score}</td>
                    </tr>
                `)
                .join(''); // Join pour convertir le tableau en chaîne de caractères et éviter les virgules
        } else {
            highscoresBody.innerHTML = `
                <tr>
                    <td colspan="2" style="text-align: center; color: var(--text-dim);">
                        Aucun score enregistré
                    </td>
                </tr>
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', initHomePage);