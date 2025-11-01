
import './tasklist.css';

const TaskList = ({ tasks }) => {
	let taskBackground = null;

	switch (tasks.priority) {
		case 'High':
			taskBackground = 'high-priority';
			break;
		case 'Medium':
			taskBackground = 'medium-priority';
			break;
		case 'Low':
			taskBackground = 'low-priority';
			break;
		default:
			break;
	}
  return (
    <div className="list-container">
      {tasks.map(task => (
        <div key={task.id} className={`task-details ${taskBackground}`}>
          <h3 className='title'>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {task.due_date}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
