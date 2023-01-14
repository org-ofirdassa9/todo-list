import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Main from './main';

const baseUrl = 'http://localhost:5000'

function Tasks({ uid }) {
    const [task, setTasks] = useState("");
    const [tasksList, setTasksList] = useState([]);
    // const [taskDescription, setTaskDescription] = useState(task.description);
    
    const fetchTasks = async () => {
      const data = await axios.get(`${baseUrl}/gettasks`)
      const tasks = data.data.tasks
      setTasksList(tasks);
      console.log('ALL TASKS: ', tasks)
    }
  
    const handleChange = e => {
      setTasks(e.target.value);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (task) {
              const res = await axios.post(`${baseUrl}/addtask`, {
                  data: {
                    task: task
                  }
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
        console.error(error.message)
      }
    }
  
    const handleDelete = async (taskid) => {
      try {
        console.log(taskid)
        if (taskid) {
          const res = await axios.delete(`${baseUrl}/deletetask`, {
            params: {
              tid: taskid
            }
        });
        console.log('DELETE: ', res)
      }
        fetchTasks();
      } catch (error) {
        console.error(error.message)
      }
    }
  
    const handleUpdateStatus = async (task) => {
      try {
        console.log(task)
        if (task) {
          const res = await axios.put(`${baseUrl}/updatetaskstatus`, {
            data: {
              task
            }
        });
        console.log('UPDATE STATUS: ', res)
      }
        fetchTasks();
      } catch (error) {
        console.error(error.message)
      }
    }

    // const handleUpdateDescription = async (task) => {
    //   try {
    //     console.log(task)
    //     if (task) {
    //       const res = await axios.put(`${baseUrl}/updatetaskdescription`, {
    //         data: {
    //           task
    //         }
    //     });
    //     console.log('UPDATE DESCRIPTION: ', res)
    //   }
    //     fetchTasks();
    //   } catch (error) {
    //     console.error(error.message)
    //   }
    // }

    useEffect(() => {
      fetchTasks();
    }, []);

    return (
        <div>
          <section>
            <form>
            <label htmlFor="task">Task</label>
            <input
            onChange={handleChange}
            type="text"
            name="task"
            id="task"
            />
            <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
          </section>
          <section>
          <ul>
              {tasksList && tasksList.length > 0 ?
                tasksList.map((task, index) => {
                    return <li key={index}>{task.description}
                      {/* <input type="text" value={task.description} onChange={(e) => setTaskDescription(e.target.value)} /> */}
                      completed:{String(task.completed)}
                      <span className='hide-tid'>
                        task_id: {task.tid}
                      </span> 
                      <button onClick={() => handleDelete(task.tid)}>Delete task</button>
                      {/* <button onClick={() => handleUpdateDescription(task)}>Update Description</button> */}
                      <button onClick={() => handleUpdateStatus(task)}>Change Status</button>
                    </li>
              }): tasksList && tasksList.length === 0 ? <p>No tasks found</p> 
              : <p>loading...</p>}
            </ul>
          </section>
          <Main />
        </div>
  )
}

export default Tasks;