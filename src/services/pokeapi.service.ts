import { Injectable } from '@nestjs/common';
import axios from 'axios';

import configuration from '../config/configuration';

@Injectable()
export class PokeapiService {
  private config: Record<string, unknown>;

  constructor() {
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
}
