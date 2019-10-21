const express = require('express');

const server = new express();

server.use(express.json());

const projects = [];

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const tasks = [];

  projects.push(`{"id": "${id}", "title": "${title}", "tasks": ${tasks}}`);
  
  console.log(projects[0].title);
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  console.log(title);
  console.log(projects[0].title);
  projects[projects.indexOf(id)].title = title;

  return res.json(projects);
})

server.listen(3000);