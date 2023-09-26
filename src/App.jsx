import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const getISTTime = () => {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()

    let time = ""
    if (hoursIST < 12) {
      time = hoursIST + " "+ minutesIST + "AM"
    }
    else {
      time = (hoursIST - 12) + " " + minutesIST + "PM"
    }
    return time
  }


  const handleAdd = () => {
    if (task) {
      let _tasks = tasks.slice();
      _tasks.push({ name: task, status: "todo", time: getISTTime() })
      setTasks(_tasks)
      setTask("")
    }
  }

  const handleStatus = (index, status) => {
    let _tasks = tasks.slice();
    _tasks[index].status = status;
    _tasks[index].time = getISTTime();
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
                  <div>{task.time}</div>
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
                  <div>{task.time}</div>
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
                  <div>{task.time}</div>
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