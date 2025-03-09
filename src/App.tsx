import { useEffect, useState } from "react";
import ITask from './Task'
import storageService from "./ApiStorageService";
import IState from "./State";
import stateService from "./ApiStateService";

const App = () => {  

    const selectState = {id: -1, name: 'Select state'}

    const [states, setStates] = useState<IState[]>([]);
    const [stateId, setStateId] = useState<number>(selectState.id);

    useEffect(() => {
        const getData = async () => {
            const data = await stateService.getAll();
            setStates([selectState, ...data]);
        }

        getData();
    });

    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const getData  = async () => {
            const data = await storageService.getAll();
            setTasks(data);
        }

        getData();

    }, []);    

    const [description, setDescription]= useState<string>('');
    
    const addTask = (description: string) => {
        const newTask: ITask = { id: tasks.length + 1, description: description, done: false, stateId: stateId };
        console.log(newTask);
        setTasks([...tasks, newTask]);
        setDescription('');
        setStateId(-1);
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
                <div className="col-xs-4 col-xs-offset-4">
                    <h2 style={{textAlign:'center'}}>Tasks (React)</h2>
                    <div className="row">
                        <div className="col-xs-12">
                            <input className="col-xs-12" type="text" value={description} placeholder="Write your task"
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>                        
                    </div> 
                    <br/>
                    <div className="row">
                        <div className="col-xs-12">
                            <select id="states" className="col-xs-12" value={stateId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setStateId(+e.target.value);
                            }}>
                                {states.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
                            </select>
                        </div>
                    </div>  
                    <br/>
                    <div className="row">
                        <div className="col-xs-12">
                                <button type="button" className="btn btn-primary col-xs-4 col-xs-offset-4"  onClick={() => {
                                    if (description) {
                                        addTask(description)
                                    }
                                    else {
                                        alert('Please enter the task description');
                                    }
                                }}>Add</button>
                        </div>
                    </div> 
                    <br/>
                    <div className="row">    
                        <div className="col-xs-12"> 
                            <ul className="list-group">
                                {
                                    tasks.map(x => 
                                        <li key={x.id} className="list-group-item">
                                            <input checked={x.done} id="checkTask" type="checkbox" onChange={() => toggleTask(x)}></input>
                                            <label htmlFor="checkTask">
                                                <span>{x.description} ({states.find(y => y.id === x.stateId)?.name})</span>
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