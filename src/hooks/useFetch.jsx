import { useState, useCallback } from 'react';
import axios from 'axios';

function useFetch() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const dataFetch = useCallback((url) => {
		if (!url) return;
		setLoading(true);
		setData(null);
		setError(null);
		axios
			.get(url)
			.then((res) => setData(res.data))
			.catch(() => setData(null))
			.finally(() => setLoading(false));
	}, []);

	return [data, dataFetch, loading, error];
}

export { useFetch };
