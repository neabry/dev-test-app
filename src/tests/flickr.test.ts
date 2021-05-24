import request from 'supertest';
import app from '../app';

describe('Flickr endpoint', () => {
  it('should return 200 on normal input', async (done) => {
    request(app)
      .get('/api/flickr')
      .query({ q: 'cat' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.media.length).toBeGreaterThan(0);
        done();
      });
  });

  it('should return at most 3 images', async (done) => {
    request(app)
      .get('/api/flickr')
      .query({ q: 'cat' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.media.length).toBeLessThanOrEqual(3);
        done();
      });
  });
});
