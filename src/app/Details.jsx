import { Fragment, useEffect } from 'react';
import {
	useParams,
	useNavigate,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { tipos } from '../utils/helpers';
import { pokegif } from '../assets/images';

function Details() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const params = useParams();
	const [pokemon, setPokemon] = useFetch();
	const returnPage = location.state?.returnPage || 1;
	const isFiltering = location.state?.isFiltering || false;
	const currentType = location.state?.currentType || '';

	useEffect(() => {
		if (params.name) getPokemon();
	}, [params.name]);

	const getPokemon = () => {
		setPokemon(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
	};

	const handleGoBack = () => {
		if (isFiltering && currentType) {
			navigate(`/pokedex?page=${returnPage}`, {
				state: {
					isFiltering: true,
					currentType: currentType,
					returnPage: returnPage,
				},
			});
		} else {
			navigate(`/pokedex?page=${returnPage}`);
		}
	};

	// Verificar si 'pokemon' y 'types' existen antes de acceder a ellos
	const types = pokemon?.types
		? pokemon.types.map((type) => type.type.name)
		: [];

	// Verificar que 'types' tenga al menos un tipo
	const primaryType = types.length > 0 ? types[0] : null;

	return (
		<div
			className="background-container"
			style={{ backgroundImage: `URL(${pokegif})` }}
		>
			<div className="link-back" onClick={handleGoBack}>
				{'🔙'} Volver
			</div>
			<div className="poke " onClick={handleGoBack}>
				<div className={`poke__card type--${primaryType}`}>
					<div className="poke__card-header">
						<img
							src={pokemon?.sprites?.other?.home?.front_default}
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
							{types?.map((type, index) => (
								<Fragment key={type}>
									{index > 0 ? (
										<>
											/<span key={index + 1}> {tipos[type]} </span>
										</>
									) : (
										<span key={index + 1}> {tipos[type]} </span>
									)}
								</Fragment>
							))}
						</span>
					</div>
					<p className="poke__card-type-label"></p>
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
					<div className="poke__card-abilities">
						<p className="poke__card-type-label"></p>
						<div className="poke__card-label">Habilidades:</div>
						<div className="poke__card-ability">
							{pokemon?.abilities?.map((data) => (
								<span key={data.ability.name}> {data.ability.name}</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Details };
