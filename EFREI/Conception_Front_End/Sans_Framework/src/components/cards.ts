import type { MediaItem } from '../types';
import { getImageUrl, getYear, getGenreName } from '../utils/helpers';

export function createCard(item: MediaItem): string {
    const title: string = item.title ?? item.name ?? 'Titre inconnu';
    const year: string = getYear(item.release_date ?? item.first_air_date);
    const poster: string = getImageUrl(item.backdrop_path);
    const genres: string = item.genre_ids?.slice(0, 3).map(id => getGenreName(id)).join(' • ') ?? 'Divers';
    
    return `
        <div class="card" onclick="openModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <div class="card-image-container">
                <img src="${poster}" alt="${title}" loading="lazy" class="card-base-image">
                <img src="${poster}" alt="${title}" loading="lazy" class="card-hover-image">
            </div>
            <div class="card-overlay">
                <div class="card-content">
                    <div>
                        <div class="card-title">${title}</div>
                        <div class="card-meta">
                            <span>${year}</span>
                        </div>
                        <div class="card-info">${genres}</div>
                    </div>
                    <div class="card-actions">
                        <div class="card-actions-left">
                            <button class="card-button play">
                                <i class="fas fa-play"></i>
                            </button>
                            <button class="card-button">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="card-button">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <button class="card-button">
                                <i class="fas fa-thumbs-down"></i>
                            </button>
                        </div>
                        <button class="card-button dropdown" onclick="event.stopPropagation(); openModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function createTop10Card(item: MediaItem, index: number): string {
    const title: string = item.title ?? item.name ?? 'Titre inconnu';
    const poster: string = getImageUrl(item.poster_path);
    
    return `
        <div class="top10-card" onclick="openModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <div class="top10-number">${index + 1}</div>
            <img src="${poster}" alt="${title}" class="top10-poster" loading="lazy">
        </div>
    `;
}