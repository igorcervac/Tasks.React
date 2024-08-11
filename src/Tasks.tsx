import { useEffect, useState } from "react";
import ITask from './Task'

const Tasks = () => {

    useEffect(() => {
        const initialTasks: ITask[]  = [
        {
            id: 1,
            description: 'Task',
            done: false
        },
        {
            id: 2,
            description: 'Task 2',
            done: false
        }];
        setTasks(initialTasks);
    }, []);

    const [tasks, setTasks] = useState<ITask[]>([ {
        id: 1,
        description: 'Task',
        done: false
    }]);

    const [description, setDescription]= useState<string>('');
    
    const addTask = (description: string) => {
        const newTask: ITask = { id: tasks.length+1, description: description, done: false};
        setTasks([...tasks, newTask]);
        setDescription('');
    }

    return (<div>
        <h1>Tasks</h1>
        <p>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <button type="button" onClick={() => {
                if (description) {
                    addTask(description)
                }
                else {
                    alert('Please enter the task description');
                }
            }}>Add</button>
        </p>
        <p>
            <ul>
                {
                    tasks.map(x => 
                        <li key={x.id}>
                            {x.description}
                        </li>)
                }
            </ul>
        </p>
    </div>)
}

export default Tasks;