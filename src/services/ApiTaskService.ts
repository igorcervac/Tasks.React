import IStorageService from "./ITaskService";
import ITask from "../Task";
import axios from "axios";

export default class ApiTaskService implements IStorageService {
    apiUrl: string;

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }

    async getAll(): Promise<ITask[]> {
        const response = await axios.get<ITask[]>(this.apiUrl, {
            headers: {
                "Access-Control-Allow-Origin": "*"
                }
            });

        return response.data;
    }

    async add(task: ITask): Promise<ITask>{
        const response = await axios.post<ITask>(this.apiUrl,
            task,
            {           
                headers: {
                    "Access-Control-Allow-Origin": "*"},
            });

        return response.data;
    }

    async update(task: ITask): Promise<void> {
        await axios.put(`${this.apiUrl}/${task.id}`, 
            task,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            });
    }       
    

    async delete(id: number): Promise<void> {
        await axios.delete(`${this.apiUrl}/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });  
    }
}