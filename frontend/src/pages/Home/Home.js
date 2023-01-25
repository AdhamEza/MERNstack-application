import './Home.css'
import { useEffect, useState } from 'react'
import { TaskDetails , TaskForm } from '../../components/index'

const Home = () => {
  const [tasks, setTasks] = useState(null)

    useEffect(() => {

      const fetchTasks = async () => {
        const response = await fetch('/api/tasks')
        const json = await response.json()

        if (response.ok) {
            setTasks(json)
        }

      }

      fetchTasks()

    }, [])
    
    return (

    <div className='home'>
      <div className='tasks'>
        {tasks && tasks.map((task) => (
          <TaskDetails key={task._id} task={task} />
        ))}
      </div>
      <TaskForm />
    </div>
  )
}

export default Home
