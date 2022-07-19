import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const messagesRouter = Router();

// you'd prolly query this from a database
const messages = [
	{
		id: 1,
		userid: 1,
		email: 'percy@derolo.com',
		message: 'The darkness demands your soul, Sylas'
	},
	{
		id: 2,
		userid: 1,
		email: 'percy@derolo.com',
		message: 'Your secret is safe with my indifference.'
	},
	{
		id: 3,
		userid: 2,
		email: 'grog@strongjaw.com',
		message: "Hello, I'd like to share the news of our lord and savior, my axe in your face!"
	}
];

// public endpoint that anyone can request and view
// hence no middleware
messagesRouter.get('/', (req, res) => {
	try {
		res.json(messages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'messages route failed', error: error.message });
	}
});

// private endpoint that gets messages by a certain author
// to view on their profile
// gotten from their jwt's payload
// hence the middleware
messagesRouter.get('/user', checkToken, (req, res) => {
	try {
		const usersMessages = messages.filter(msg => msg.userid === req.payload.id);
		res.json(usersMessages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'messages for user route failed', error: error.message });
	}
});

export default messagesRouter;

// you'd prolly import this from like ../../middlewares
// but I code it here so you can see how this all pieces together
// without a billion extra things in the way
function checkToken(req: Request, res: Response, next: NextFunction) {
	// check if they have any auth headers at all
	if (!req.headers.authorization) {
		res.status(403).json({ msg: 'missing authorization headers' });
		return;
	}

	const authHeader = req.headers.authorization.split(' ');

	if (authHeader[0] !== 'Bearer') {
		res.status(403).json({ msg: 'bearer scheme required' });
		return;
	}

    try {
        const payload = jwt.verify(authHeader[1], config.jwt.secret as string) as any;
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error);
		res.status(500).json({ msg: 'login rout failed', error: error.message });
    }
}
