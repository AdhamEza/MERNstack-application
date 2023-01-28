import './TaskDetails.css'
import { useTasksContext } from '../../hooks/useTasksContext'


const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()
  const handleClick = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (response.of) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className='task-details'>
      <h4>{task.title}</h4>
      <p><strong>Student:</strong>&nbsp;&nbsp;{task.student}</p>
      <p><strong>Points:</strong>&nbsp;&nbsp;{task.points}</p>
      <p><strong>Result:</strong>&nbsp;&nbsp;{task.result}</p>
      <p>{task.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default TaskDetails
