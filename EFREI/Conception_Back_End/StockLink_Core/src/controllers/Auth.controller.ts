import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AuthService from '../services/Auth.service';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * POST /auth/register - Crée un nouvel utilisateur
   */
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, password, role } = req.body;
      const newUser = await this.authService.register(username, password, role);

      res.status(201).json({
        message: 'Utilisateur créé',
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /auth/login - Vérifie les identifiants et renvoie un token JWT
   */
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, password } = req.body;
      const token = await this.authService.login(username, password);

      res.status(200).json({
        message: 'Connexion réussie',
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
