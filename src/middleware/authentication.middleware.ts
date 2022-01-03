import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'crypto';

const THREE_SECONDS_IN_MILLIS: number = 3 * 1000;

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientTimestamp = +req.query?.clientTimestamp as number;

    if ((new Date).getTime() - new Date(clientTimestamp).getTime() > THREE_SECONDS_IN_MILLIS) {
      return res.sendStatus(401);
    }
  
    const fullUrl: string = `${req.protocol}://${req.hostname}${req.path}`;
    const clientSignature: string = req.query?.clientSignature as string;
    const calculatedSignature: string = this.calculateSignature(clientTimestamp, process.env.SALT, fullUrl);
  
    if (clientSignature !== calculatedSignature) {
      return res.sendStatus(401);
    }
    next();
  }

  calculateSignature(timestamp: number, salt: string, url: string): string {
    const secret: string = `${timestamp}-${salt}-${url}`;
    return createHmac('md5', salt)
           .update(secret)
           .digest('hex');
  }
}
