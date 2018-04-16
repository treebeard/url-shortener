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

app.get('/:encoded_id', function(req, res){
  // route to redirect the visitor to their original URL given the short URL
    const ID_OFFSET = 0;
    const RANDOM_OFFSET = 1;
    const params = req.params.encoded_id.split('.');
    const id = hashids.decode(params[ID_OFFSET]);
    const random = hashids.decode(params[RANDOM_OFFSET]);

    Url.findOne({_id: id, random: random}, function (err, doc){
        if (doc) {
          res.redirect(doc.long_url);
        } 
        else {
          res.status(404).send('Not found');
        }
    });
});
