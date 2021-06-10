import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeapiService } from 'src/services/pokeapi.service';
import { InvokerService } from 'src/invoker/invoker.service';
import { PokemontcgService } from 'src/services/pokemontcg.service';
import { PokemonRepository } from 'src/database/pokemon/pokemon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonRepository])],
  controllers: [],
  providers: [InvokerService, PokeapiService, PokemontcgService],
})
export class InvokerModule {}
