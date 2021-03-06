import { Injectable, Logger, NestMiddleware} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger(LoggerMiddleware.name);
  
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(`================== start =======================`);
      
      try {
        const logReq = {
          url: request.url,
          //header: req.headers,
          method: method,
          body: request.body,
          statusCode: statusCode
        }
        this.logger.log('REQUEST: ' + JSON.stringify(logReq));
      } catch {
        this.logger.log('REQUEST: Undefined');
      }
      
      this.logger.log(`================== end =======================`);
    });

    next();
  }
}