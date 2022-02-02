import { Injectable } from '@nestjs/common';
import env from './utils/env';
import { ConfigService } from '@nestjs/config';

const mockHealthCheckData = {
  build: "10001",
  port: 7500
};

@Injectable()
export class AppService {

  constructor(
    private readonly cfgSrv: ConfigService
  ){}

  info(): string{
    return `PRODUCT: ${this.cfgSrv.get(env.PRODUCT_CODE)} 
      MODULE: ${this.cfgSrv.get(env.MODULE_NAME)} 
      BUILD: ${this.cfgSrv.get(env.BUILD_NUM)}`;
  }

  async healthcheck(): Promise<any>{
    return mockHealthCheckData;
  }
  
}