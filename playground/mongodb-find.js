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
    
    // db.collection('Todos').find({_id: new ObjectID('5be3d7b7c8e2b63f4b7a51ba')}).toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count()
    // .then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    const userDb = client.db('Users');

    userDb.collection('Users').find({name: 'Xavier Lin'})
    .toArray().then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });
});