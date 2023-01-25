import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from './pages/index'
import { Navbar } from './components/index'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element={<Home/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
