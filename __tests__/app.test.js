const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');

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

  let reviewers;
  beforeEach(() => {
    reviewers = Reviewer.create({
      name: 'Dwight Schrute',
      company: 'Schrute Farms'
    })
  })

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers/')
      .send({
        name: 'Michael Scott',
        company: 'Paper Company'
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 2,
          name: 'Michael Scott',
          company: 'Paper Company'
        });
      });
  });

  it('gets all reviewers', () => {
    return request(app)
      .get('/api/v1/reviewers/')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Dwight Schrute',
            company: 'Schrute Farms'
          }
        ]);
      });
  });

  it('gets reviewer by Id', () => {
    return request(app)
      .get('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: 1,
            name: 'Dwight Schrute',
            company: 'Schrute Farms'
          }
        );
      });
  });

  it('updates reviewer', () => {
    return request(app)
      .patch('/api/v1/reviewers/1')
      .send({ company: 'Schrute Beet Farms' })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Dwight Schrute',
          company: 'Schrute Beet Farms'
        });
      });
  });

  it('deletes the reviewer', () => {
    return request(app)
      .delete('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({ success: '👍' });
      });
  });

});

describe('film routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let actors;
  beforeEach(() => {
    actors = Actor.create({
      name: 'Michael Gary Scott',
      dob: '1965-03-15',
      pob: 'Scranton, PA'
    });
  });

  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Threat Level Midnight',
        studio: 'Michael Scott Productions',
        released: 2007,
        cast: [{
          role: 'Michael Scarn',
          actor: 1
        }]
      })
      .then((res) => {
        expect(res.body).toEqual({
          title: 'Threat Level Midnight',
          studio: 'Michael Scott Productions',
          released: 2007,
          cast: [{
            role: 'Michael Scarn',
            actor: 1
        }]
        });
      });
  });

});

// describe('Reviews routes', () => {
//   beforeEach(() => {
//     return db.sync({ force: true });
//   });

//   it('creates a review', () => {
//     return request(app)
//       .post('/api/v1/reviews/')
//       .send({
//         rating: 5,
//         reviewer: 1,
//         review: 'Best movie ever',
//         film: 1
//       })
//       .then((res) => {
//         expect(res.body).toEqual({
//           id: 1, 
//           rating: 5,
//           reviewer: 1,
//           review: 'Best movie ever',
//           film: 1
//         });
//       });
//   });

// });