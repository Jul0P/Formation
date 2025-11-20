import AuthService from '@/services/Auth.service';
import { IUserPayload } from '@/types/user.types';
import { NextFunction, Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: IUserPayload;
}

class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Middleware qui vérifie la présence et la validité du token JWT
   */
  public authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token manquant ou invalide' });
        return;
      }

      const token = authHeader.substring(7); // Enlever "Bearer "
      const decoded = this.authService.verifyToken(token);

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  };

  /**
   * Middleware qui autorise uniquement les admins
   */
  public isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Non authentifié' });
      return;
    }

    if (req.user.role !== 'admin') {
      res.status(403).json({ message: 'Accès refusé: rôle Admin est requis' });
      return;
    }

    next();
  };
}

export default AuthMiddleware;
