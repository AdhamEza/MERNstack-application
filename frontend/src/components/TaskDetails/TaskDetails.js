import './TaskDetails.css'

const TaskDetails = ({ task }) => {
  return (
    <div className='task-details'>
      <h4>{task.title}</h4>
      <p><strong>Student:</strong>&nbsp;&nbsp;{task.student}</p>
      <p><strong>Points:</strong>&nbsp;&nbsp;{task.points}</p>
      <p><strong>Result:</strong>&nbsp;&nbsp;{task.result}</p>
      <p>{task.createdAt}</p>
    </div>
  )
}

export default TaskDetails
