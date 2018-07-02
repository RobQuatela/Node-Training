const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Burger} = require('./models/burger');
const {Customer} = require('./models/customer');


const app = express();

app.use(bodyParser.json());

app.post('/api/burgers', (req, res) => {
    const burger = new Burger({
        name: req.body.name,
        beef: req.body.beef
    });

    burger.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/api/burgers', (req, res) => {
    Burger.find().then((burgers) => {
        res.send({
            burgers
        });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/api/burgers/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Burger.findById(id).then((burger) => {
        if (!burger) return res.status(404).send();
        res.send({burger});
    }).catch((e) => res.status(400).send(e));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = {
    app
}
