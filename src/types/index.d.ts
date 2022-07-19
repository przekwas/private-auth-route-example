export {}; // hacky TS error workaround fuck my life

interface ReqPayload {
	id: number;
	email: string;
	pizza: boolean;
}

export interface IMessage {
	id: number;
	userid: number;
	email: string;
	message: string;
}

declare global {
	namespace Express {
		export interface Request {
            payload: ReqPayload
        }
	}
}
