import swaggerJsdoc from 'swagger-jsdoc';
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'],
};

const openapiSpecification = swaggerJsdoc(options);
export default openapiSpecification;
