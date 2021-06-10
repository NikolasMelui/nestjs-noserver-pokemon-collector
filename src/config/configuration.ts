export default () => ({
  pokeapi: {
    URL: 'https://pokeapi.co/api/v2/pokemon',
  },
  pokemon_tcg: {
    URL: 'https://api.pokemontcg.io/v2',
    API_KEY: process.env.POKEMON_TCG_API_KEY,
  },
});
