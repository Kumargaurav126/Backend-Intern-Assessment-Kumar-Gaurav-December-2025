const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
require('dotenv').config();

beforeAll(async () => { await mongoose.connect(process.env.MONGO_URI); });
afterAll(async () => { await User.deleteMany({ email: /test/ }); await mongoose.connection.close(); });

describe('Backend API', () => {
  let token;
  it('Register User', async () => {
    const res = await request(app).post('/api/auth/signup').send({ fullName: 'Test', email: 'test@ex.com', password: 'pass123' });
    expect(res.statusCode).toEqual(201);
  });
  it('Login User', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'test@ex.com', password: 'pass123' });
    expect(res.statusCode).toEqual(200);
    token = res.body.token;
  });
  it('Access Profile', async () => {
    const res = await request(app).get('/api/users/profile').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it('Short Password Fail', async () => {
    const res = await request(app).post('/api/auth/signup').send({ fullName: 'X', email: 'x@ex.com', password: '123' });
    expect(res.statusCode).toEqual(400);
  });
  it('No Token Fail', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.statusCode).toEqual(401);
  });
});