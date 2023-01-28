import './Home.css'
import { useEffect } from 'react'
import { TaskDetails , TaskForm } from '../../components/index'
import { useTasksContext } from '../../hooks/useTasksContext'

const Home = () => {
  const {tasks, dispatch} = useTasksContext()

    useEffect(() => {

      const fetchTasks = async () => {
        const response = await fetch('/api/tasks')
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_TASKS', payload: json})
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
