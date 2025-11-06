import PokemonController from '@/controllers/PokemonController';
import AttackRepository from '@/repositories/AttackRepository';
import PokemonRepository from '@/repositories/PokemonRepository';
import PokemonService from '@/services/PokemonService';
import { Router } from 'express';
import { pokemonValidation, learnAttackValidation, idParamValidation } from '@/middlewares/validators';

const router = Router();

const pokemonRepo = new PokemonRepository();
const attackRepo = new AttackRepository();
const pokemonService = new PokemonService(pokemonRepo, attackRepo);
const pokemonController = new PokemonController(pokemonService);

router.post('/', pokemonValidation, pokemonController.create);
router.get('/', pokemonController.getAll);
router.get('/:id', idParamValidation, pokemonController.getById);
router.post('/:id/learn-attack', learnAttackValidation, pokemonController.learnAttack);
router.delete('/:id', idParamValidation, pokemonController.delete);

export default router;
