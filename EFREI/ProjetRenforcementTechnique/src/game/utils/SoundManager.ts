export class SoundManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();

    async preloadSounds(): Promise<void> {
        const soundAssets = [
            { name: 'hit', url: '/sounds/hit.mp3' },
            { name: 'game-over', url: '/sounds/game-over.mp3' }
        ];

        await Promise.all(
            soundAssets.map(asset => this.loadSound(asset.name, asset.url))
        );
    }

    private loadSound(name: string, url: string): Promise<void> {
        return new Promise((resolve) => {
            const audio = new Audio(url);

            audio.oncanplaythrough = () => {
                this.sounds.set(name, audio);
                resolve();
            };

            audio.onerror = () => {
                console.log(`Échec du chargement du son : ${name} (${url})`);
                resolve(); // On résout quand même pour ne pas bloquer le chargement
            };

            audio.load();
        });
    }

    play(soundName: string, volume: number = 0.5): void {
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play().catch(error => {
                console.log(`Impossible de jouer le son : ${soundName} (${error})`);
            });
        }
    }
}