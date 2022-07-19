import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const loginRouter = Router();

// fake login credentials, you'd prolly query this from mysql
// but I'm skipping that step so you can see the baaaaarebones needed for auth
const userData = {
	id: 1,
	email: 'percy@derolo.com',
	password: 'badnews'
};

loginRouter.post('/', authenticateCredentials, (req, res) => {
	try {
		// you can create whatever payload you want for the token
		// just remember it's public info so nothing sensitive
		const token = jwt.sign(
			{ group: 'Vox Machina', ...req.payload },
			config.jwt.secret as string,
			{
				expiresIn: config.jwt.expires
			}
		);
		res.json({ msg: 'login success', token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'login route failed', error: error.message });
	}
});

export default loginRouter;

// you'd prolly import this from like ../../middlewares
// but I code it here so you can see how this all pieces together
// without a billion extra things in the way
function authenticateCredentials(req: Request, res: Response, next: NextFunction) {
	const attemptedEmail = req.body.email;
	const attemptedPassword = req.body.password;

	// check if email exists
	if (attemptedEmail !== userData.email) {
		res.status(401).json({ msg: 'incorrect email or password' });
		return;
	}

	// check if password compares correctly
	// note you'd do this with bcrypt lol
	if (attemptedPassword !== userData.password) {
		res.status(401).json({ msg: 'incorrect email or password' });
		return;
	}

	// pass some data from a middleware to another or the endpoint
	// whatever you wanna add!
	req.payload = {
		id: userData.id,
		email: userData.email,
		pizza: true
	};

	// go to the next step of a route
	next();
}
