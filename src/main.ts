import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InvokerModule } from './invoker/invoker.module';
import { InvokerService } from './invoker/invoker.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const invoker = app.select(InvokerModule).get(InvokerService);
    await invoker.run();
  } catch (error) {
    console.error(error);
  }

  await app.close();
}
bootstrap();
