const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Studio = require('../lib/models/Studio');

describe('Studio routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  let Studios;
  beforeEach(() => {
    Studios = Studio.create({
      name: 'Also Laika',
      city: 'Hillsboro',
      state: 'OR',
      country: 'US of A',
    });
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
          id: 2,
          name: 'Laika',
          city: 'Hillsboro',
          state: 'OR',
          country: 'US of A',
        });
      });
  });

  it('returns all studios from db', () => {
    return request(app)
      .get('/api/v1/studios')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Also Laika',
            city: 'Hillsboro',
            state: 'OR',
            country: 'US of A',
          },
        ]);
      });
  });

  it('returns a studio by id', () => {
    return request(app)
      .get('/api/v1/studios/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Also Laika',
          city: 'Hillsboro',
          state: 'OR',
          country: 'US of A',
        });
      });
  });
});

describe('Actor routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('posts an actor to the actor db', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Val Kilmer',
        dob: '31/12/1959',
        pob: 'Los Angeles, CA',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Val Kilmer',
          dob: '31/12/1959',
          pob: 'Los Angeles, CA',
        });
      });
  });
});
