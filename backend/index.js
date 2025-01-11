import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import credentials from './Middleware/credentials.js';
import corsOptions from './config/corsOptions.js';
import crudRoutes from './routes/crudRoutes.js';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = 3001;
// very important note if a controller requires authmiddleware it has to return accesstoken by accessing req.accessToken
const app = express();
app.use(credentials);
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.use('/crud', crudRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
export default app;
