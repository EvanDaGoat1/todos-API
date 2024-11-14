const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let todos = [
  { id: 1, task: "Learn Node.js", completed: false, priority: "medium" },
  { id: 2, task: "Build a REST API", completed: false, priority: "medium" }
];

// Question 1: Add a "Priority" Field to the To-Do API

// POST /todos - Add a new to-do item with priority
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
    priority: req.body.priority || "medium"
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos - Retrieve all to-do items or filter by completed status
app.get('/todos', (req, res) => {
  const completedFilter = req.query.completed;
  if (completedFilter === 'true' || completedFilter === 'false') {
    const isCompleted = completedFilter === 'true';
    const filteredTodos = todos.filter(todo => todo.completed === isCompleted);
    return res.json(filteredTodos);
  }
  res.json(todos);
});

/* 
To test Question 3, you need to comment out the GET endpoint below.
*/

// PUT /todos/complete-all - Mark all to-do items as completed
app.put('/todos/complete-all', (req, res) => {
  todos = todos.map(todo => ({ ...todo, completed: true }));
  res.json({ message: "All to-do items marked as completed." });
});

// PUT /todos/:id - Update an existing to-do item
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).send("To-Do item not found");
  }
  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.priority = req.body.priority || todo.priority;
  res.json(todo);
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).send("To-Do item not found");
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
