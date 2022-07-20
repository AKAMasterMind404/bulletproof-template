import { Router } from 'express';
import test from './routes/test';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	test(app);

	return app
}