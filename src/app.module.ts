import { Module } from '@nestjs/common';
import { InvokerModule } from './invoker/invoker.module';

@Module({
  imports: [InvokerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
