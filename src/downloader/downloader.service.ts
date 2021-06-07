import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DownloaderService {
  async getPokemon(name: string): Promise<string> {
    try {
      const URL = 'https://pokeapi.co/api/v2/pokemon';
      const result = await axios.get(`${URL}/${name}`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }
}
