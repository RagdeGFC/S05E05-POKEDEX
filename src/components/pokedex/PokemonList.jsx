import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, isFiltering, currentType }) {
	// Si pokemons es undefined o null, retornamos null
	if (!pokemons) return null;

	// Si es un array vacío, también retornamos null
	if (Array.isArray(pokemons) && pokemons.length === 0) return null;

	return (
		<>
			{pokemons.map((pokemon) => {
				if (!pokemon) return null;
				try {
					const pokemonUrl = isFiltering ? pokemon.pokemon.url : pokemon.url;
					const pokemonName = isFiltering ? pokemon.pokemon.name : pokemon.name;

					if (!pokemonUrl) return null;
					return (
						<PokemonCard
							key={pokemonName}
							url={pokemonUrl}
							isFiltering={isFiltering}
							currentType={currentType}
						/>
					);
				} catch (error) {
					console.error('Error procesando pokemon:', pokemon);
					return null;
				}
			})}
		</>
	);
}

export default PokemonList;
