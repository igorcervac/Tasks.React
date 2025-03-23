import IStateService from "./IStateService";
import IState from "../State";
import axios from "axios";

export default class ApiStateService implements IStateService {   
    apiUrl: string;
    
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getAll():Promise<IState[]> {
        const response = await axios.get<IState[]>(this.apiUrl, {
            headers: { 
                "Access-Control-Allow-Origin": "*",
            }
        });

        return response.data;
    }
}