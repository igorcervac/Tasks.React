import IStorageService from "./IStorageService";
import ITask from "./Task";

class ApiStorageService implements IStorageService {
    apiUrl: string;

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }

    async getAll(): Promise<ITask[]> {
        const response = await fetch(this.apiUrl, {
            headers: {
            "Access-Control-Allow-Origin": "*"
            }
        });
        const json = await response.json();
        return json;
    }

    async add(task: ITask): Promise<ITask>{
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
            "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"},
            body: JSON.stringify(task)
        });
        const json = await response.json();
        return json;
    }

    async update(task: ITask): Promise<void> {
        await fetch(`${this.apiUrl}/${task.id}`, {
            method: 'PUT',
            headers: {
            "Access-Control-Allow-Origin": "*",
                "content-type": "application/json"},
            body: JSON.stringify(task)
        });       
    }

    async delete(id: number): Promise<void> {
        await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
            "Access-Control-Allow-Origin": "*"
            }
        });  
    }
}

const storageService: IStorageService = new ApiStorageService('https://tasks-api-100.azurewebsites.net/api/tasks');
export default storageService;