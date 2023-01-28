import './TaskForm.css'
import { useState } from 'react' 
import { useTasksContext } from '../../hooks/useTasksContext'


const TaskForm = () => {
  const { dispatch } = useTasksContext()
  const[title, setTitle] = useState('')
  const[student, setStudent] = useState('')
  const[points, setPoints] = useState('')
  const[result, setResult] = useState('')
  const[error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const task = {title, student, points, result}

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
      setTitle('')
      setStudent('')
      setPoints('')
      setResult('')
      setError(null)
      setEmptyFields([])
      console.log('new assignment result added', json)
      dispatch({type: 'CREATE_TASK', payload: json})
    }
  }


  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Assignment Result</h3>

      <label>Assignment Title:</label>
      <input
      type="text"
      onChange={(e) => setTitle(e.target.value)}
      value={title} 
      className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Student Name:</label>
      <input
      type="text"
      onChange={(e) => setStudent(e.target.value)}
      value={student} 
      className={emptyFields.includes('student') ? 'error' : ''}
      />
      <label>Points:</label>
      <input
      type="number"
      onChange={(e) => setPoints(e.target.value)}
      value={points} 
      className={emptyFields.includes('points') ? 'error' : ''}
      />
      <label>Result:</label>
      <input
      type="text"
      onChange={(e) => setResult(e.target.value)}
      value={result} 
      className={emptyFields.includes('result') ? 'error' : ''}
      />

      <button>Add Student Result</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TaskForm
