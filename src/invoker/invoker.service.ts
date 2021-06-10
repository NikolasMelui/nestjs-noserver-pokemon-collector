import { Injectable } from '@nestjs/common';

import { resolve } from 'path';
import { promisify } from 'util';
import { writeFile, readFile } from 'fs/promises';

import { PokeapiService } from 'src/services/pokeapi.service';
import { PokemontcgService } from 'src/services/pokemontcg.service';

const sleep = promisify(setTimeout);
@Injectable()
export class InvokerService {
  constructor(
    private pokeapiService: PokeapiService,
    private pokemontcgService: PokemontcgService,
  ) {}
  async run(): Promise<void> {
    try {
      const apiPokemons = await this.pokeapiService.getPokemons();
      console.info(
        `The data about all pokemons has been successfully downloaded from to 'pokeapi' API`,
      );
      const apiPokemonsFilename = '__pokeapi_pokemons.json';
      const apiPokemonsFilepath = resolve(
        __dirname,
        '..',
        '..',
        'data',
        apiPokemonsFilename,
      );
      await writeFile(apiPokemonsFilepath, JSON.stringify(apiPokemons));
      console.info(
        `The 'pokeapi' data about all pokemons has been successfully written to the '${apiPokemonsFilename}' file`,
      );

      const tcgPokemons = await this.pokemontcgService.getPokemons();
      console.info(
        `The data about all pokemons has been successfully downloaded from to 'pokemonTCG' API`,
      );
      const tcgPokemonsFilename = '__pokemontcg_pokemons.json';
      const tcgPokemonsFilepath = resolve(
        __dirname,
        '..',
        '..',
        'data',
        tcgPokemonsFilename,
      );
      await writeFile(tcgPokemonsFilepath, JSON.stringify(tcgPokemons));
      console.info(
        `The 'pokemonTCG' data about all pokemons has been successfully written to the '${tcgPokemonsFilename}' file`,
      );

      await sleep(2000);

      const apiPokemonsFromFile = (
        await readFile(apiPokemonsFilepath)
      ).toString();

      console.info(
        `The 'pokeapi' data about all pokemons has been successfully readed from the '${apiPokemonsFilename}' file`,
      );

      const pokemons = this.pokeapiService.parseNames(apiPokemonsFromFile);
      console.info(`The all pokemon names has been successfully parsed`);

      for (const name of pokemons) {
        const saveResult = await this.pokeapiService.save({
          name,
        });
        console.info(
          `The data about '${saveResult.name}' pokemon with '${saveResult.id}' id has been successfully written to the database`,
        );

        const apiFullData = await this.pokeapiService.getPokemon(name);
        console.info(
          `The data about '${name}' pokemon  has been successfully downloaded from the 'pokeapi' API`,
        );

        const apiFullDataFilename = `${name}.json`;
        const apiFullDataFilepath = resolve(
          __dirname,
          '..',
          '..',
          'data',
          apiFullDataFilename,
        );
        await writeFile(apiFullDataFilepath, JSON.stringify(apiFullData));
        console.info(
          `The data about ${name} pokemon has been successfully written to the '${apiFullDataFilename}' file`,
        );

        const apiGameIndices = this.pokeapiService.parseGameIndices(
          JSON.stringify(apiFullData),
        );
        console.info(
          `The 'gameIndices' data about ${name} pokemon has been successfully parsed`,
        );

        const apiGameIndicesFilename = `${name}_gameIndices.json`;
        const apiGameIndicesFilepath = resolve(
          __dirname,
          '..',
          '..',
          'data',
          apiGameIndicesFilename,
        );
        await writeFile(apiGameIndicesFilepath, JSON.stringify(apiGameIndices));
        console.info(
          `The 'gameIndices' data about ${name} pokemon has been successfully written to the '${apiGameIndicesFilename}' file`,
        );

        const tcgFullData = await this.pokemontcgService.getPokemon(name);
        console.info(
          `The data about '${name}' pokemon has been successfully downloaded from the 'pokemonTCG' API`,
        );
        const tcgFullDataFilename = `${name}_tcg.json`;
        const tcgFullDataFilepath = resolve(
          __dirname,
          '..',
          '..',
          'data',
          tcgFullDataFilename,
        );
        await writeFile(tcgFullDataFilepath, JSON.stringify(tcgFullData));
        console.info(
          `The tcg data about ${name} pokemon has been successfully written to the '${tcgFullDataFilename}' file`,
        );

        await sleep(500);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
