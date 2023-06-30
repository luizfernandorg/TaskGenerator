import './App.css'
import {useEffect, useState} from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])

  const fetchData = () => {
    console.log('Fetched Data')
    fetch('http://localhost:3000', {method: 'get'}).then( async (result) => {
      return await result.json()
    }).then( async data => {
      await setTasks(data)
    }).catch( (error) => {
      console.log(error)
    })
  }

  useEffect( () => {
    fetchData()
  }, [])

  return (
    <div className='myContainer'>
      <h1>Task Generator</h1>
        <TaskForm update={fetchData}/>
        <TaskList tasks={tasks} update={fetchData}/>
    </div>
  )
}

export default App
