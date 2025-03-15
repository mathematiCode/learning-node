const { readFile, readFileSync } = require('fs').promises;
const { name, age } = require('./my-module');
const express = require('express');

app = express();

app.get('/', async (request, response) => {
  response.send(await readFile('./home.html', 'utf-8'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

async function hello() {
  const txt = await readFile('./hello.txt', 'utf-8');
  console.log(txt);
  console.log(`My name is ${name} and I am ${age} years old`);
}
hello();
