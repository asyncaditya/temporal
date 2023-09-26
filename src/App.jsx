import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  const handleAdd = () => {
    if (task) {
      let _tasks = tasks.slice();
      _tasks.push({ name: task, status: "todo" })
      setTasks(_tasks)
      setTask("")
    }
  }

  const handleStatus = (index, status) => {
    let _tasks = tasks.slice();
    _tasks[index].status = status;
    setTasks(_tasks)
  }

  return (
    <>
      <div className='userInput'>
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className='board'>
        <div className='todo'>
        <div className='title'>Todo</div>
          {tasks.map((task, index) => {
            if (task.status === "todo") {
              return (
                <div className='task'>
                  <div>{task.name}</div>
                  <div className='buttons'>
                    <button disabled>Prev</button>
                    <button onClick={() => handleStatus(index, "inProgress")}>Next</button>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className='inProgress'>
          <div className='title'>In Pogress</div>
          {tasks.map((task, index) => {
            if (task.status === "inProgress") {
              return (
                <div className='task'>
                  <div>{task.name}</div>
                  <div className='buttons'>
                    <button onClick={() => handleStatus(index, "todo")}>Prev</button>
                    <button onClick={() => handleStatus(index, "done")}>Next</button>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className='done'>
        <div className='title'>Done</div>
          {tasks.map((task, index) => {
            if (task.status === "done") {
              return (
                <div className='task'>
                  <div>{task.name}</div>
                  <div className='buttons'>
                    <button onClick={() => handleStatus(index, "inProgress")} >Prev</button>
                    <button disabled>Next</button>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default App;