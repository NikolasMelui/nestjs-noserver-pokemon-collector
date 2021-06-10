import { Injectable } from '@nestjs/common';
import { PokeapiService } from 'src/services/pokeapi.service';
import { ParserService } from 'src/services/parser.service';
import { ReaderService } from 'src/services/reader.service';
import { WriterService } from 'src/services/writer.service';

import { promisify } from 'util';
import { PokemonTcgService } from 'src/services/pokemontcg.service';
const sleep = promisify(setTimeout);

@Injectable()
export class InvokerService {
  constructor(
    private writerService: WriterService,
    private readerService: ReaderService,
    private parserService: ParserService,
    private pokeapiService: PokeapiService,
    private pokemonTcgService: PokemonTcgService,
  ) {}
  async run(): Promise<void> {
    try {
      const pokeapiPokemons = await this.pokeapiService.getPokemons();
      console.info(
        `The data about all pokemons has been successfully downloaded from to 'pokeapi' API`,
      );

      const tcgPokemons = await this.pokemonTcgService.getPokemons();
      console.info(
        `The data about all pokemons has been successfully downloaded from to 'pokemon TCG' API`,
      );
      console.log(tcgPokemons);

      const pokeapiPokemonsFilename = '__pokemons.json';
      await this.writerService.writeToFile(
        pokeapiPokemonsFilename,
        JSON.stringify(pokeapiPokemons),
      );
      console.info(
        `The data about all pokemons has been successfully written to the '${pokeapiPokemonsFilename}' file`,
      );

      await sleep(2000);

      const pokeapiPokemonsFromFile = await this.readerService.readFromFile(
        pokeapiPokemonsFilename,
      );
      console.info(
        `The data about all pokemons has been successfully readed from the '${pokeapiPokemonsFilename}' file`,
      );

      const pokemons = this.parserService.getNames(pokeapiPokemonsFromFile);
      console.info(`The all pokemon names has been successfully parsed`);

      for (const name of pokemons) {
        const writeToDatabaseResult = await this.writerService.writeToDatabase({
          name,
        });
        console.info(
          `The data about '${writeToDatabaseResult.name}' pokemon with '${writeToDatabaseResult.id}' id has been successfully written to the database`,
        );

        const fullData = await this.pokeapiService.getPokemon(name);
        console.info(
          `The data about '${name}' pokemon  has been successfully downloaded from the 'pokeapi' API`,
        );

        const pokemonFileName = `${name}.json`;
        await this.writerService.writeToFile(
          pokemonFileName,
          JSON.stringify(fullData),
        );
        console.info(
          `The data about ${name} pokemon has been successfully written to the '${pokemonFileName}' file`,
        );

        const readData = await this.readerService.readFromFile(`${name}.json`);
        console.info(
          `The data about ${name} pokemon has been successfully readed from the '${pokemonFileName}' file`,
        );

        const gameIndices = this.parserService.getGameIndices(readData);
        console.info(
          `The 'gameIndices' data about ${name} pokemon has been successfully parsed`,
        );

        const gameIndicesFileName = `${name}_gameIndices.json`;
        await this.writerService.writeToFile(
          gameIndicesFileName,
          JSON.stringify(gameIndices),
        );
        console.info(
          `The 'gameIndices' data about ${name} pokemon has been successfully written to the '${gameIndicesFileName}' file`,
        );

        const tcgPokemon = await this.pokemonTcgService.getPokemon(name);
        console.info(
          `The data about '${name}' pokemon has been successfully downloaded from the 'pokemonTCG' API`,
        );
        const tcgPokemonFileName = `${name}_tcg.json`;
        await this.writerService.writeToFile(
          tcgPokemonFileName,
          JSON.stringify(tcgPokemon),
        );
        console.info(
          `The tcg data about ${name} pokemon has been successfully written to the '${tcgPokemonFileName}' file`,
        );

        await sleep(500);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
