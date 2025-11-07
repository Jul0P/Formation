import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Anime - Documentation',
      version: '1.0.0',
      description: "API REST pour gérer une collection d'animes avec MongoDB",
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
    tags: [
      {
        name: 'Animes',
        description: 'Gestion des animes',
      },
    ],
    components: {
      schemas: {
        Anime: {
          type: 'object',
          required: ['title', 'description', 'genre', 'episodes', 'status'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID MongoDB généré automatiquement',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              description: "Titre de l'anime",
              minLength: 1,
              maxLength: 200,
              example: 'One Piece',
            },
            description: {
              type: 'string',
              description: "Description détaillée de l'anime",
              minLength: 10,
              example: 'Les aventures de Monkey D. Luffy et son équipage de pirates...',
            },
            genre: {
              type: 'string',
              description: "Genre de l'anime",
              example: 'Shonen',
            },
            episodes: {
              type: 'integer',
              description: "Nombre d'épisodes",
              minimum: 1,
              example: 1000,
            },
            status: {
              type: 'string',
              description: "Statut de diffusion de l'anime",
              enum: ['ongoing', 'completed', 'upcoming'],
              example: 'ongoing',
            },
            rating: {
              type: 'number',
              description: "Note de l'anime (0-10)",
              minimum: 0,
              maximum: 10,
              example: 9.5,
            },
            year: {
              type: 'integer',
              description: 'Année de sortie',
              minimum: 1900,
              maximum: 2027,
              example: 1999,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière modification',
            },
          },
        },
        AnimeInput: {
          type: 'object',
          required: ['title', 'description', 'genre', 'episodes', 'status'],
          properties: {
            title: {
              type: 'string',
              minLength: 1,
              maxLength: 200,
              example: 'Naruto',
            },
            description: {
              type: 'string',
              minLength: 10,
              example: 'Un jeune ninja nommé Naruto Uzumaki cherche la reconnaissance...',
            },
            genre: {
              type: 'string',
              example: 'Shonen',
            },
            episodes: {
              type: 'integer',
              minimum: 1,
              example: 220,
            },
            status: {
              type: 'string',
              enum: ['ongoing', 'completed', 'upcoming'],
              example: 'completed',
            },
            rating: {
              type: 'number',
              minimum: 0,
              maximum: 10,
              example: 8.3,
            },
            year: {
              type: 'integer',
              minimum: 1900,
              maximum: 2027,
              example: 2002,
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Anime',
              },
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  example: 1,
                },
                limit: {
                  type: 'integer',
                  example: 10,
                },
                total: {
                  type: 'integer',
                  example: 50,
                },
                pages: {
                  type: 'integer',
                  example: 5,
                },
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
                    example: 'Le titre est requis',
                  },
                  param: {
                    type: 'string',
                    example: 'title',
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
