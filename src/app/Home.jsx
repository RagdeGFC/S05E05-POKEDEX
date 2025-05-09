import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { types, useNameContext } from '../contexts/nameContext';
import { Pokedex } from './Pokedex';
import { pokevid } from '../assets/images';

function Home() {
	const inputRef = useRef();
	const [name, dispatch] = useNameContext();
	const navigate = useNavigate();
	const [isFirstClick, setIsFirstClick] = useState(true);
	const [inputText, setInputText] = useState('');
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const videoRef = useRef();

	const handleButtonClick = () => {
		if (isFirstClick) {
			videoRef.current.play();
			setIsVideoPlaying(true);
			setIsFirstClick(false);
			return;
		}

		if (!inputText.trim()) {
			if (isVideoPlaying) {
				videoRef.current.pause();
				setIsVideoPlaying(false);
			} else {
				videoRef.current.play();
				setIsVideoPlaying(true);
			}
			return;
		}

		dispatch({
			type: types.SET_NAME,
			payload: inputText.trim(),
		});
		inputRef.current.value = '';
		setInputText('');
		navigate('/pokedex');
	};

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	const clearName = () => {
		dispatch({
			type: types.CLEAR_NAME,
		});
	};

	const getButtonText = () => {
		if (isFirstClick) return 'Play video';
		if (!inputText.trim()) return isVideoPlaying ? 'Stop video' : 'Play video';
		return 'Comenzar';
	};

	return (
		<div className="home">
			<video ref={videoRef} className="background-video" src={pokevid} loop />
			<div className="home__content">
				<h2 className="home__title">
					Hola {name ? <>de nuevo {name}</> : 'Entrenador !!'} !
				</h2>

				<div>
					{name ? (
						<>
							<p className="home__text">
								Continuemos con tu viaje, regresa a la
								<Link className="home__link" to="/pokedex">
									{' '}
									Pokédex!!
								</Link>
							</p>
							<button className="home__btn btn--radius" onClick={clearName}>
								Salir
							</button>
						</>
					) : (
						<>
							<p>Ingresa tu nombre para comenzar!!</p>
							<input
								ref={inputRef}
								type="text"
								placeholder="Tu nombre..."
								className="home__input"
								onChange={handleInputChange}
								value={inputText}
							/>
							<button className="home__btn" onClick={handleButtonClick}>
								{getButtonText()}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export { Home };
