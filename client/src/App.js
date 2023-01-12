import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Readers from './components/readers';

import './App.css';

const baseUrl = 'http://localhost:5000'

function App() {
  const [task, setTasks] = useState("");
  const [tasksList, setTasksList] = useState([]);
  
  const fetchTasks = async () => {
    const data = await axios.get(`${baseUrl}/gettasks`)
    const tasks = data.data.tasks
    console.log(data.data.tasks)
    setTasksList(tasks);
    console.log('DATA: ', tasks)
  }

  const handleChange = e => {
    setTasks(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/addtask/${task}`)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (tid) => {
    try {
      await axios.delete(`${baseUrl}/deletetask/${tid}`)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleUpdate = async (tid) => {
    try {
      await axios.put(`${baseUrl}/updatetask/${tid}`)
    } catch (error) {
      console.error(error.message)
    }
  }
  
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task</label>
        <input
        onChange={handleChange}
        type="text"
        name="task"
        id="task"
        />
        <button type='submit'>Submit</button>
        </form>
      </section>
      <section>
        <ul>
          {console.log("TASKS LIST: ", tasksList)}
          {tasksList && tasksList.length > 0 ? 
            tasksList.map((task, index) => {
                return <li key={index}>{task.description} completed:{String(task.completed)} <span className='hide-tid'> task_id: {task.tid} </span> <button onClick={() => handleDelete(task.tid)}>Delete task</button> <button onClick={() => handleUpdate(task.tid)}>Change Status</button></li>
          }): <p>loading...</p>}
        </ul>
      </section>
    </div>
  )
}

export default App