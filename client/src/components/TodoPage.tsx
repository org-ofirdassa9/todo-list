import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Task } from '../types';
import Logout from './Logout';
import { User } from '../types';

const baseUrl = '//localhost:5000/api'

const TodoPage: React.FC = () => {
    let user: User | null = null;
    const location = useLocation();
    if (location.state != null) {
      user = location.state.user;
    }
    const [task, setTask] = useState<Task | null>(null);
    const [tasksList, setTasksList] = useState<Task[]>([]);
    
    const fetchTasks = async () => {
      if(user) {
        const resp = await axios.get(`${baseUrl}/gettasks`, {
            params: {
              user_id: user.id
            }}
        )
        const tasks = resp.data.tasks
        setTasksList(tasks);
        console.log('ALL TASKS: ', tasks)
      }
    }
  
    const handleAddTask = (task: Task) => {
        setTask(task);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (task && user) {
                const res = await axios.post(`${baseUrl}/addtask`, {
                    data: task,
                    user_id: user.id
                });
                if (res.status === 200 && '_id' in res.data) {
                    console.log('ADD TASK:', res)
                    fetchTasks();
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
          {user != null ? (
            <div>
            <h1>Hello {user.first_name} {user.last_name}</h1>
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
            <Logout />
          </div>
          ) : (
          <div>
            <p>You are not logged in</p>
            <a href='/login'><button>Log in</button></a>
            <a href='/signup'><button>Sign up</button></a>
            <button type='button' onClick={() => window.location.href = '/'}>Home Page</button>
          </div>
        )}
        </div>
    )

}

export default TodoPage;