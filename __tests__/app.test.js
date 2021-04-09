const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');

describe('lab-11-ripe-banana routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('it posts to the studio db', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Laika',
        city: 'Hillsboro',
        state: 'OR',
        country: 'US of A',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Laika',
          city: 'Hillsboro',
          state: 'OR',
          country: 'US of A',
        });
      });
  });
});
