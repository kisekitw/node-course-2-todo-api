const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5be50b4bc1de1b0cac3b3dd51';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid!');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// }, (e) => {});

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// }, (e) => {});

// Todo.findById(id)
// .then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id:', todo);
// }).catch((e) => console.log(e));



var userId = '5be4d05ee6721d6e270b684c';

User.findById(userId).then((user) => {
    if (user) {
        return console.log('Id not found`');
    }


     console.log('User by ID', user);
});