import { useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
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
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const [name] = useNameContext();
	const [pokemons, setPokemons] = useFetch();
	const [pokemonUrl, setPokemonUrl] = useState(null);
	const [isFiltering, setIsFiltering] = useState(
		location.state?.isFiltering || false,
	);
	const [currentType, setCurrentType] = useState(
		location.state?.currentType || '',
	);
	const [img, setImg] = useState(images[randomIndex(images.length)]);
	const [currentPage, setCurrentPage] = useState(
		location.state?.returnPage || parseInt(searchParams.get('page')) || 1,
	);
	const itemsPerPage = 20;

	// Actualizar URL cuando cambie la página
	useEffect(() => {
		setSearchParams({ page: currentPage });
	}, [currentPage, setSearchParams]);

	function changePhrase() {
		setImg(images[randomIndex(images.length)]);
	}

	// Efecto para manejar el estado inicial y cambios de filtro
	useEffect(() => {
		if (location.state?.isFiltering && location.state?.currentType) {
			setIsFiltering(true);
			setCurrentType(location.state.currentType);
			setCurrentPage(location.state.returnPage || 1);
			setPokemons(
				`https://pokeapi.co/api/v2/type/${location.state.currentType}`,
			);
		} else if (isFiltering && currentType) {
			setPokemons(`https://pokeapi.co/api/v2/type/${currentType}`);
		} else {
			const page = parseInt(searchParams.get('page')) || 1;
			if (page > 1) {
				let offset = (page - 1) * itemsPerPage;
				setPokemons(
					`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`,
				);
			} else {
				setPokemons('https://pokeapi.co/api/v2/pokemon');
			}
		}
	}, [location.state, isFiltering, currentType, searchParams]);

	const getPokemons = () => {
		setPokemons('https://pokeapi.co/api/v2/pokemon');
		setCurrentPage(1);
		setSearchParams({ page: 1 });
	};

	const handleSearch = (value) => {
		if (!value) {
			setIsFiltering(false);
			setPokemonUrl(null);
			setPokemons('https://pokeapi.co/api/v2/pokemon');
			setCurrentPage(1);
			setSearchParams({ page: 1 });
		} else {
			setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}`);
		}
	};

	const handleTypeFilter = (type) => {
		if (!type) {
			setIsFiltering(false);
			setCurrentType('');
			setCurrentPage(1);
			setSearchParams({ page: 1 });
			setPokemons('https://pokeapi.co/api/v2/pokemon');
		} else {
			setIsFiltering(true);
			setCurrentType(type);
			if (!isFiltering) {
				setCurrentPage(1);
				setSearchParams({ page: 1 });
			}
			setPokemons(`https://pokeapi.co/api/v2/type/${type}`);
		}
	};

	const onNext = () => {
		if (isFiltering) {
			const totalPages = Math.ceil((pokemonsArray?.length || 0) / itemsPerPage);
			if (currentPage < totalPages) {
				setCurrentPage(currentPage + 1);
			}
		} else {
			setPokemons(pokemons?.next);
			setCurrentPage(currentPage + 1);
		}
	};

	const onPrev = () => {
		if (isFiltering) {
			if (currentPage > 1) {
				setCurrentPage(currentPage - 1);
			}
		} else {
			setPokemons(pokemons?.previous);
			setCurrentPage(currentPage - 1);
		}
	};

	const pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results;

	const getPaginatedPokemons = () => {
		if (!pokemonsArray) return [];
		if (!isFiltering) return pokemonsArray;

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return pokemonsArray.slice(startIndex, endIndex);
	};

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
					<Filters
						handleTypeFilter={handleTypeFilter}
						selectedType={currentType}
					/>
					<button
						onClick={() => handleTypeFilter('')}
						className="btn-clear-filters"
					>
						Resetear
					</button>
				</div>
				<button onClick={changePhrase} className="btn-change-background">
					Fondo
				</button>
			</div>
			<div className="pokedex__buttons">
				<div className="button-group">
					<button
						onClick={onPrev}
						disabled={isFiltering ? currentPage === 1 : !pokemons?.previous}
					>
						Anterior
					</button>
					<div className="page-numbers">
						{(() => {
							const totalPages = isFiltering
								? Math.ceil((pokemonsArray?.length || 0) / itemsPerPage)
								: Math.ceil((pokemons?.count || 0) / itemsPerPage);

							if (totalPages <= 1) return null;

							let startPage = Math.max(1, currentPage - 4);
							let endPage = Math.min(totalPages, startPage + 9);

							if (endPage - startPage < 9) {
								startPage = Math.max(1, endPage - 9);
							}

							return Array.from(
								{ length: endPage - startPage + 1 },
								(_, index) => {
									const pageNumber = startPage + index;
									return (
										<button
											key={pageNumber}
											onClick={() => setCurrentPage(pageNumber)}
											className={`page-number ${
												currentPage === pageNumber ? 'current' : ''
											}`}
											disabled={currentPage === pageNumber}
										>
											{pageNumber}
										</button>
									);
								},
							);
						})()}
					</div>
					<button
						onClick={onNext}
						disabled={
							isFiltering
								? currentPage >=
								  Math.ceil((pokemonsArray?.length || 0) / itemsPerPage)
								: !pokemons?.next
						}
					>
						Siguiente
					</button>
				</div>
			</div>
			<div className="pokedex__cards">
				{pokemonUrl ? (
					<PokemonCard
						url={pokemonUrl}
						isFiltering={isFiltering}
						currentType={currentType}
					/>
				) : (
					<PokemonList
						pokemons={getPaginatedPokemons()}
						isFiltering={isFiltering}
						currentType={currentType}
					/>
				)}
			</div>
			<footer className="footer">
				<div className="pokedex__buttons">
					<div className="button-group">
						<button
							className="prev"
							onClick={onPrev}
							disabled={isFiltering ? currentPage === 1 : !pokemons?.previous}
						>
							Anterior
						</button>
						<div className="page-numbers">
							{(() => {
								const totalPages = isFiltering
									? Math.ceil((pokemonsArray?.length || 0) / itemsPerPage)
									: Math.ceil((pokemons?.count || 0) / itemsPerPage);

								if (totalPages <= 1) return null;

								let startPage = Math.max(1, currentPage - 4);
								let endPage = Math.min(totalPages, startPage + 9);

								if (endPage - startPage < 9) {
									startPage = Math.max(1, endPage - 9);
								}

								return Array.from(
									{ length: endPage - startPage + 1 },
									(_, index) => {
										const pageNumber = startPage + index;
										return (
											<button
												key={pageNumber}
												onClick={() => setCurrentPage(pageNumber)}
												className={`page-number ${
													currentPage === pageNumber ? 'current' : ''
												}`}
												disabled={currentPage === pageNumber}
											>
												{pageNumber}
											</button>
										);
									},
								);
							})()}
						</div>
						<button
							className="next"
							onClick={onNext}
							disabled={
								isFiltering
									? currentPage >=
									  Math.ceil((pokemonsArray?.length || 0) / itemsPerPage)
									: !pokemons?.next
							}
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
