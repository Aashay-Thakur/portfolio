import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { docRef } from '../contexts/data/firebase-config';
import { Person } from '../contexts/data/Person';

export const useFetchData = () => {
	const [data, setData] = useState<Person | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setData(Person.fromJson(docSnap.data()));
				} else {
					setError('No such document!');
				}
			} catch (err) {
				setError('Error fetching data: ' + (err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading, error };
};
