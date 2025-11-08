import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokemon API - Documentation',
      version: '1.0.0',
      description: 'API REST complète pour gérer des Pokémon, des dresseurs et des combats avec PostgreSQL',
      contact: {
        name: 'Support API',
        email: 'support@pokemon-api.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
    tags: [
      {
        name: 'Pokemon',
        description: 'Gestion des Pokémon',
      },
      {
        name: 'Trainers',
        description: 'Gestion des dresseurs',
      },
      {
        name: 'Attacks',
        description: 'Gestion des attaques',
      },
      {
        name: 'Battles',
        description: 'Système de combat',
      },
    ],
    components: {
      schemas: {
        Pokemon: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID unique du Pokémon',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Nom du Pokémon',
              example: 'Pikachu',
            },
            lifePoint: {
              type: 'integer',
              description: 'Points de vie actuels',
              example: 80,
            },
            maxLifePoint: {
              type: 'integer',
              description: 'Points de vie maximum',
              example: 100,
            },
            trainerId: {
              type: 'integer',
              description: 'ID du dresseur propriétaire',
              example: 1,
            },
            attacks: {
              type: 'array',
              description: 'Liste des attaques apprises (max 4)',
              items: {
                $ref: '#/components/schemas/Attack',
              },
            },
          },
        },
        PokemonInput: {
          type: 'object',
          required: ['name', 'lifePoint', 'trainerId'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              example: 'Dracaufeu',
            },
            lifePoint: {
              type: 'integer',
              minimum: 1,
              example: 150,
            },
            trainerId: {
              type: 'integer',
              minimum: 1,
              example: 1,
            },
          },
        },
        Trainer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID unique du dresseur',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Nom du dresseur',
              example: 'Sacha',
            },
            level: {
              type: 'integer',
              description: 'Niveau du dresseur',
              example: 10,
            },
            experience: {
              type: 'integer',
              description: "Points d'expérience",
              example: 50,
            },
            pokemons: {
              type: 'array',
              description: 'Liste des Pokémon du dresseur',
              items: {
                $ref: '#/components/schemas/Pokemon',
              },
            },
          },
        },
        TrainerInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              example: 'Pierre',
            },
            level: {
              type: 'integer',
              minimum: 1,
              example: 1,
            },
            experience: {
              type: 'integer',
              minimum: 0,
              example: 0,
            },
          },
        },
        Attack: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: "ID unique de l'attaque",
              example: 1,
            },
            name: {
              type: 'string',
              description: "Nom de l'attaque",
              example: 'Éclair',
            },
            damage: {
              type: 'integer',
              description: 'Dégâts infligés',
              example: 40,
            },
            usageLimit: {
              type: 'integer',
              description: "Nombre d'utilisations maximum",
              example: 10,
            },
            currentUsage: {
              type: 'integer',
              description: "Nombre d'utilisations actuelles",
              example: 0,
            },
          },
        },
        AttackInput: {
          type: 'object',
          required: ['name', 'damage', 'usageLimit'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              example: 'Lance-Flammes',
            },
            damage: {
              type: 'integer',
              minimum: 0,
              example: 90,
            },
            usageLimit: {
              type: 'integer',
              minimum: 1,
              example: 15,
            },
          },
        },
        BattleInput: {
          type: 'object',
          required: ['trainer1Id', 'trainer2Id'],
          properties: {
            trainer1Id: {
              type: 'integer',
              minimum: 1,
              example: 1,
            },
            trainer2Id: {
              type: 'integer',
              minimum: 1,
              example: 2,
            },
          },
        },
        BattleResult: {
          type: 'object',
          properties: {
            winner: {
              $ref: '#/components/schemas/Trainer',
            },
            loser: {
              $ref: '#/components/schemas/Trainer',
            },
            turns: {
              type: 'integer',
              description: 'Nombre de tours',
              example: 5,
            },
            log: {
              type: 'array',
              description: 'Journal du combat',
              items: {
                type: 'string',
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: "Message d'erreur",
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Le nom est requis',
                  },
                  param: {
                    type: 'string',
                    example: 'name',
                  },
                  location: {
                    type: 'string',
                    example: 'body',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
