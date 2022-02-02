import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from './dtos/response.dto';

@ApiTags("Info")
@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: `Returns basic information`
  })
  @Get()
  info(): string{
    return this.appService.info();
  }

  @ApiOperation({
    summary: 'Return this API healthcheck report'
  })
  @Get('health-check')
  async healthcheck(): Promise<any>{
    this.logger.log(`Getting health-check information...`);
    const data = await this.appService.healthcheck();
    this.logger.log(`Got health-check result: BUILD# = ${data.build}`);
    //const resp = new ResponseDTO<any>(data);
    return data;
  }
}