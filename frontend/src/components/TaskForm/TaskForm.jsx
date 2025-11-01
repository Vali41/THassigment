import { useState } from 'react';
import './taskform.css'

const TaskForm = () => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		priority: 'low',
		status: 'open',
		dueDate: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		try {
			const response = await fetch('http://localhost:3000/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			const data = await response.json();
			console.log('Server response:', data);
			// reset form after successful submit
			setFormData({
				title: '',
				description: '',
				priority: 'low',
				status: 'open',
				dueDate: ''
			});
		} catch (error) {
			console.error('Error posting task:', error);
		}
	};

	return (
		<div className='task-form-container'>
			<form className="task-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Task Title"
					className="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>
				<textarea
					placeholder="Task Description"
					className="description"
					rows={50}
					cols={100}
					name="description"
					value={formData.description}
					onChange={handleChange}
				></textarea>
				<select
					className="priority"
					name="priority"
					value={formData.priority}
					onChange={handleChange}
				>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
				<select
					className="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
				>
					<option value="open">Open</option>
					<option value="in-progress">In Progress</option>
					<option value="done">Done</option>
				</select>
				<input
					type="date"
					className="due-date"
					name="dueDate"
					value={formData.dueDate}
					onChange={handleChange}
				/>
				<button type="submit" className="add-task-button">Add Task</button>
			</form>
		</div>
	);
};

export default TaskForm;
