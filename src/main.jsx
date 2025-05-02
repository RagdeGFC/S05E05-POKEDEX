import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routes/AppRouter';
import { HashRouter } from 'react-router-dom';
import { NameProvider } from './contexts/nameContext';

const root = createRoot(document.getElementById('root'));

root.render(
	<StrictMode>
		<NameProvider>
			<HashRouter>
				<AppRouter />
			</HashRouter>
		</NameProvider>
	</StrictMode>,
);
