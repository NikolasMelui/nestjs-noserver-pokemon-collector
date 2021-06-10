import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonRepository } from 'src/database/pokemon/pokemon.repository';
import { PokeapiService } from 'src/services/pokeapi.service';
import { ParserService } from 'src/services/parser.service';
import { ReaderService } from 'src/services/reader.service';
import { WriterService } from 'src/services/writer.service';
import { InvokerService } from './invoker.service';
import { PokemonTcgService } from 'src/services/pokemontcg.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonRepository])],
  controllers: [],
  providers: [
    InvokerService,
    ReaderService,
    WriterService,
    ParserService,
    PokeapiService,
    PokemonTcgService,
  ],
})
export class InvokerModule {}
