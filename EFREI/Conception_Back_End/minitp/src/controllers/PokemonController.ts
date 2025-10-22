import { Request, Response } from 'express';
import PokemonService from '../services/PokemonService';

class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  /** GET /pokemon */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    const pokemons = await this.pokemonService.getAllPokemons();
    res.json(pokemons);
  };

  /** GET /pokemon/:id */
  public getById = async (req: Request, res: Response): Promise<void> => {
    const pokemon = await this.pokemonService.getPokemonById(parseInt(req.params.id));

    if (!pokemon) {
      res.status(404).json({ error: 'Pokémon non trouvé' });
      return;
    }

    res.json(pokemon);
  };

  /** POST /pokemon/:id/learn-attack */
  public learnAttack = async (req: Request, res: Response): Promise<void> => {
    const { attackId } = req.body;
    await this.pokemonService.learnAttack(parseInt(req.params.id), attackId);
    const pokemon = await this.pokemonService.getPokemonById(parseInt(req.params.id));
    res.json(pokemon);
  };

  /** POST /pokemon */
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, lifePoint, trainerId } = req.body;
    const pokemon = await this.pokemonService.createPokemon(name, lifePoint, trainerId || null);
    res.status(201).json(pokemon);
  };

  /** DELETE /pokemon/:id */
  public delete = async (req: Request, res: Response): Promise<void> => {
    await this.pokemonService.deletePokemon(parseInt(req.params.id));
    res.status(204).send();
  };
}

export default PokemonController;
