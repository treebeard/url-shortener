var Hashids = require('hashids');
var hashids = new Hashids();

var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length; //base 58

// utility function to convert base 10 integer to base 58 string
function encode2(num){
  var encoded = '';
  while (num){
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

// utility function to convert a base 58 string to base 10 integer
function decode2(str){
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}

function encode(num){
  return hashids.encode(num);
}
function decode(str){
  return hashids.decode(str)[0];
}

module.exports.encode = encode;
module.exports.decode = decode;