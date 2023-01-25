import './TaskForm.css'
import { useState } from 'react'

const TaskForm = () => {
  const[title, setTitle] = useState('')
  const[student, setStudent] = useState('')
  const[points, setPoints] = useState('')
  const[result, setResult] = useState('')
  const[error, setError] = useState(null)

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
    }
    if(response.ok){
      setTitle('')
      setStudent('')
      setPoints('')
      setResult('')
      setError(null)
      console.log('new assignment result added', json)
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
      />
      <label>Student Name:</label>
      <input
      type="text"
      onChange={(e) => setStudent(e.target.value)}
      value={student} 
      />
      <label>Points:</label>
      <input
      type="number"
      onChange={(e) => setPoints(e.target.value)}
      value={points} 
      />
      <label>Result:</label>
      <input
      type="text"
      onChange={(e) => setResult(e.target.value)}
      value={result} 
      />

      <button>Add Student Result</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TaskForm
