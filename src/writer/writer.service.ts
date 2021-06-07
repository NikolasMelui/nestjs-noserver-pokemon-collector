import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class WriterService {
  async writeToFile(filename: string, data: string): Promise<void> {
    try {
      const filepath = resolve(__dirname, '..', '..', 'data', filename);
      await writeFile(filepath, data);
    } catch (error) {
      console.error(error);
    }
  }
}
