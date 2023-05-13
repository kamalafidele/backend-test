const request = require('supertest');
const MovieRepo = require('../repositories/MovieRepo');
const app = require('./test-server')();
const db = require('./test-db');

const agent = request.agent(app);

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  jest.setTimeout(90000);
  await db.clear();
});

async function createTestMovie(name, summary, mainActors) {
  return MovieRepo.save({ name, summary, mainActors });
}

module.exports = {
  agent,
  db,
  createTestMovie,
};
