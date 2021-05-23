/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import express from 'express';
import cors from 'cors';

// Parse .env file into environment variables
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes';

const PORT: string | number = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use('/api', routes);
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
