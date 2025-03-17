import { createContext } from "react";
import ITaskService from "./services/ITaskService";
import IStateService from "./services/IStateService";

const TasksContext = createContext<{taskService: ITaskService, stateService: IStateService} | null>(null);
export default TasksContext;