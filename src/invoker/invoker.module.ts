import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonRepository } from 'src/database/pokemon/pokemon.repository';
import { DownloaderService } from 'src/downloader/downloader.service';
import { ParserService } from 'src/parser/parseer.service';
import { ReaderService } from 'src/reader/reader.service';
import { WriterService } from 'src/writer/writer.service';
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
