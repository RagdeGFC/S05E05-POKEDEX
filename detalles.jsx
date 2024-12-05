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
			<Link className="link-back" to="/pokedex">
				{'🔙'} Volver
			</Link>
			<img src={pokemon?.sprites?.other?.showdown?.front_default} alt="" />

			<div className="poke__card-header --details">
				<img src={pokemon?.sprites?.other?.home?.front_default} alt="" />
				<span className="poke__card-number --details">
					# {pokemon?.id?.toString().padStart(3, '0')}
				</span>
			</div>

			<div className="poke__card-body --details">
				<h2 className="poke__card-name --details">{pokemon?.name}</h2>
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
				<p className="poke__card-type-label --details"></p>
			</div>
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
				<div className="poke__card-types --details">
					<h3>Habilidades: </h3>
					<div>
						{pokemon?.abilities?.map((data) => (
							<span key={data.ability.name}>
								{' '}
								<br /> {data.ability.name}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export { Details };
