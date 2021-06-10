import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonRepository } from 'src/database/pokemon/pokemon.repository';
import { DownloaderService } from 'src/services/downloader.service';
import { ParserService } from 'src/services/parseer.service';
import { ReaderService } from 'src/services/reader.service';
import { WriterService } from 'src/services/writer.service';
import { InvokerService } from './invoker.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonRepository])],
  controllers: [],
  providers: [
    InvokerService,
    ReaderService,
    WriterService,
    DownloaderService,
    ParserService,
  ],
})
export class InvokerModule {}
