import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import Filters from '../components/pokedex/Filters';
import Search from '../components/pokedex/Search';
import PokemonList from '../components/pokedex/PokemonList';
import PokemonCard from '../components/pokedex/PokemonCard';
import { useNameContext } from '../contexts/nameContext';
import { bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9 } from '../assets/images/';

const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

function randomIndex(max) {
	return Math.floor(Math.random() * max);
}

function Pokedex() {
	const [name] = useNameContext();
	const [pokemons, setPokemons] = useFetch();
	const [pokemonUrl, setPokemonUrl] = useState(null);
	const [isFiltering, setIsFiltering] = useState(false);
	const [img, setImg] = useState(images[randomIndex(images.length)]);

	function changePhrase() {
		setImg(images[randomIndex(images.length)]);
	}

	useEffect(() => {
		getPokemons();
	}, []);

	const getPokemons = () => {
		setPokemons('https://pokeapi.co/api/v2/pokemon');
	};

	const handleSearch = (value) => {
		if (!value) {
			setIsFiltering(flase);
			setPokemonUrl(null);
			setPokemons('https://pokeapi.co/api/v2/pokemon');
		} else {
			setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}`);
		}
	};

	const handleTypeFilter = (type) => {
		if (!type) {
			setIsFiltering(false);
			setPokemons('https://pokeapi.co/api/v2/pokemon');
		} else {
			setIsFiltering(true);
			setPokemons(`https://pokeapi.co/api/v2/type/${type}`);
		}
	};

	const onNext = () => {
		setPokemons(pokemons?.next);
	};

	const onPrev = () => {
		setPokemons(pokemons?.previous);
	};

	const pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results;

	return (
		<div className="pokedex" style={{ backgroundImage: `url('${img}')` }}>
			{/* <div className="pokedex__container"> */}
			<div className="pokedex__header">
				<p>Bienvenido {name}, aquí podras encontrar tu pokémon favorito !!</p>
			</div>
			<div className="pokedex__form">
				<Link className="link-back" to="/">
					{'🔙'} Volver
				</Link>
				<Search handleSearch={handleSearch} />
				<div className="pokedex_filter">
					<Filters handleTypeFilter={handleTypeFilter} />
					<button
						onClick={() => window.location.reload()}
						className="btn-clear-filters"
					>
						Borrar Filtro
					</button>
				</div>
				<button onClick={changePhrase} className="btn-change-background">
					Cambiar Fondo
				</button>
			</div>
			<div className="pokedex__buttons">
				<div className="button-group">
					<button onClick={onPrev} disabled={!pokemons?.previous}>
						Anterior
					</button>
					<button onClick={onNext} disabled={!pokemons?.next}>
						Siguiente
					</button>
				</div>
			</div>
			<div className="pokedex__cards">
				{pokemonUrl ? (
					<PokemonCard url={pokemonUrl} />
				) : (
					<PokemonList pokemons={pokemonsArray} isFiltering={isFiltering} />
				)}
			</div>
			<footer className="footer">
				<div className="pokedex__buttons">
					<div className="button-group">
						<button
							className="prev"
							onClick={onPrev}
							disabled={!pokemons?.previous}
						>
							Anterior
						</button>
						<button
							className="next"
							onClick={onNext}
							disabled={!pokemons?.next}
						>
							Siguiente
						</button>
					</div>
				</div>
			</footer>
		</div>
		// </div>
	);
}

export { Pokedex };
