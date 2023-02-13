import './TaskDetails.css'
import { useTasksContext } from '../../hooks/useTasksContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()
 
  const handleClick = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (response.ok) {
        dispatch({type: 'DELETE_TASK', payload: json})
    }
  }

  return (
    <div className='task-details'>
      <h4>{task.title}</h4>
      <p><strong>Student:</strong>&nbsp;&nbsp;{task.student}</p>
      <p><strong>Points:</strong>&nbsp;&nbsp;{task.points}</p>
      <p><strong>Result:</strong>&nbsp;&nbsp;{task.result}</p>
      <p><div className='date'>Updated {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</div></p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default TaskDetails
