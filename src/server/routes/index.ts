import { Router } from 'express';

import apiRouter from './api';
import authRouter from './auth';

const rootRouter = Router();

rootRouter.use('/api', apiRouter)
rootRouter.use('/auth', authRouter)

export default rootRouter;