
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';  
import TaskForm from './components/TaskForm/TaskForm.jsx';  
import './App.css'

function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskForm />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
