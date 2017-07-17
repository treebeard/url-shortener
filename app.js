var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var hashids = require('./hashids.js');

var app = express();

// grab the url model
var Url = require('./models/url');

// create a connection to our MongoDB
//variable set using 'heroku config:set MONGOLAB_URI='
var mongourl = process.env.MONGOLAB_URI;

if (process.env.NODE_ENV === 'production'){
  mongoose.connect(mongourl);
}
else{
  mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
}


app.use(express.static(path.join(__dirname, 'static')));

//handles JSON bodies
app.use(bodyParser.json());
//handlesURL encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 8456);

app.get('/', function(req, res){
	//route to serve up the homepage (index.html)
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/shorten', function(req, res){
	//route to create and return a shortened URL given a long URL
    var longUrl = req.body.url;
    var shortUrl = '';

    // check if url already exists in database
    Url.findOne({long_url: longUrl}, function (err, doc){
        if (doc){
          // hashids encode the unique _id of that document and construct the short URL
          shortUrl = config.webhost + hashids.encode(doc._id);

          // since the document exists, we return it without creating a new entry
          res.send({'shortUrl': shortUrl});
        } 
        else {
          // The long URL was not found in the long_url field in our urls
          // collection, so we need to create a new entry:
          var newUrl = Url({
            long_url: longUrl
          });

          // save the new link
          newUrl.save(function(err) {
            if (err){
              console.log(err);
            }

            // construct the short URL
            shortUrl = config.webhost + hashids.encode(newUrl._id);

            res.send({'shortUrl': shortUrl});
          });
        }
    });
});

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/:encoded_id', function(req, res){
	// route to redirect the visitor to their original URL given the short URL
    var hashedId = req.params.encoded_id;
    var id = hashids.decode(hashedId);

    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc){
        if (doc) {
          console.log(hashedId);
          console.log(id);
          // found an entry in the DB, redirect the user to their destination
          res.redirect(doc.long_url);
        } 
        else {
          console.log(hashedId);
          console.log(id);
          // nothing found, take 'em home
          res.redirect(config.webhost);
        }
    });
});
