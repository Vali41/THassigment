import { useState,useEffect	 } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskList from '../TaskList/TaskList';
import TaskForm from '../TaskForm/TaskForm';

import './home.css';



const Home =() =>{
	const[tasks,setTasks]=useState([]);
	const[searchTerm,setSearchTerm]=useState("");

	const navigate = useNavigate();

	useEffect(()=>{
		fetch('http://localhost:3000/tasks')
		.then(res=>res.json())
		.then(data=>setTasks(data))
		.catch(err=>console.log(err));
	},[searchTerm]);
	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	}
	
	return(
		<>
		<div className="home-header">
			<input type="text" placeholder="Search..." onChange={handleSearch} className='search-input'/>	
			<button className='add-task-button' onClick={() => navigate('/tasks')}>Add Task</button>
		</div>
		<TaskList tasks={tasks} />
		
		</>
	)
}
export default Home;