interface IMatch {
  id?: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamId: number;
  inProgress: boolean;
  homeTeam?: {
    teamName: string;
  };
  awayTeam?: {
    teamName: string;
  };
  victories?: number;
}

export default IMatch;
