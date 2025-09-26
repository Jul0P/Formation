import type { MediaItem } from '../types';
import { createCard, createTop10Card } from '../components/cards';
import { getImageUrl, truncateText } from '../utils/helpers';

const $ = (id: string) => document.getElementById(id);

export function populateSection(sectionId: string, items: MediaItem[]): void {
    const section: HTMLElement | null = $(sectionId);
    if (!section || !items) return;
    
    section.innerHTML = items.map(item => createCard(item)).join('');
}

export function populateTop10(containerId: string, items: MediaItem[]): void {
    const container: HTMLElement | null = $(containerId);
    if (!container || !items) return;
    
    container.innerHTML = items.slice(0, 10).map((item, index) => 
        createTop10Card(item, index)
    ).join('');
}

export function updateHeroBanner(item: MediaItem, setCurrentMedia?: (media: MediaItem) => void): void {
    const title: string = item.title || item.name || '';
    const backdrop: string = getImageUrl(item.backdrop_path, 'original');
    const overview: string = item.overview || '';
    
    const heroTitle: HTMLElement | null = $('hero-title');
    const heroDescription: HTMLElement | null = $('hero-description');
    const heroImage: HTMLImageElement | null = $('hero-image') as HTMLImageElement;
    
    if (heroTitle) heroTitle.textContent = title;
    if (heroDescription) heroDescription.textContent = truncateText(overview, 200);
    if (heroImage) heroImage.src = backdrop;
    
    if (setCurrentMedia) setCurrentMedia(item);
}

export function loadFallbackContent(): void {
    const demoContent: MediaItem[] = Array.from({length: 10}, (_, i) => ({
        id: i + 1,
        title: `Contenu ${i + 1}`,
        poster_path: undefined,
        backdrop_path: undefined,
        overview: 'Description du contenu de démonstration...',
        vote_average: 8.5,
        release_date: '2023-01-01'
    }));
    
    populateSection('trending-row', demoContent);
    populateSection('movies-row', demoContent);
}