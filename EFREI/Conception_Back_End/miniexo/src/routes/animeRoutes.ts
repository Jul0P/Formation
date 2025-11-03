import AnimeController from '@/controllers/AnimeController';
import AnimeService from '@/services/AnimeService';
import { Router } from 'express';

const router = Router();

const animeService = new AnimeService();
const animeController = new AnimeController(animeService);

router.get('/new', animeController.showCreateForm);
router.post('/', animeController.create);
router.get('/search', animeController.search);
router.get('/:id', animeController.getById);
router.get('/', animeController.list);

export default router;
