import ITask from "./Task";

export default abstract class IStorageService {
    abstract get tasks():ITask[]
    abstract set tasks(tasks: ITask[])
}