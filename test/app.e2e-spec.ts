import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import env from '../src/utils/env';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    const cfgSrv = app.get(ConfigService);
    const expectedResult = `PRODUCT: ${cfgSrv.get(env.PRODUCT_CODE)} 
      MODULE: ${cfgSrv.get(env.MODULE_NAME)} 
      BUILD: ${cfgSrv.get(env.BUILD_NUM)}`;
    console.log('info resutl: ' + expectedResult);
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(expectedResult);
  });

  //it('/health-check (GET)')


});
