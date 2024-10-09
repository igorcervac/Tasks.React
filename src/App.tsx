import { useEffect, useState } from "react";
import ITask from './Task'
import storageService from "./LocalStorageService";

const App = () => {  

    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        setTasks(storageService.getAll());
    }, []);

    const [description, setDescription]= useState<string>('');
    
    const addTask = (description: string) => {
        const newTask: ITask = { id: tasks.length + 1, description: description, done: false };
        setTasks([...tasks, newTask]);
        setDescription('');
        storageService.add(newTask);
    }

    const deleteTask = (id: number): void => {
        setTasks(tasks.filter(x => x.id !== id));
        storageService.delete(id);
    }

    const toggleTask = (task: ITask): void => {
        const toggledTask = {...task, done: !task.done};
        setTasks(tasks.map(x => x.id !==  task.id ? x : toggledTask));
        storageService.update(toggledTask);
    }

    return (
          <div className="container">
            <div className="row">
                <div className="col-xs-6 col-xs-offset-3">
                    <h2 style={{textAlign:'center'}}>Tasks (React)</h2>
                    <div className="row">
                        <div className="col-xs-10">
                            <input className="col-xs-12" type="text" value={description} placeholder="Write your task"
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="col-xs-2">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                if (description) {
                                    addTask(description)
                                }
                                else {
                                    alert('Please enter the task description');
                                }
                            }}>Add</button>
                        </div>
                    </div>     
                    <div className="row">    
                        <div className="col-xs-12"> 
                            <ul className="list-group">
                                {
                                    tasks.map(x => 
                                        <li key={x.id} className="list-group-item">
                                            <input checked={x.done} id="checkTask" type="checkbox" onChange={() => toggleTask(x)}></input>
                                            <label htmlFor="checkTask">
                                                <span>{x.description}</span>
                                            </label>                            
                                            <button className="btn btn-primary" onClick={() => deleteTask(x.id)}>Delete</button>
                                        </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;