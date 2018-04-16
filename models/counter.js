var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: {type: String, required: true, index: true},
    seq: { type: Number, default: 0 }
});

var Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;