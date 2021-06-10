import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvokerModule } from './invoker/invoker.module';

import configuration from './config/configuration';

@Module({
  imports: [
    InvokerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/__pokemon-collector.sqlite3',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
