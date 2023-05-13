const { agent } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(60000);

describe('POST /api/v1/movies/', () => {
  it('should not create a movie if all fields not provided', async () => {
    const response = await agent.post('/api/v1/movies').set('Accept', 'application/json').send({ name: 'Avatar' });

    expect(response.status).toEqual(400);
  });

  it('should create the movie', async () => {
    const mainActors = ['Sam Worthington', 'Zoe Saldana', 'Kate Winslet', 'Michelle Yeoh'];
    const summary =
      "The film is set in the mid-22nd century, where humans are colonizing a planet called Pandora, inhabited by a humanoid species called the Na'vi. The story follows a paraplegic marine named Jake Sully who is sent to Pandora on a mission but ends up joining the Na'vi and fighting against the human colonizers";
    const name = 'Avatar';

    const response = await agent
      .post('/api/v1/movies')
      .set('Accept', 'application/json')
      .send({ name, summary, mainActors });

    expect(response.status).toEqual(201);
    expect(response.body.name).toBe(name);
    expect(response.body.mainActors[0]).toBe('Sam Worthington');
  });
});
