import { Router, Request, Response, NextFunction } from 'express';
  
const route = Router();

export default (app: Router) => {
  app.use('/tests', route);

  route.get('/me', (req: Request, res: Response) => {
    return res.json({ app: "bulletproof-template version 1.0.0" }).status(200);
  });

  route.get('/status', (req: Request, res: Response) => {
    return res.json({ app: "bulletproof-template version 1.1" }).status(200);
  });
};