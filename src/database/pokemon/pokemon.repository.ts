import { Pokemon } from 'src/database/pokemon/pokemon.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {}
