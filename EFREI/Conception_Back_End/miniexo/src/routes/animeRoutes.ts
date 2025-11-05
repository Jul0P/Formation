import AnimeController from '@/controllers/AnimeController';
import { animeValidation, mongoIdValidation, paginationValidation, searchValidation } from '@/middlewares/validators';
import AnimeService from '@/services/AnimeService';
import { Router } from 'express';

const router = Router();

const animeService = new AnimeService();
const animeController = new AnimeController(animeService);

router.get('/new', animeController.showCreateForm);
router.post('/', animeValidation, animeController.create);
router.get('/search', searchValidation, animeController.search);
router.get('/:id', mongoIdValidation, animeController.getById);
router.get('/', paginationValidation, animeController.list);

export default router;
