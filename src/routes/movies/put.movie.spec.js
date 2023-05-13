const { agent, createTestMovie } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(60000);

describe('PUT /api/v1/movies/', () => {
  it('should fail if movie not found ', async () => {
    const movieId = '63b2af8ca21a0bb2af5e2ae9';
    const response = await agent
      .put(`/api/v1/movies/${movieId}`)
      .set('Accept', 'application/json')
      .send({ name: 'Avatar', summary: '', rank: 0 });

    expect(response.status).toEqual(404);
  });

  it('should update the movie', async () => {
    const mainActors = ['Scott Adkins', 'Iko Uwaise', 'Tony Jaa'];
    const summary =
      "A crime syndicate places a hit on a billionaire's daughter, making her the target of an elite assassin squad. A small band of down-and-out mercenaries protects her, fighting tooth and nail to stop the assassins from reaching their target.";
    const name = 'Tripple Threat';

    const testMovie = await createTestMovie(name, summary, mainActors);

    const response = await agent
      .put(`/api/v1/movies/${testMovie._id}`)
      .set('Accept', 'application/json')
      .send({ name: 'Tripple Threat 2', summary, mainActors, rank: 78 });

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe('Updated successfully');
  });
});
