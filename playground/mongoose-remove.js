const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log('success');
// });

// Todo.findOneAndRemove()

// Todo.findByIdAndRemove()
Todo.findByIdAndRemove('5be52b522b29a5000886a4ac').then((todo) => {
    console.log(todo);
});