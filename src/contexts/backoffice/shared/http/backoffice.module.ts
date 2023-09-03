import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import backofficeConfig from '../config/backoffice.config';
import UsersModule from '../../users/infrastructure/http/users.module';

@Module({
  imports: [
    ConfigModule.forFeature(backofficeConfig),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        database: config.getOrThrow('backoffice.db.database'),
        host: config.getOrThrow('backoffice.db.host'),
        port: config.getOrThrow('backoffice.db.port'),
        username: config.getOrThrow('backoffice.db.username'),
        password: config.getOrThrow('backoffice.db.password'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export default class BackofficeModule {}
