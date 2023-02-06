import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
let idEdit
function App() {
  const [tasks, settasks] = useState([
    { id: 1, task: "di hoc", isComplete: false },
    { id: 2, task: "lam bai tap", isComplete: false },
    { id: 3, task: "di da bong", isComplete: false },
    { id: 4, task: "danh nhau", isComplete: false },
  ])
  const [newTask, setNewTask] = useState("")
  const [editStatus,setEditStatus] = useState(true)
  
  const addTask = () => {
    settasks((prevTask) => {
      const newId = prevTask[prevTask.length - 1].id + 1
      return [...prevTask, {
        id: newId,
        task: newTask,
        isComplete: false
      }]
    })
  }

  const deleteTask = (idDel) => {
    const newTasks = tasks.filter((current) => current.id !== idDel)
    settasks(newTasks)
  }
  
const editTask = (data) => {
  let updateArr = []
  tasks.forEach((current) => {
    if (current.id === idEdit) {
      updateArr.push({ id: idEdit, task: data, isComplete: false })
    } else {
      updateArr.push(current)
    }
  })
  settasks(updateArr)
  setEditStatus(true)
  setNewTask("")
}
const updateTask = (taskUpdate,idUpdate) => {
  idEdit = idUpdate
    setNewTask(taskUpdate)
  setEditStatus(false)
}
const handleComp = (id) => {
  let arr = []
  console.log("id==",id);
tasks.forEach((current) => {
  if (current.id === id) {
    arr.push({id:id,task:current.task,isComplete:true})
  } else {
    arr.push(current)
  }
})
settasks(arr)
}
const btn = (editStatus) ? <button type='button' className='btn btn-success' onClick={addTask}>Ok</button>
 : <button value={newTask} type='button' className='btn btn-success' onClick={(e) => editTask(e.target.value)}>Update</button>

return (
  <div className="App my-4">
    <div>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      {btn}
    </div>
    <table className='table table-striped'>
      <thead>
        <tr>
          <td>Id</td>
          <td>Task</td>
          <td>Status</td>
          <td colSpan={2}>Action</td>
        </tr>
      </thead>
      <tbody>

        {
          tasks.map((current) =>
            <tr key={current.id}>
              <td>{current.id}</td>
              <td>{current.task}</td>
              <td>{current.isComplete}</td>
              <td>
                {(current.isComplete) ? <i class="bi bi-check-lg"></i> : <i className="bi bi-hourglass-bottom"></i>}
                </td>
              <td><button  className='btn btn-warning' onClick={() =>updateTask(current.task,current.id)} >Edit</button></td>
              <td><button  className='btn btn-danger' onClick={() => deleteTask(current.id)}>Del</button></td>
              <td><button className='btn btn-success' onClick={() =>handleComp(current.id)}>Complete</button></td>
            </tr>
          )
        }

      </tbody>
    </table>
  </div>

);
}

export default App;
