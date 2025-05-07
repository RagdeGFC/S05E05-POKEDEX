import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { tipos } from '../utils/helpers';
import { pokegif } from '../assets/images';

function Details() {
	const params = useParams();
	const [pokemon, setPokemon] = useFetch();

	useEffect(() => {
		if (params.name) getPokemon();
	}, [params.name]);

	const getPokemon = () => {
		setPokemon(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
	};

	const types = pokemon?.types.map((type) => type.type.name);

	return (
		<div
			className="background-container"
			style={{ backgroundImage: `URL(${pokegif}) ` }}
		>
			<div className="pokemon-details-container">
				<Link className="link-back" to="/pokedex">
					{'🔙'} Volver
				</Link>

				<div className="pokemon-details-content">
					<div className="pokemon-image-container">
						<img
							className="pokemon-showdown-image"
							src={pokemon?.sprites?.other?.showdown?.front_default}
							alt={`${pokemon?.name} showdown sprite`}
						/>
						<img
							className="pokemon-home-image"
							src={pokemon?.sprites?.other?.home?.front_default}
							alt={`${pokemon?.name} home sprite`}
						/>
						<span className="poke__card-number --details">
							# {pokemon?.id?.toString().padStart(3, '0')}
						</span>
					</div>

					<div className="pokemon-info-container">
						<h2 className="poke__card-name --details">{pokemon?.name}</h2>
						<div className="pokemon-types">
							<div className="poke__card-label --details">Tipo:</div>
							<span className="poke__card-types --details">
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
						</div>

						<div className="pokemon-stats-container">
							<div className="poke__card_stats --details">
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

							<div className="pokemon-abilities">
								<h3>Habilidades: </h3>
								<div className="abilities-list">
									{pokemon?.abilities?.map((data) => (
										<span key={data.ability.name} className="ability-item">
											{data.ability.name}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Details };
