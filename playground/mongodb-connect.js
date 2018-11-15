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
    // const db = client.db('Todos');
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // const db = client.db('Users');

    // db.collection('Users').insertOne({
    //     name: 'Xavier Lin',
    //     age: 35,
    //     location: 'Kaohsiung'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }

    //     // console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });


    client.close();
});