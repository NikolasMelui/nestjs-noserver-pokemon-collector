import { Injectable } from '@nestjs/common';
import axios from 'axios';

const URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable()
export class DownloaderService {
  async getPokemons(): Promise<string> {
    try {
      const result = await axios.get(`${URL}?limit=10000`);
      return result?.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemon(name: string): Promise<string> {
    try {
      const result = await axios.get(`${URL}/${name}`);
      return result?.data;
    } catch (error) {
      console.error(error);
    }
  }
}
