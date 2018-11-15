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
    
    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'})
    // .then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'})
    // .then((result) => {
    //     console.log(result);
    // });

    //userDB.collection('Users').deleteOne({name: 'Jen'})
    // .then((result) => {
    //     console.log(result.result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({_id: ObjectID('5be3eadc2b29a5000886a4a2')})
    // .then((result) => {
    //     console.log(result);
    // });

    //userDB.collection('Users').findOneAndDelete({_id: ObjectID('5be3d917bb471a3fb19696fe')})
    // .then((result) => {
    //     console.log(result);
    // });
    
});