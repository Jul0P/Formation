import AnimeService from '@/services/AnimeService';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class AnimeController {
  constructor(private animeService: AnimeService) {}

  /** POST /animes */
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const anime = await this.animeService.create(req.body);

      if (req.accepts('html')) {
        res.redirect('/animes');
      } else {
        res.status(201).json(anime);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  /** GET /animes/:id */
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const anime = await this.animeService.findById(req.params.id);

      if (!anime) {
        res.status(404).json({ error: 'Anime non trouvé' });
        return;
      }

      if (req.accepts('html')) {
        res.render('animes/show', { anime, title: anime.title });
      } else {
        res.json(anime);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  /** GET /animes */
  public list = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const animes = await this.animeService.list(page, limit);
      const total = await this.animeService.count();

      if (req.accepts('html')) {
        res.render('animes/index', {
          animes,
          title: 'Liste des animes',
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit), // around up the number of pages
          },
        });
      } else {
        res.json({
          data: animes,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  /** GET /animes/new */
  public showCreateForm = async (req: Request, res: Response): Promise<void> => {
    res.render('animes/new', { title: 'Créer un anime' });
  };

  /** GET /animes/search */
  public search = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { keyword, genre, status, minRating } = req.query;

      const animes = await this.animeService.search(
        keyword as string,
        genre as string,
        status as string,
        minRating ? parseFloat(minRating as string) : undefined,
      );

      if (req.accepts('html')) {
        res.render('animes/search', {
          animes,
          title: "Recherche d'animes",
          filters: { keyword, genre, status, minRating },
        });
      } else {
        res.json(animes);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default AnimeController;
