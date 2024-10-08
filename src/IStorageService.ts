import ITask from "./Task";

export default interface IStorageService {
    getAll(): ITask[];
    add(task: ITask): void;
    update(task: ITask): void;
    delete(id: number): void;
}