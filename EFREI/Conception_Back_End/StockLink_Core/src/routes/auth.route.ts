import { Router } from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/Auth.controller';

class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Enregistrer un nouvel utilisateur
     *     tags: [Authentification]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 minLength: 3
     *                 exemple: johndoe
     *               password:
     *                 type: string
     *                 minLength: 12
     *                 exemple: test
     *               role:
     *                 type: string
     *                 enum: [user, admin]
     *                 description: Le rôle de l'utilisateur
     *     responses:
     *       201:
     *         description: Utilisateur créé
     *       400:
     *         description: Données invalides
     */
    this.router.post(
      '/register',
      [
        body('username').isLength({ min: 3 }).withMessage("Le nom d'utilisateur doit contenir au moins 3 caractères"),
        body('password')
          .isLength({ min: 12 })
          .withMessage('Le mot de passe doit contenir au moins 12 caractères')
          .matches(/[a-z]/)
          .withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
          .matches(/[A-Z]/)
          .withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
          .matches(/[0-9]/)
          .withMessage('Le mot de passe doit contenir au moins un chiffre')
          .matches(/[\W_]/)
          .withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
        body('role').optional().isIn(['user', 'admin']).withMessage('Le rôle doit être user ou admin'),
      ],
      this.authController.register,
    );

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Authentification d'un utilisateur
     *     tags: [Authentification]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: Le nom d'utilisateur
     *               password:
     *                 type: string
     *                 description: Le mot de passe
     *     responses:
     *       200:
     *         description: Connexion réussie
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: Token JWT
     *       400:
     *         description: Données invalides
     *       401:
     *         description: Identifiants incorrects
     */
    this.router.post(
      '/login',
      [
        body('username').notEmpty().withMessage("Le nom d'utilisateur est requis"),
        body('password').notEmpty().withMessage('Le mot de passe est requis'),
      ],
      this.authController.login,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AuthRoutes;
