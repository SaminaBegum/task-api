const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Welcome to the Task API!");
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
let tasks = []; 
let taskId = 1; 

app.get("/tasks", (req, res) => {
  res.status(200).json({ tasks });
});

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
  
    const newTask = { id: taskId++, title, description };
    tasks.push(newTask);
  
    res.status(201).json({ task: newTask });
  });
  app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
  
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    res.status(200).json({ task });
  });
  app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
  
    task.title = title;
    task.description = description;
  
    res.status(200).json({ task });
  });
  app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
  
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  });
        