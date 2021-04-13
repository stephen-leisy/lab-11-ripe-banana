const Film = require('./Film');
const Actor = require('./Actor');
const Studio = require('./Studio');

// // Film/Actor join
// Film.hasMany(Actor);
// Actor.belongsToMany(Film);

// Studio/Film join
Studio.hasMany(Film);
Film.belongsTo(Studio);

// Film/Reviews join

// Reviewers/Reviews join
