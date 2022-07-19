import { Router } from 'express';

import messagesRouter from './messages';

const apiRouter = Router();

apiRouter.use('/messages', messagesRouter);

export default apiRouter;