import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StockLink Core API',
      version: '1.0.0',
      description: "C'est la description de l'api stocklink core",
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            username: {
              type: 'string',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            reference: {
              type: 'string',
            },
            quantity: {
              type: 'integer',
            },
            warehouse_id: {
              type: 'integer',
            },
          },
        },
        Movement: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            product_id: {
              type: 'integer',
            },
            quantity: {
              type: 'integer',
            },
            type: {
              type: 'string',
              enum: ['IN', 'OUT'],
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Warehouse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            location: {
              type: 'string',
            },
          },
        },
        Location: {
          type: 'object',
          properties: {
            warehouse_id: {
              type: 'integer',
            },
            code: {
              type: 'string',
            },
            layout: {
              type: 'object',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
