import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Aircraft Maintenance System API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
