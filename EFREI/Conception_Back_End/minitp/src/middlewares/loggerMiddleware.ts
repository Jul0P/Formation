import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  // 'finish' event is emitted when the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

export default logger;
