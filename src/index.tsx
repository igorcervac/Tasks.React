import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App2 from './App2'
import './App2.css'
import TasksContext from './TasksContext';
import ApiStateService from './services/ApiStateService';
import IStorageService from './services/ITaskService';
import ApiStorageService from './services/ApiTaskService';
import IStateService from './services/IStateService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const taskService: IStorageService = new ApiStorageService('https://tasks-api-100.azurewebsites.net/api/tasks');
const stateService: IStateService = new ApiStateService("https://tasks-api-100.azurewebsites.net/api/states");

root.render(
  <React.StrictMode>
    <TasksContext.Provider value={{taskService, stateService}}>
      <App2 />
    </TasksContext.Provider>
  </React.StrictMode>
);
