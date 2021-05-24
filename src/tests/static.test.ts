import request from 'supertest';
import app from '../app';

describe('Static hosting', () => {
  it('should return 200 and HTML on index GET request', async (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/, done);
  });
});
