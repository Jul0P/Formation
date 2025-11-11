import { Anime, IAnimeModel } from '@/models/Anime';
import { IAnime } from '@/types/index';

class AnimeService {
  constructor() {}

  public async create(animeData: IAnime): Promise<IAnimeModel> {
    const anime = new Anime(animeData);
    return await anime.save();
  }

  public async findById(id: string): Promise<IAnimeModel | null> {
    return await Anime.findById(id);
  }

  public async list(page: number = 1, limit: number = 10): Promise<IAnimeModel[]> {
    const skip = (page - 1) * limit;
    return await Anime.find().skip(skip).limit(limit).sort({ createdAt: -1 });
  }

  public async search(keyword?: string, genre?: string, status?: string, minRating?: number): Promise<IAnimeModel[]> {
    const query: any = {};

    // Recherche par mot-clé sur title et description (insensible à la casse)
    if (keyword && keyword.trim() !== '') {
      query.$or = [{ title: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }];
    }

    // Filtre par genre
    if (genre && genre.trim() !== '') {
      query.genre = { $regex: genre, $options: 'i' };
    }

    // Filtre par status (ignore les valeurs vides ou "Tous")
    if (status && status.trim() !== '' && status !== 'Tous') {
      query.status = status;
    }

    // Filtre par rating minimum
    if (minRating !== undefined && !isNaN(minRating)) {
      query.rating = { $gte: minRating }; // $gte : greater than or equal
    }

    return await Anime.find(query).sort({ rating: -1 });
  }

  public async count(): Promise<number> {
    return await Anime.countDocuments();
  }
}

export default AnimeService;
