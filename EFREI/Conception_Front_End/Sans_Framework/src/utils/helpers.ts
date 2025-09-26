import type { GenreMap } from '../types';

export function getImageUrl(path: string | null | undefined, size: string = 'w500'): string {
    if (!path) return 'https://via.placeholder.com/500x750/333/fff?text=Pas+d\'image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function truncateText(text: string | undefined, maxLength: number = 150): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function getYear(dateString: string | undefined): string {
    if (!dateString) return '';
    return new Date(dateString).getFullYear().toString();
}

export function getGenreName(genreId: number): string {
    const genres: GenreMap = {
        28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie',
        80: 'Crime', 99: 'Documentaire', 18: 'Drame', 10751: 'Familial',
        14: 'Fantasy', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique',
        9648: 'Mystère', 10749: 'Romance', 878: 'Science-fiction',
        10770: 'Téléfilm', 53: 'Thriller', 10752: 'Guerre', 37: 'Western',
        10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News',
        10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap',
        10767: 'Talk', 10768: 'War & Politics'
    };
    return genres[genreId] || 'Divers';
}