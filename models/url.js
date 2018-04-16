var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = require('./counter')

// create a schema for our links
var urlSchema = new Schema({
  _id: {type: Number, index: true},
  random: {type: Number},
  long_url: String,
  created_at: Date
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  var doc = this;
  Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      // set the _id of the urls collection to the incremented value of the counter
      if (counter == null) {
          console.log('no counter');
          counter = new Counter({_id: 'url_count'});
          counter.save();
      }
      doc._id = counter.seq;
      doc.random = Math.floor(Math.random() * 10000);
      doc.created_at = new Date();
      next();
  });
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;