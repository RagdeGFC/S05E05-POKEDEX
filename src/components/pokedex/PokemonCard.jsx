import { Fragment, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Link, useSearchParams } from 'react-router-dom';
import { tipos } from '../../utils/helpers';

function PokemonCard({ url, isFiltering, currentType }) {
	const [searchParams] = useSearchParams();
	const [pokemon, setPokemon] = useFetch();
	const currentPage = searchParams.get('page') || 1;

	useEffect(() => {
		if (url) getPokemon();
	}, [url]);

	const getPokemon = () => {
		setPokemon(url);
	};

	const types = pokemon?.types.map((type) => type.type.name);
	if (!types) return;

	return (
		<Link
			className="poke"
			to={`/pokedex/${pokemon?.name}`}
			state={{
				returnPage: currentPage,
				isFiltering: true,
				currentType: currentType,
			}}
		>
			<div className={`poke__card type--${types[0]}`}>
				{/* <img src={pokemon?.sprites?.front_default} alt="" /> */}
				{/* <img src={pokemon?.sprites?.other?.showdown?.front_default} alt="" /> */}
				{/* <img src={pokemon?.sprites?.other?.home?.front_default} alt="" /> */}
				<div className="poke__card-header">
					<img
						src={pokemon?.sprites?.other?.dream_world?.front_default}
						alt={pokemon?.name}
					/>
					<span className="poke__card-number">
						# {pokemon?.id?.toString().padStart(3, '0')}
					</span>
				</div>
				<div className="poke__card-body">
					<h2 className="poke__card-name">{pokemon?.name}</h2>
					<div className="poke__card-label">Tipo:</div>
					<span className="poke__card-types">
						{types?.map((type, index) => {
							return (
								<Fragment key={type}>
									{index > 0 ? (
										<>
											/<span key={index + 1}> {tipos[type]} </span>
										</>
									) : (
										<span key={index + 1}> {tipos[type]} </span>
									)}
								</Fragment>
							);
						})}
					</span>
					<p className="poke__card-type-label"></p>
				</div>
				<div className="poke__card_stats">
					<div className="poke__card-stats-item">
						<span>HP: </span>
						<span>{pokemon?.stats[0]?.base_stat}</span>
					</div>
					<div className="poke__card-stats-item">
						<span>Ataque: </span>
						<span>{pokemon?.stats[1]?.base_stat}</span>
					</div>
					<div className="poke__card-stats-item">
						<span>Defensa: </span>
						<span>{pokemon?.stats[2]?.base_stat}</span>
					</div>
					<div className="poke__card-stats-item">
						<span>Velocidad: </span>
						<span>{pokemon?.stats[5]?.base_stat}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default PokemonCard;
