import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvokerModule } from './invoker/invoker.module';

@Module({
  imports: [
    InvokerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/__pokemon-collector.sqlite3',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
