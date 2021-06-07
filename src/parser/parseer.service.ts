import { Injectable } from '@nestjs/common';

@Injectable()
export class ParserService {
  getGameIndices(data: string): string {
    try {
      return JSON.parse(data)?.game_indices;
    } catch (error) {
      console.error(error);
    }
  }
  getNames(data: string): string {
    try {
      return JSON.parse(data)?.results.map((item) => item.name);
    } catch (error) {
      console.error(error);
    }
  }
}
