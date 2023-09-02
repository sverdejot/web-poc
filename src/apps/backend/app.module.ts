import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WinstonLoggerModule } from './logger/winston.module';
import { ConfigModule } from '@nestjs/config';
import BackofficeModule from 'src/contexts/backoffice/shared/http/backoffice.module';

@Module({
  imports: [WinstonLoggerModule, ConfigModule.forRoot(), BackofficeModule],
  controllers: [AppController],
})
export class AppModule {}
