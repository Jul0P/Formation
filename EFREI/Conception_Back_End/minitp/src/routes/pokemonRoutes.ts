import { Router } from 'express';
import PokemonController from '../controllers/PokemonController';
import AttackRepository from '../repositories/AttackRepository';
import PokemonRepository from '../repositories/PokemonRepository';
import PokemonService from '../services/PokemonService';

const router = Router();

const pokemonRepo = new PokemonRepository();
const attackRepo = new AttackRepository();
const pokemonService = new PokemonService(pokemonRepo, attackRepo);
const pokemonController = new PokemonController(pokemonService);

router.post('/', pokemonController.create);
router.get('/', pokemonController.getAll);
router.get('/:id', pokemonController.getById);
router.post('/:id/learn-attack', pokemonController.learnAttack);
router.delete('/:id', pokemonController.delete);

export default router;
