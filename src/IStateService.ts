import State from "./State";

export default interface IStateService {
    getAll(): Promise<State[]>;
}