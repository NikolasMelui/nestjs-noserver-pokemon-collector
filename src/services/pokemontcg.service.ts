import { Injectable } from '@nestjs/common';

import axios from 'axios';

import configuration from '../config/configuration';

@Injectable()
export class PokemontcgService {
  private config: Record<string, unknown>;

  constructor() {
    this.config = configuration().pokemon_tcg;
  }

  async getPokemons(): Promise<any> {
    try {
      const result = await axios.get(`${this.config.URL}/cards`, {
        headers: {
          'X-Api-Key': this.config.API_KEY,
        },
      });
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemon(name: string): Promise<any> {
    try {
      const result = await axios.get(
        `${this.config.URL}/cards?q=name:${name}`,
        {
          headers: {
            'X-Api-Key': this.config.API_KEY,
          },
        },
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }
}
