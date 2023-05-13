const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const routeHandler = require('./src/routes');
const swaggerFile = require('./swagger_output.json');

dotenv.config();

const app = express();

const { mongodbOptions } = require('./src/config');

const { PORT, HOST, MONGODB_URI } = process.env;

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI, mongodbOptions)
  .then(() => console.log('Successfully connected to MongoDb'))
  .catch((e) => console.log('Could not connect to MongoDb', e));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use('/api/v1', routeHandler);

app.use((req, res) => res.status(404).json({ error: 'Cannot get what you are looking for!' }));

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${HOST}:${PORT}`);
  console.log(`ACCESS API DOCS VIA ${HOST}:${PORT}/api-docs `);
});
