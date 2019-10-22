const express = require('express');

const server = new express();

server.use(express.json());

const projects = [];
let i = 0;

server.use((req, res, next) => {
  i++;

  console.log(`Total number of requests: ${i}`);

  next();
});

function checkIdExist(req, res, next) {
  const { id } = req.params;

  if(projects.findIndex((item, i) => { return item.id == id }) < 0){
    return res.json({ error: 'Id not found'});
  }

  return next();
}

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const tasks = [];

  projects.push({'id': id, 'title': title, 'tasks':tasks});
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;  
  const index = projects.findIndex((item, i) => { return item.id == id });
  
  projects[index].title = title;

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExist, (req, res) => {
  const { id } = req.params;  
  const { title } = req.body;
  const index = projects.findIndex((item, i) => { return item.id == id });
  
  console.log(id);

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.listen(3000);