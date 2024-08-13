import IStorageService from "./IStorageService";
import ITask from "./Task";

class LocalStorageService implements IStorageService{
    get tasks():ITask[] {
        const tasksAsJson = localStorage.getItem('tasks') ?? '[]';
        return JSON.parse(tasksAsJson);
    }
    

    set tasks(tasks: ITask[]) {
        const json = JSON.stringify(tasks);
        localStorage.setItem('tasks', json);
    }
}

const service: IStorageService = new LocalStorageService();
export default service;