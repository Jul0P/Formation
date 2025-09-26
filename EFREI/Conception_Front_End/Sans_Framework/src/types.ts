export interface TMDBResponse<T> {
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
    media_type?: 'movie' | 'tv' | 'person';
}

export interface GenreMap {
    [key: number]: string;
}