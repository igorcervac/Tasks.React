import IStateService from "./IStateService";
import IState from "./State";

class ApiStateService implements IStateService {   
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

const stateService: IStateService = new ApiStateService('https://tasks-api-100.azurewebsites.net/api/states');
export default stateService;
