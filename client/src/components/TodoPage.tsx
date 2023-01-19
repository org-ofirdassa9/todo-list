import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../types';

const baseUrl = '//localhost:5000/api'

const TodoPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get("user");
    const [task, setTask] = useState<Task | null>(null);
    const [tasksList, setTasksList] = useState<Task[]>([]);
    
    const fetchTasks = async () => {
        const data = await axios.get(`${baseUrl}/gettasks`)
        const tasks = data.data.tasks
        setTasksList(tasks);
        console.log('ALL TASKS: ', tasks)
    }
  
    const handleAddTask = (task: Task) => {
        setTask(task);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (task) {
                const res = await axios.post(`${baseUrl}/addtask`, {
                    data: task
                });
                if (res.status === 200 && '_id' in res.data) {
                    console.log('ADD TASK:', res)
                    fetchTasks();
                    setTask(null);
                } else {
                    console.log('ADD TASK:', res)
                }
            } else {
                console.error('No Task was supplied');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (tid: string) => {
        try {
          console.log(tid)
          if (tid) {
            const res = await axios.delete(`${baseUrl}/deletetask`, {
              params: {
                tid
              }
            });
            console.log('DELETE: ', res)
          }
          fetchTasks();
        } catch (error) {
          console.error(error)
        }
      }
    
      const handleUpdateStatus = async (tid: string) => {
        try {
          console.log(tid)
          if (tid) {
            const res = await axios.put(`${baseUrl}/updatetaskstatus`, {
              params: {
                tid
              }
            });
            console.log('UPDATE_STATUS: ', res)
          }
          fetchTasks();
        } catch (error) {
          console.error(error)
        }
      }


    useEffect(() => {
      fetchTasks();
    }, []);

    return (
        <div>
            <h1>Hello {user}</h1>
          <section>
            <form onSubmit={handleSubmit}>
            <label htmlFor="task">Task</label>
            <input
            onChange={(e) => handleAddTask({tid: '', description: e.target.value, completed: false})}
            type="text"
            name="task"
            id="task"
            />
            <button type='submit'>Submit</button>
            </form>
          </section>
          <section>
          <ul>
            {tasksList.length === 0 ? (
            <p>No tasks found</p>
            ) : (
            tasksList.map((task, index) => (
                <li key={index}>
                    <span className='hide-tid'>
                        task_id: {!task.tid}
                    </span> 
                    <p>Description: {task!.description}</p>
                    <p>Completed: {String(task!.completed)}</p>
                    <button onClick={() => handleDelete(task.tid)}>Delete</button>
                    <button onClick={() => handleUpdateStatus(task.tid)}>Change Status</button>
                </li>
                ))
            )}
        </ul>
          </section>
        </div>
    )

}

export default TodoPage;