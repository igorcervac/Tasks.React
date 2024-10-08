import IStorageService from "./IStorageService";
import ITask from "./Task";

class LocalStorageService implements IStorageService {   

    getAll(): ITask[] {
        return this.tasks;
    }

    add(task: ITask): void{
        this.tasks = [...this.tasks, task];
    }

    update(task: ITask): void {
        this.tasks = this.tasks.map(x => x.id !== task.id ? x: task);
    }

    delete(id: number):void {
        this.tasks = this.tasks.filter(x => x.id !== id);
    }

    private get tasks(): ITask[] {
        const tasksAsJson = localStorage.getItem('tasks') ?? '[]';
        return JSON.parse(tasksAsJson);
    }    

    private set tasks(tasks: ITask[]) {
        const json = JSON.stringify(tasks);
        localStorage.setItem('tasks', json);
    }
}

const service: IStorageService = new LocalStorageService();
export default service;