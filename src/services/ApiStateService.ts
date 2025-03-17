import IStateService from "./IStateService";
import IState from "../State";

export default class ApiStateService implements IStateService {   
    apiUrl: string;
    
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getAll():Promise<IState[]> {
        const response = await fetch(this.apiUrl);
        const json = await response.json();
        return json;
    }
}