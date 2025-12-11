const swaggerJSDoc = require('swagger-jsdoc');
const Role = require('../domain/entities/role.entity');
const Product = require('../domain/entities/product.entity');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for the API',
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Operations related to authentication',
    },
    {
      name: 'Users',
      description: 'Operations related to users',
    },
    {
      name: 'Roles',
      description: 'Operations related to roles',
    },
    {
      name: 'Products',
      description: 'Operations related to products',
    }
  ],
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa'
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'jhon.doe@example.com'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['admin']
          }
        }
      },
      UserInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'jhon.doe@example.com'
          },
          password: {
            type: 'string',
            example: 'password123'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['admin']
          }
        }
      },
      Role: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4cab'
          },
          name: {
            type: 'string',
            example: 'admin'
          }
        }
      },
      RoleInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'admin'
          }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4cad'
          },
          name: {
            type: 'string',
            example: 'Celular IPhone 13'
          },
          description: {
            type: 'string',
            example: 'Celular IPhone 13, 128GB, color negro.'
          },
          price: {
            type: 'number',
            example: 899.99
          },
          stock: {
            type: 'integer',
            example: 100
          },
          category: {
            type: 'string',
            example: 'Electronics'
          },
          imageUrl: {
            type: 'string',
            example: 'http://example.com/image.jpg'
          }
        }
      },
      ProductInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Celular IPhone 13'
          },
          description: {
            type: 'string',
            example: 'Celular IPhone 13, 128GB, color negro.'
          },
          price: {
            type: 'number',
            example: 899.99
          },
          stock: {
            type: 'integer',
            example: 100
          },
          category: {
            type: 'string',
            example: 'Electronics'
          },
          imageUrl: {
            type: 'string',
            example: 'http://example.com/image.jpg'
          }
        }
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/presentation/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
