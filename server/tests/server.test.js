const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server/');
const {Burger} = require('./../models/burger');

const burgers = [{
    _id: new ObjectID(),
    name: 'test burger1',
    beef: '90/10'
}, {
    _id: new ObjectID(),
    name: 'test burger2',
    beef: '85/10'
}, {
    _id: new ObjectID(),
    name: 'lean burger',
    beef: '95/5'
}];

beforeEach((done) => {
    Burger.remove({}).then(() => {
        return Burger.insertMany(burgers);
    }).then(() => done());
});

describe('POST /api/burgers', () => {
    test('should create new burger', (done) => {
        const name = 'test burger1';
    
        request(app)
            .post('/api/burgers')
            .send({name})
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(name);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
    
                Burger.find().then((burgers) => {
                    expect(burgers.length).toBe(4);
                    done();
                }).catch((e) => done(e));
            });
    });
    
    test('should not create burger with invalid body data', (done) => {
        request(app)
            .post('/api/burgers')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
    
                Burger.find().then((burgers) => {
                    expect(burgers.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /api/burgers', () => {
    test('should get all burgers', (done) => {
        request(app)
            .get('/api/burgers')
            .expect(200)
            .expect((res) => {
                expect(res.body.burgers.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /api/burgers/:id', () => {
    test('should get burger with specific id', (done) => {
        request(app)
            .get(`/api/burgers/${burgers[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.burger.name).toBe(burgers[0].name);
            })
            .end(done);
    });

    test('should return 404 if burger not found', (done) => {
        request(app)
            .get(`/api/burgers/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    test('should return 404 if object id not valid', (done) => {
        request(app)
            .get('/api/burgers/123')
            .expect(404)
            .end(done);
    });
});
