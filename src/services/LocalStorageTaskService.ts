import ITask from "../Task";
import ITaskService from "./ITaskService";

export default class LocalStorageTaskService implements ITaskService {   

    async getAll(): Promise<ITask[]> {
        return Promise.resolve(this.tasks);
    }

    async add(task: ITask): Promise<ITask>{
        this.tasks = [...this.tasks, task];
        return Promise.resolve(task);
    }

    async update(task: ITask): Promise<void> {
        this.tasks = this.tasks.map(x => x.id !== task.id ? x: task);
        return Promise.resolve();
    }

    async delete(id: number): Promise<void> {
        this.tasks = this.tasks.filter(x => x.id !== id);
        return Promise.resolve();
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