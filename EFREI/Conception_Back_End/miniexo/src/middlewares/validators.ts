import { body, param, query } from 'express-validator';

export const animeValidation = [
  body('title')
    .notEmpty()
    .withMessage('Le titre est requis')
    .isString()
    .withMessage('Le titre doit être une chaîne')
    .isLength({ min: 1, max: 200 })
    .withMessage('Le titre doit contenir entre 1 et 200 caractères'),
  body('description')
    .notEmpty()
    .withMessage('La description est requise')
    .isString()
    .withMessage('La description doit être une chaîne')
    .isLength({ min: 10 })
    .withMessage('La description doit contenir au moins 10 caractères'),
  body('genre').notEmpty().withMessage('Le genre est requis').isString().withMessage('Le genre doit être une chaîne'),
  body('episodes')
    .notEmpty()
    .withMessage("Le nombre d'épisodes est requis")
    .isInt({ min: 1 })
    .withMessage("Le nombre d'épisodes doit être un entier positif"),
  body('status')
    .notEmpty()
    .withMessage('Le statut est requis')
    .isIn(['ongoing', 'completed', 'upcoming'])
    .withMessage('Le statut doit être: ongoing, completed ou upcoming'),
  body('rating').optional().isFloat({ min: 0, max: 10 }).withMessage('La note doit être entre 0 et 10'),
  body('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 2 })
    .withMessage(`L'année doit être entre 1900 et ${new Date().getFullYear() + 2}`),
];

export const searchValidation = [
  query('keyword').optional().isString().withMessage('Le mot-clé doit être une chaîne'),
  query('genre').optional().isString().withMessage('Le genre doit être une chaîne'),
  query('status').optional().isIn(['ongoing', 'completed', 'upcoming']).withMessage('Le statut doit être: ongoing, completed ou upcoming'),
  query('minRating').optional().isFloat({ min: 0, max: 10 }).withMessage('La note minimale doit être entre 0 et 10'),
];

export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('La page doit être un entier positif'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('La limite doit être entre 1 et 100'),
];

export const mongoIdValidation = [param('id').isMongoId().withMessage("L'ID doit être un ObjectId MongoDB valide")];
