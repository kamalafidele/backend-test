const { agent, createTestMovie } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(60000);

describe('PATCH /api/v1/movies/rank/:ID', () => {
  it('should fail if movie not found ', async () => {
    const movieId = '63b2af8ca21a0bb2af5e2ae9';

    const response = await agent
      .patch(`/api/v1/movies/rank/${movieId}`)
      .set('Accept', 'application/json')
      .send({ rank: 50 });

    expect(response.status).toEqual(404);
    expect(response.body.error).toBe('movie not found');
  });

  it('should fail if rank not provided in body ', async () => {
    const mainActors = ['Scott Adkins', 'Iko Uwaise', 'Tony Jaa'];
    const summary =
      "A crime syndicate places a hit on a billionaire's daughter, making her the target of an elite assassin squad. A small band of down-and-out mercenaries protects her, fighting tooth and nail to stop the assassins from reaching their target.";
    const name = 'Tripple Threat';

    const testMovie = await createTestMovie(name, summary, mainActors);

    const response = await agent.patch(`/api/v1/movies/rank/${testMovie._id}`).set('Accept', 'application/json').send();

    expect(response.status).toEqual(400);
  });

  it('should update the rank of the movie', async () => {
    const mainActors = ['Scott Adkins', 'Iko Uwaise', 'Tony Jaa'];
    const summary =
      "A crime syndicate places a hit on a billionaire's daughter, making her the target of an elite assassin squad. A small band of down-and-out mercenaries protects her, fighting tooth and nail to stop the assassins from reaching their target.";
    const name = 'Tripple Threat';

    const testMovie = await createTestMovie(name, summary, mainActors);

    const response = await agent
      .patch(`/api/v1/movies/rank/${testMovie._id}`)
      .set('Accept', 'application/json')
      .send({ rank: 85 });

    expect(response.status).toEqual(200);
    expect(response.body.movie.rank).toEqual(85);
  });
});
