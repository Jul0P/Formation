import PokemonService from '@/services/PokemonService';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class PokemonController {
  private pokemonService: PokemonService;

  constructor(pokemonService: PokemonService) {
    this.pokemonService = pokemonService;
  }

  /** GET /pokemon */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    const pokemons = await this.pokemonService.getAllPokemons();

    if (req.accepts('html')) {
      res.render('pokemon/index', { pokemons, title: 'Liste des pokémon' });
    } else {
      res.json(pokemons);
    }
  };

  /** GET /pokemon/:id */
  public getById = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const pokemon = await this.pokemonService.getPokemonById(parseInt(req.params.id));

    if (!pokemon) {
      res.status(404).json({ error: 'Pokémon non trouvé' });
      return;
    }

    if (req.accepts('html')) {
      res.render('pokemon/show', { pokemon, title: pokemon.name });
    } else {
      res.json(pokemon);
    }
  };

  /** POST /pokemon/:id/learn-attack */
  public learnAttack = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { attackId } = req.body;
    await this.pokemonService.learnAttack(parseInt(req.params.id), attackId);
    const pokemon = await this.pokemonService.getPokemonById(parseInt(req.params.id));
    res.json(pokemon);
  };

  /** POST /pokemon */
  public create = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, lifePoint, trainerId } = req.body;
    const pokemon = await this.pokemonService.createPokemon(name, lifePoint, trainerId || null);
    res.status(201).json(pokemon);
  };

  /** DELETE /pokemon/:id */
  public delete = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    await this.pokemonService.deletePokemon(parseInt(req.params.id));
    res.status(204).send();
  };
}

export default PokemonController;
