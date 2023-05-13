const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

dotenv.config();

const { PORT, HOST, ENV_MODE } = process.env;
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'MyTop100Movies',
    description: 'MyTop100Movies  API documentation',
  },
  host: `${ENV_MODE === 'DEV' ? 'localhost' : HOST}:${PORT}`,
  basePath: '/api/v1/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Movie',
      description: 'The Movie',
    },
  ],
  // securityDefinitions: {
  //   api_key: {
  //     type: 'apiKey',
  //     name: 'Authorization',
  //     in: 'header',
  //   },
  // },
  definitions: {
    Movie: {
      name: 'Ghosted',
      summary: 'Ghosted is a 2023 American romantic action-adventure comedy film directed by Dexter Fletcher and written by Rhett Reese, Paul Wernick, Chris McKenna, and Erik Sommers, from a story by Reese and Wernick',
      rank: 75,
      mainActors: ['Chris Evans', 'Ana de Armas'],
    },
  },
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger doc generated');
});
