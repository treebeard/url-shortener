var config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + hasids ID
config.webhost = process.env.DEFAULT_URL;

config.db.name = 'url_shortener';
config.db.connection_string = process.env.MONGO_CONNECTION_STRING
module.exports = config;