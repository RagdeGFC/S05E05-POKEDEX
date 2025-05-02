import { useEffect, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { tipos } from '../../utils/helpers';

function Filters({ handleTypeFilter, selectedType }) {
	const [types, setTypes] = useFetch();
	const selectRef = useRef();

	useEffect(() => {
		getTypes();
	}, []);

	const getTypes = () => {
		setTypes('https://pokeapi.co/api/v2/type');
	};

	return (
		<div className="select">
			<select
				className="select__input"
				ref={selectRef}
				onChange={() => handleTypeFilter(selectRef.current.value)}
				value={selectedType}
			>
				<option value="">Todos los tipos </option>
				{types?.results
					?.filter((type) => tipos[type.name])
					?.map((type) => (
						<option key={type.name} value={type.name}>
							{tipos[type.name]}
						</option>
					))}
			</select>
		</div>
	);
}

export default Filters;
