interface HighScore {
    score: number;
}

export const saveHighScore = (score: number): void => {
    const scores = loadHighScores();
    scores.push({ score });
    scores.sort((a, b) => b.score - a.score); // Tri décroissant
    localStorage.setItem('multitask-highscores', JSON.stringify(scores.slice(0, 10))); // Garder seulement les 10 meilleurs
};

export const loadHighScores = (): HighScore[] => {
    const data = localStorage.getItem('multitask-highscores');
    return data ? JSON.parse(data) : [];
};