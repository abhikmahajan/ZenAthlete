import express from 'express';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import supportRouter from './routes/supportRoutes.js';

import dotenv from "dotenv";
dotenv.config();


const app = express();
  
// Allow client origin and credentials so Clerk auth cookies can be sent cross-site
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use(clerkMiddleware());


app.get('/', (req, res) => {
  res.send('Welcome to the ZenAthlete Server!');
});



app.use('/api/personalised-plans', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);
app.use("/api/support",requireAuth(), supportRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
