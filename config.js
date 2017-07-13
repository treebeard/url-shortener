var config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + base58 ID
// i.e.: http://localhost:8456/3Ys
config.webhost = 'http://localhost:8456/';

// your MongoDB host and database name
config.db.host = 'heroku_njgdl6z4:Dodgeviper1!@ds157712.mlab.com:57712';
config.db.name = 'heroku_njgdl6z4';

module.exports = config;