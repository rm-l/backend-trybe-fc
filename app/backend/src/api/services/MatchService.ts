import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../../database/models/MatchModel';
import Team from '../../database/models/TeamModel';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async findAll(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });

    return matches;
  }
}
