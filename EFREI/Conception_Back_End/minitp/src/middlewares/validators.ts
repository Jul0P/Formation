import { body, param } from 'express-validator';

export const pokemonValidation = [
  body('name')
    .notEmpty()
    .withMessage('Le nom est requis')
    .isString()
    .withMessage('Le nom doit être une chaîne')
    .isLength({ min: 1, max: 100 })
    .withMessage('Le nom doit contenir entre 1 et 100 caractères'),
  body('lifePoint')
    .notEmpty()
    .withMessage('Les points de vie sont requis')
    .isInt({ min: 1 })
    .withMessage('Les points de vie doivent être un entier positif'),
  body('trainerId').notEmpty().withMessage('Le trainerId est requis').isInt({ min: 1 }).withMessage('Le trainerId doit être un entier positif'),
];

export const learnAttackValidation = [
  param('id').isInt({ min: 1 }).withMessage("L'ID du Pokémon doit être un entier positif"),
  body('attackId')
    .notEmpty()
    .withMessage("L'ID de l'attaque est requis")
    .isInt({ min: 1 })
    .withMessage("L'ID de l'attaque doit être un entier positif"),
];

export const trainerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Le nom est requis')
    .isString()
    .withMessage('Le nom doit être une chaîne')
    .isLength({ min: 1, max: 100 })
    .withMessage('Le nom doit contenir entre 1 et 100 caractères'),
  body('level').optional().isInt({ min: 1 }).withMessage('Le niveau doit être un entier positif'),
  body('experience').optional().isInt({ min: 0 }).withMessage("L'expérience doit être un entier positif ou nul"),
];

export const attackValidation = [
  body('name')
    .notEmpty()
    .withMessage('Le nom est requis')
    .isString()
    .withMessage('Le nom doit être une chaîne')
    .isLength({ min: 1, max: 100 })
    .withMessage('Le nom doit contenir entre 1 et 100 caractères'),
  body('damage').notEmpty().withMessage('Les dégâts sont requis').isInt({ min: 0 }).withMessage('Les dégâts doivent être un entier positif ou nul'),
  body('usageLimit')
    .notEmpty()
    .withMessage("La limite d'utilisation est requise")
    .isInt({ min: 1 })
    .withMessage("La limite d'utilisation doit être un entier positif"),
];

export const battleValidation = [
  body('trainer1Id').notEmpty().withMessage('Le trainer1Id est requis').isInt({ min: 1 }).withMessage('Le trainer1Id doit être un entier positif'),
  body('trainer2Id').notEmpty().withMessage('Le trainer2Id est requis').isInt({ min: 1 }).withMessage('Le trainer2Id doit être un entier positif'),
];

export const idParamValidation = [param('id').isInt({ min: 1 }).withMessage("L'ID doit être un entier positif")];
