import ITask from "./Task";

export default interface IStorageService {
    get():ITask[],
    set(tasks: ITask[]): void
}