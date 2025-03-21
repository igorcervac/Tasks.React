import { useContext, useEffect, useState } from "react";
import ITask from './Task'
import IState from "./State";
import { title } from "process";
import TasksContext from "./TasksContext";

const App = () => {  

    // const selectState = {id: -1, name: 'Select state'}

    const [states, setStates] = useState<IState[]>([]);
    const [stateId, setStateId] = useState<number>(/*selectState.id*/1);

    const {taskService, stateService} = useContext(TasksContext)!;

    useEffect(() => {
        const getData = async () => {
            const data = await stateService.getAll();
            setStates([/*selectState,*/ ...data]);
        }

        getData();
    });

    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const getData  = async () => {
            const data = await taskService.getAll();
            setTasks(data);
        }

        getData();

    }, []);    

    const [description, setDescription]= useState<string>('');
    
    const addTask = (description: string) => {
        const newTask: ITask = { id: tasks.length + 1, title: title, description: description, done: false, stateId: stateId };
        console.log(newTask);
        setTasks([...tasks, newTask]);
        setDescription('');
        setStateId(1);
        taskService.add(newTask);
    }

    const deleteTask = (id: number): void => {
        setTasks(tasks.filter(x => x.id !== id));
        taskService.delete(id);
    }

    const toggleTask = (task: ITask): void => {
        const toggledTask = {...task, done: !task.done};
        setTasks(tasks.map(x => x.id !==  task.id ? x : toggledTask));
        taskService.update(toggledTask);
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
                                <button type="button" className="btn btn-primary col-xs-12"  onClick={() => {
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
                                                <span>{x.description}</span>
                                            </label> 
                                            <span>({states.find(y => y.id === x.stateId)?.name})</span>
                                            <button className="btn btn-primary" style={{alignSelf: "center"}} onClick={() => deleteTask(x.id)}>Delete</button>
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