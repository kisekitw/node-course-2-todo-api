// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var user = {name: 'Xavier Lin', age: 25};
// var { name } = user;
// console.log(name);

MongoClient.connect("mongodb://127.0.0.1:10000/TodoApp", (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('Todos');
    const userDB = client.db('Users');
    
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5be3dd972b29a5000886a498')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    userDB.collection('Users').findOneAndUpdate({
        _id: ObjectID('5be3ed852b29a5000886a4a6')
    }, {
        $set: { name: 'Xavier Lin'},
        $inc: { age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
});