var config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + hasids ID
// i.e.: http://abbrev.io/3Y
config.webhost = 'http://abbrev.io/';

// your MongoDB host and database name
config.db.host = 'localhost';
config.db.name = 'url_shortener';

module.exports = config;