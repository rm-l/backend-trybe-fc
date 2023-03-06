import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { Model } from 'sequelize';
import {allTeams} from './mock'
import { matchesMock } from './matchmock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota "/teams"', () => {

  afterEach(() => sinon.restore());

  it('it tests getAll', async () => {
    sinon.stub(Model, 'findAll').resolves(allTeams);
    const { status, body } = await chai.request(app).get('/teams');
    expect(body).to.be.deep.eq(allTeams);
    expect(status).to.be.eq(200);
  });

  it ('tests GetById', async () => {
    sinon.stub(Model, 'findOne').resolves(allTeams[5]);
    const { status, body } = await chai.request(app).get('/teams/5');
    expect(body).to.be.deep.eq(allTeams[5]);
    expect(status).to.be.eq(200);
  });

  it('tests login', async () => {
    const { status } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    expect(status).to.be.eq(200);
  });

  it('tests token required', async () => {
    const { status, body } = await chai.request(app).patch('/matches/5');
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({ "message": "Token not found" });
  });

  it('tests leaderboard', async function () {
    sinon.stub(Model, 'findAll').resolves(matchesMock as unknown as Model[]);
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.eq(200);
  });


  });

