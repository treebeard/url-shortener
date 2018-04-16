const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.js');
const hashids = require('./hashids.js');

const app = express();

const mongourl = config.db.connection_string;
mongoose.connect(mongourl, {useMongoClient: true, dbName: config.db.name});
const Url = require('./models/url');

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(80);

const shortenUrl = function(document) {
  // hashids encode the unique _id of that document and construct the short URL
  return config.webhost + hashids.encode(document._id) + '.' + hashids.encode(document.random);
}

app.post('/', function(req, res){
    const longUrl = req.body.url;
    let shortUrl = '';

    Url.findOne({long_url: longUrl}, function (err, doc){
        if (doc){
          shortUrl = shortenUrl(doc)
          res.send({'shortUrl': shortUrl});
        } 
        else {
          const newUrl = Url({
            long_url: longUrl
          });

          newUrl.save(function(err) {
            if (err){
              console.log(err);
            }
            shortUrl = shortenUrl(newUrl)
            res.send({'shortUrl': shortUrl});
          });
        }
    });
});

