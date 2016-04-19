var moment  = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x')); // result is a string
// console.log(now.valueOf('x')); // use valueOf to get javascript time stamps

var timestamp = console.log(now.valueOf('x'));
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.format('MMM Do YYYY, h:mma'));
console.log(timestampMoment.local().format('h:mm a'));

// now.subtract(1, 'year');
// console.log(now.format());
// 
// console.log(now.format('MMM Do YYYY, h:mma'));