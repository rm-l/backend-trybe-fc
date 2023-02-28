import { ModelStatic } from 'sequelize';
import IServiceTeam from '../interfaces/IServiceTeam';
import Team from '../../database/models/TeamModel';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
