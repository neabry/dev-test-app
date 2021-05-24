import request from 'supertest';
import app from '../app';

describe('YouTube endpoint', () => {
  it('should return 200 on normal input', async (done) => {
    request(app)
      .get('/api/youtube')
      .query({ q: 'cat' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.videos.length).toBeGreaterThan(0);
        done();
      });
  });

  it('should return at most 25 videos', async (done) => {
    request(app)
      .get('/api/youtube')
      .query({ q: 'cat' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.videos.length).toBeLessThanOrEqual(25);
        done();
      });
  });
});
