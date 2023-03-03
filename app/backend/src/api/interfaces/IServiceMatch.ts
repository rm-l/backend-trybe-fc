import IMatch from './IMatch';

export default interface IMatchService {
  findAll(): Promise<IMatch[]>
  findFinished(id:number): Promise<void>
  updateMatch(id: number, homeGoals: number, awayGoals: number): Promise<void>
}
