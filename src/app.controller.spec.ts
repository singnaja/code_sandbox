import { HealthCheckDTO, UtilsModule } from '@banpudev/nestjs-utils';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {

  const mockHealthCheckData = {
    build: "10001",
    port: 7500
  };

  const mockAppService = {
    info: jest.fn().mockReturnValue('Test Info'),
    healthcheck: jest.fn().mockResolvedValue(mockHealthCheckData)
  };

  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, UtilsModule],
      controllers: [AppController],
      providers: [
        {provide: AppService, useValue: mockAppService}
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {

    it('GET / should return a message', () => {
      const resp = appController.info();
      expect(resp).toBeDefined();
    })

    it('should return a healcheck object', async () => {
      const resp = await appController.healthcheck();
      expect(resp.errors).toHaveLength(0);
      expect(resp.data).toBeDefined();
      const data = resp.data as HealthCheckDTO;
      expect(data.build).toBeDefined();
      expect(data.port).toBeDefined();
      expect(mockAppService.healthcheck).toBeCalled();
    });

  });
});
