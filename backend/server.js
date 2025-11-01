const express = require ('express');
const sqlite3 = require ('sqlite3').verbose();

const app = express();

app.cors = require('cors');
app.use (app.cors());
app.use (express.json());



const db = new sqlite3.Database('./tasks_tracker.db',(err)=>{
	if(err){
		console.log(`db err:${err.message}`);
	}else{
		console.log('db connected');
	}
});

db.serialize(()=>{
	db.run(`CREATE TABLE IF NOT EXISTS tasks (
		id INTEGER PRIMARY KEY AUTOINCREMENT, 
		title TEXT NOT NULL, 
		description TEXT,
		priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL DEFAULT 'Medium',
		due_date TEXT NOT NULL,  
		status TEXT CHECK(status IN ('Open', 'In Progress', 'Done')) NOT NULL DEFAULT 'Open', 
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`);
});

app.listen(3000,()=>{
	console.log('Server is running on port 3000')
});

app.get('/tasks',  async (req,res)=>{
	const query =`SELECT * FROM tasks`

	db.all(query,(err,rows)=>{
		if(err){
			res.status(500).json({error:err.message});
			return;
		}	
		res.json(rows);
	})
});

app.post("/tasks",(req,res)=>{
	const {title,description,priority,status,due_date} =req.body
	const taskQuery = `INSERT INTO tasks (title,description,priority,status,due_date) VALUES (?,?,?,?,?)`;
	let data = db.run(taskQuery,[title,description,priority,status,due_date]);
	res.json(data)
});


app.patch("/tasks/:id",(req,res)=>{
	const {id} = req.params;
	const {priority,status} =req.body;	
	const updateQuery = `UPDATE tasks SET  priority = ?, status = ? WHERE id = ?`;	
	
	db.run(updateQuery,[priority,status,id],function(err){
		if(err){
			res.status(500).json({error:err.message});
			return;
		}			

		res.json({message:`Task with ID ${id} updated successfully`,changes:this.changes});
	});
});
