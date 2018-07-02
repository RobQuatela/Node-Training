// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/BurgerBarn', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server!');

    const db = client.db('BurgerBarn');

    db.collection('Burgers').find().toArray().then((documents) => {
        console.log('Burgers');
        console.log(JSON.stringify(documents, undefined, 2));
    }, err => {
        console.log('Unable to fetch Burgers', err);
    });

    db.collection('Burgers').find({
        _id: new ObjectID('5b3a2fb0d5958c3adcfff91f')
    }).toArray().then(documents => {
        console.log(JSON.stringify(documents, undefined, 2));
    }, err => {
        console.log(err);
    });

    db.collection('Burgers').find().count().then(count => {
        console.log('count: ', count);
    }, err => {
        console.log(err);
    });

    db.collection('Burgers').deleteMany({name: 'test1 burger'}).then((result) => {
        console.log(result);
    });
    
    // db.collection('Burgers').insertOne({
    //     name: 'All American',
    //     beef: '80/20',
    //     cheese: 'american',
    //     bun: 'White',
    //     price: 6.99
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create Burger', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Customers').insertOne({
    //     name: 'Rob Quatela',
    //     location: 'Suwanee, GA'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create Customer', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
});