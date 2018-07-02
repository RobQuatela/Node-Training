const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('error connecting to mongodb');
    }
    console.log('Connected to MongoDB');
    const db = client.db('BurgerBarn');

    db.collection('Burgers').findOneAndUpdate({
        _id: new ObjectID('5b3a7297434c891f748c0b99')
    }, {
        $set: {
            name: 'Bestest Burger'
        },
        $inc: {
            price: 1.30
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
})