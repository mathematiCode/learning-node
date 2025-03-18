import { readFile } from 'fs/promises';
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// mongoose
//   .connect('mongodb://localhost:27017/learning-node')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
  response.status(201).json({ message: 'Success!' });
});

app.get('/api/users', (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;
  if (!filter || !value) return response.status(201).json(mockUsers);
  else {
    const filteredUsers = mockUsers.filter(user =>
      user[filter].trim().toLowerCase().includes(value.trim().toLowerCase())
    );
    return response.status(201).json(filteredUsers);
  }
});

app.post('/api/users', (request, response) => {
  const { body } = request;
  console.log(request);
  const newUser = {
    id: mockUsers.length + 1,
    ...body,
  };
  mockUsers.push(newUser);
  return response.status(201).json(newUser);
});

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@doe.com', role: 'frontend' },
  { id: 2, name: 'Jane Doe', email: 'jane@doe.com', role: 'backend' },
  { id: 3, name: 'John Smith', email: 'john@smith.com', role: 'frontend' },
  { id: 4, name: 'Jane Smith', email: 'jane@smith.com', role: 'designer' },
];

app.get('/', async (request, response) => {
  response.send(await readFile('./home.html', 'utf-8'));
});

app.put('/api/users/:id', (request, response) => {
  const {
    params: { id },
    body,
  } = request;
  const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1)
    return response.status(404).json({ message: 'User not found' });
  mockUsers[userIndex] = { id: parseInt(id), ...body };
  return response.status(201).json(mockUsers[userIndex]);
});

app.patch('/api/users/:id', (request, response) => {
  const {
    params: { id },
    body,
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).json({ message: 'Invalid ID' });
  const userIndex = mockUsers.findIndex(user => user.id === parsedId);
  if (userIndex === -1)
    return response.status(404).json({ message: 'User not found' });
  mockUsers[userIndex] = { id: parsedId, ...mockUsers[userIndex], ...body };
  return response.status(201).json(mockUsers[userIndex]);
});

app.delete('/api/users/:id', (request, response) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).json({ message: 'Invalid ID' });
  const userIndex = mockUsers.findIndex(user => user.id === parsedId);
  if (userIndex === -1)
    return response.status(404).json({ message: 'User not found' });
  mockUsers.splice(userIndex, 1);
  return response.status(201).json({ message: 'User deleted' });
});

async function hello() {
  const txt = await readFile('./hello.txt', 'utf-8');
  console.log(txt);
}
hello();
