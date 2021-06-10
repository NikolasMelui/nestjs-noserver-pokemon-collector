import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { CreatePokemonDto } from 'src/database/pokemon/create-pokemon.dto';
import { Pokemon } from 'src/database/pokemon/pokemon.entity';
import { PokemonRepository } from 'src/database/pokemon/pokemon.repository';

@Injectable()
export class WriterService {
  constructor(private pokemonRepository: PokemonRepository) {}

  async writeToFile(filename: string, data: string): Promise<void> {
    try {
      const filepath = resolve(__dirname, '..', '..', 'data', filename);
      await writeFile(filepath, data);
    } catch (error) {
      console.error(error);
    }
  }

  async writeToDatabase(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const pokemon: Pokemon = await this.pokemonRepository.create(
        createPokemonDto,
      );
      await this.pokemonRepository.save(pokemon);
      return pokemon;
    } catch (error) {
      if (error.errno === 19)
        throw new ConflictException('Pokeon with this name already exists.');
      throw new InternalServerErrorException();
    }
  }
}
