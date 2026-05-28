export const request = async (url, method, data) => {
	const isFormData = data instanceof FormData;

	return await fetch(url, {
		headers: isFormData ? {} : { 'Content-Type': 'application/json' },
		method: method || 'GET',
		body: isFormData ? data : JSON.stringify(data),
	}).then((res) => res.json());
};
