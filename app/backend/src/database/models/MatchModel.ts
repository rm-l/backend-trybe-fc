import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'matches',
  },
);

TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'away_team_id' });

TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'home_team_id' });

MatchModel.belongsTo(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

MatchModel.belongsTo(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });

export default MatchModel;
