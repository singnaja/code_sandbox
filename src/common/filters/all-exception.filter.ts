
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { fromError } from '../../dtos/response.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionFilter.name);
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: any, host: ArgumentsHost) {
        // Log handdle error
        this.logger.error(exception);
        const payload = fromError(exception);
        const ctx = host.switchToHttp();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        if(exception instanceof HttpException) status = (<HttpException>exception).getStatus();
        const response = ctx.getResponse<Response>();
        response
            .status(status)
            .json(payload);
    }    
}