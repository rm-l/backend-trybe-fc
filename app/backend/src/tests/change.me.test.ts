import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel'
import { Response } from 'superagent';
import ITeam from '../api/interfaces/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams test', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('tests findall', async function() {
    const result: ITeam[] = [
      new TeamModel({ id: 1, teamName: 'Avaí/Kindermann' }),
      new TeamModel({ id: 2, teamName: 'Bahia' }),
    ];

    sinon.stub(TeamModel, 'findAll').resolves(result as TeamModel[]);

    const response = await chai.request(app).get('/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(result);

  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
