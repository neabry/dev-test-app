import request from 'supertest';
import app from '../app';

describe('Query middleware', () => {
  const testEndpoint = (endpoint: string): void => {
    it(`should return 400 on exceeding length ${endpoint}`, async (done) => {
      request(app)
        .get(`/api/${endpoint}`)
        .query({ q: 'a'.repeat(400) })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({ status: 400, error: '"q" query parameter exceeds enforced length.' });
          done();
        });
    });

    it(`should return 400 on missing query parameter ${endpoint}`, async (done) => {
      request(app)
        .get(`/api/${endpoint}`)
        .expect(400)
        .end((err, res): void => {
          if (err) return done(err);
          expect(res.body).toMatchObject({ status: 400, error: 'Missing "q" query parameter.' });
          done();
        });
    });
  };

  // Test both endpoints
  testEndpoint('flickr');
  testEndpoint('youtube');
});
