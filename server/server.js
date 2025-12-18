import express from 'express';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import supportRouter from './routes/supportRoutes.js';

import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use(clerkMiddleware());


app.get('/', (req, res) => {
  res.send('Welcome to the ZenAthlete Server!');
});



app.use('/api/personalised-plans', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);
app.use("/api/support",requireAuth(), supportRouter);

export default app;


