var Hashids = require('hashids');
var hashids = new Hashids();

function encode(num){
  return hashids.encode(num);
}
function decode(str){
  return hashids.decode(str)[0];
}

module.exports.encode = encode;
module.exports.decode = decode;