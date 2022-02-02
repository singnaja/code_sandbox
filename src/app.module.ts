import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import env from './utils/env';
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cs: ConfigService) =>
      ({
        type: "mssql",
        host: cs.get(env.MSSQLDB_HOST),
        username: cs.get(env.MSSQLDB_USER),
        password: cs.get(env.MSSQLDB_PASSWORD),
        database: cs.get(env.MSSQLDB_DBNAME),
        options: {
          encrypt: false,
          enableArithAbort: true,
        },
        synchronize: false,
        logging: false,
        pool: {
          max: 20,
          min: 5,
        },
        entities: [__dirname + "/./**/**/*.entity{.ts,.js}"],
      } as TypeOrmModuleOptions),
    }),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
