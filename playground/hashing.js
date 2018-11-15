const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrcrypto-js');

var password = '123abc!';



// var message = 'I am user number 3';
// var hashResult = SHA256(message).toString();

// console.log(hashResult);


// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data.id) + 'somesecret').toString()
// };

// var data = {
//     id: 10
// };


// var token = jwt.sign(data, '123abc');
// console.log(token);
