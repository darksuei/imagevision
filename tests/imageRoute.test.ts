const request = require('supertest');
const app = require('../src/app');

describe('Image recognition test', () => {
  test('Image Recognition', async () => {
    const response = await request(app)
      .post('/api/image-recognition')
      .attach('image', 'npp.jpg');

    expect(response.status).toBe(200);
  });
});