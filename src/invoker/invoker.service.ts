import { Injectable } from '@nestjs/common';
import { DownloaderService } from 'src/downloader/downloader.service';
import { ParserService } from 'src/parser/parseer.service';
import { ReaderService } from 'src/reader/reader.service';
import { WriterService } from 'src/writer/writer.service';

import { promisify } from 'util';
const sleep = promisify(setTimeout);

@Injectable()
export class InvokerService {
  constructor(
    private downloaderService: DownloaderService,
    private writerService: WriterService,
    private readerService: ReaderService,
    private parserService: ParserService,
  ) {}
  async run(): Promise<void> {
    try {
      const pokemonsWriteData = await this.downloaderService.getPokemons();
      await this.writerService.writeToFile(
        '__pokemons.json',
        JSON.stringify(pokemonsWriteData),
      );
      await sleep(2000);
      const pokemonsReadData = await this.readerService.readFromFile(
        '__pokemons.json',
      );
      const pokemons = this.parserService.getNames(pokemonsReadData);
      for (const pokemon of pokemons) {
        const fullData = await this.downloaderService.getPokemon(pokemon);
        await this.writerService.writeToFile(
          `${pokemon}.json`,
          JSON.stringify(fullData),
        );
        await sleep(1000);
        const readData = await this.readerService.readFromFile(
          `${pokemon}.json`,
        );
        const gameIndices = this.parserService.getGameIndices(readData);
        await this.writerService.writeToFile(
          `${pokemon}_gameIndices.json`,
          JSON.stringify(gameIndices),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}
