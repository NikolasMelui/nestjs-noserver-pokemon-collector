import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class ReaderService {
  async readFromFile(filename: string): Promise<string> {
    try {
      const filepath = resolve(__dirname, '..', '..', 'data', filename);
      const data = await readFile(filepath);
      return data.toString();
    } catch (error) {
      console.error(error);
    }
  }
}
