const { agent, createTestMovie } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(60000);

describe('GET /api/v1/movies/:id', () => {
  it('should get a movie', async () => {
    const actors = ['Gabriel Basso', 'Luciane Buchanan'];
    const summary = 'A serie about an agent who answers calls in the basement of white hous';
    const testMovie = await createTestMovie('Night Agent', summary, actors);

    const response = await agent.get(`/api/v1/movies/${testMovie._id}`).set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.summary).toBe(summary);
  });
});
