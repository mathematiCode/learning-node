import { readFile } from 'fs/promises';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (request, response) => {
  response.send(await readFile('./home.html', 'utf-8'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function hello() {
  const txt = await readFile('./hello.txt', 'utf-8');
  console.log(txt);
}
hello();
