import { Route, Routes } from 'react-router-dom';
import { Details, Home, Pokedex } from '../app';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/pokedex" element={<ProtectedRoute />}>
				<Route index element={<Pokedex />} />
				<Route path=":name" element={<Details />} />
			</Route>
		</Routes>
	);
}

export default AppRouter;
