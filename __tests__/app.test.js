const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('Studio routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  let studios;
  beforeEach(() => {
    studios = Studio.create({
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
  let actors;
  beforeEach(() => {
    actors = Actor.create({
      name: 'Tom Cruise',
      dob: '1962-07-03',
      pob: 'Syracuse, NY',
    });
  });

  it('posts an actor to the actor db', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Val Kilmer',
        dob: '1959-12-31',
        pob: 'Los Angeles, CA',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 2,
          name: 'Val Kilmer',
          dob: '1959-12-31',
          pob: 'Los Angeles, CA',
        });
      });
  });

  it('returns all actors', () => {
    return request(app)
      .get('/api/v1/actors')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Tom Cruise',
            dob: '1962-07-03',
            pob: 'Syracuse, NY',
          },
        ]);
      });
  });

  it('returns an actor', () => {
    return request(app)
      .get('/api/v1/actors/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Tom Cruise',
          dob: '1962-07-03',
          pob: 'Syracuse, NY',
        });
      });
  });
});

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers/')
      .send({
        name: 'Michael Scott',
        company: 'Paper Company'
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
        name: 'Michael Scott',
        company: 'Paper Company'
        });
      });
  });
});
