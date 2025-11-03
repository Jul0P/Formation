export interface IAnime {
  title: string;
  description: string;
  genre: string;
  episodes: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  rating?: number;
  year?: number;
}
