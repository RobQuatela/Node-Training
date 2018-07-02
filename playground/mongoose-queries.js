const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Burger} = require('../server/models/burger');
const {Customer} = require('../server/models/customer');

const id ='6b3a9e54340ac04facd21b51';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Burger.find({
    _id: id
}).then((burgers) => {
    if(burgers.length === 0) return console.log('burger not found');
    console.log('burgers', burgers);
});

Burger.findOne({
    _id: id
}).then((burger) => {
    if(!burger) return console.log('burger not found');
    console.log('burger', burger);
});

Burger.findById(id).then((burger) => {
    if(!burger) return console.log('burger not found');
    console.log('burger', burger);
}).catch((e) => console.log(e));

Customer.findById('5b3a8a405ddac916604faf52').then((user) => {
    if(!user) return console.log('user not found');

    console.log('user', user);
}).catch((e) => console.log(e));