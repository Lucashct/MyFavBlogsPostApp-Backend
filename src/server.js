import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { linksStorage, selectLinksFromDb, updateLinkFromDb, updateRemoveLinkFromDb } from './controllers/LinksController.js'

const app = express();
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))

//ROUTES
app.get('/', async (req, res) => {
  await linksStorage();
  res.status(201).json({activity: 'done'})
});

app.get('/links', async (req, res) => {
  const list = await selectLinksFromDb();
  
  res.status(200).json(list);
});

app.post('/links/update', async (req, res) => {
  const update = await updateLinkFromDb(req.body);

  res.status(201).json({...update, ...req.body});
})

app.post('/links/delete', async (req, res) => {
  const remove = await updateRemoveLinkFromDb(req.body);

  res.status(201).json(remove)
})

//EXEC APP
app.listen(process.env.PORT, () => {
  console.log(`Aplicação rodando na porta ${process.env.PORT}`)
})