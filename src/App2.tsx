import { useContext, useEffect, useState } from "react";
import ITask from './Task'
import IState from "./State";
import TasksContext from "./TasksContext";

const App2 = () => {

    const [states, setStates] = useState<IState[]>([]);
    const [stateId, setStateId] = useState<number>(1);

    const [filters, setFilters] = useState<IState[]>([]);
    const allFilter = {id: -1, name: 'All'};
    const [filterId, setFilterId] = useState<number>(allFilter.id);

    const {taskService, stateService} = useContext(TasksContext)!;

    useEffect(() => {
        const getData = async () => {
            const data = await stateService.getAll();
            setStates(data);
            setFilters([allFilter, ...data]);
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

    });    

    const [title, setTitle]= useState<string>('');
    const [description, setDescription]= useState<string>('');

    const addTask = async () => {
        let newTask: ITask = { id: 0, title: title, description: description, done: false, stateId: stateId };
        newTask = await taskService.add(newTask);

        setTasks([...tasks, newTask]);

        setTitle('');
        setDescription('');
        setStateId(1);
    }

    const deleteTask = async (id: number) => {
        await taskService.delete(id);
        setTasks(tasks.filter(x => x.id !== id));
    }

    return (<div id="container">
                <header>
                    <h1>Tasks</h1>
                </header>
                <main>
                    <div className="title">
                        <label htmlFor="title" className="title">Title</label>
                        <input id="title" type="text" className="title" value={title} placeholder="Task title"
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea id="description"  value={description} placeholder="Task description"
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="status">
                        <label>Status</label>
                        <select  value={stateId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        setStateId(+e.target.value);}}>
                            {states.map(x => (<option value={x.id}>{x.name}</option>))}
                        </select>
                    </div>
                    <div className="add">
                        <button onClick={async () => {
                                                if (title) {
                                                    await addTask()
                                                }
                                                else {
                                                    alert('Please enter the task title');
                                                }
                                            }}>
                            Add
                        </button>
                    </div>                    
                    <div className="list">
                        <div className="tasks-filter">
                            <label>Tasks</label>
                            <div className="filter">
                                <span>Filter: </span>
                                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setFilterId(+e.target.value)}}> 
                                    {filters.map(x=> (<option value={x.id}>{x.name}</option>))}                        
                                </select>
                            </div>
                        </div>
                        {
                            tasks.filter(x => filterId === -1 || x.stateId === filterId).map(x => (
                                <div className="task" key={x.id}>
                                    <span className="title">{x.title}</span>
                                    <span className="status">{states.find(y => y.id === x.stateId)?.name}</span>
                                    <div className="buttons">
                                        <button className="edit">Edit</button>
                                        <button className="delete" onClick={async () => { await deleteTask(x.id); }}>Delete</button>
                                    </div>
                                </div>)
                            )
                        }            
                    </div>
                </main>
            </div>)
}

export default App2;