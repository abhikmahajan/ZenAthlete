import express from 'express';
import { auth } from '../middlewares/auth.js';

import {personalPlans, nutrition} from '../controllers/aiController.js';

const aiRouter = express.Router();

// We mount this router at '/api/personalised-plans' in server.js
// so the route path here should be relative ('' or '/')
aiRouter.post('/', auth, personalPlans);
aiRouter.post('/nutrition', auth, nutrition);

export default aiRouter;