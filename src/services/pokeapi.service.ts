import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import axios from 'axios';

import configuration from '../config/configuration';

import { PokemonRepository } from '../database/pokemon/pokemon.repository';
import { CreatePokemonDto } from '../database/pokemon/create-pokemon.dto';
import { Pokemon } from '../database/pokemon/pokemon.entity';

@Injectable()
export class PokeapiService {
  private config: Record<string, unknown>;

  constructor(private pokemonRepository: PokemonRepository) {
    this.config = configuration().pokeapi;
  }

  async getPokemons(): Promise<any> {
    try {
      const result = await axios.get(`${this.config.URL}?limit=10000`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemon(name: string): Promise<any> {
    try {
      const result = await axios.get(`${this.config.URL}/${name}`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  parseGameIndices(data: string): string {
    try {
      return JSON.parse(data)?.game_indices;
    } catch (error) {
      console.error(error);
    }
  }

  parseNames(data: string): string {
    try {
      return JSON.parse(data)?.results.map((item) => item.name);
    } catch (error) {
      console.error(error);
    }
  }

  async save(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
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
