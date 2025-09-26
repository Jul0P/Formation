import type { TMDBResponse, MediaItem } from '../types';

const TMDB_BEARER_TOKEN: string = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const TMDB_BASE_URL: string = import.meta.env.VITE_TMDB_BASE_URL;

async function fetchFromTMDB(endpoint: string, page: number = 1): Promise<TMDBResponse<MediaItem> | null> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.set('language', 'fr-FR');
    url.searchParams.set('page', page.toString());
    
    try {
        const response: Response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
                'accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: TMDBResponse<MediaItem> = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur TMDB :', error);
        return null;
    }
}

export async function fetchPopularMovies(): Promise<TMDBResponse<MediaItem> | null> {
    return fetchFromTMDB('/movie/popular');
}

export async function fetchPopularTV(): Promise<TMDBResponse<MediaItem> | null> {
    return fetchFromTMDB('/tv/popular');
}

export async function fetchTrendingAll(): Promise<TMDBResponse<MediaItem> | null> {
    return fetchFromTMDB('/trending/all/day');
}

export async function fetchMoviesByGenre(genreId: number): Promise<TMDBResponse<MediaItem> | null> {
    return fetchFromTMDB(`/discover/movie?with_genres=${genreId}`);
}

export async function searchContent(query: string, page: number = 1): Promise<TMDBResponse<MediaItem> | null> {
    return fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}`, page);
}