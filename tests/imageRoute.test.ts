const request = require('supertest');
const app = require('../src/app');
const {join} = require('path')

describe('Image recognition test', () => {
  test('Image Recognition', async () => {
    const response = await request(app)
      .post('/api/image-recognition')
      .attach('image', join(__dirname, "npp.jpg"));

    expect(response.status).toBe(200);
  });
});