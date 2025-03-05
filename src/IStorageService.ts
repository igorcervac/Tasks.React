import ITask from "./Task";

export default interface IStorageService {
    getAll(): Promise<ITask[]>;
    add(task: ITask): Promise<ITask>;
    update(task: ITask): Promise<void>;
    delete(id: number): Promise<void>;
}