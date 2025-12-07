import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getUserCreations, completeWorkout, getWorkoutStats } from '../controllers/userController.js';


const userRouter = express.Router();


userRouter.get('/creations', auth, getUserCreations);
userRouter.post('/complete-workout', auth, completeWorkout);
userRouter.get('/workout-stats', auth, getWorkoutStats);


export default userRouter;