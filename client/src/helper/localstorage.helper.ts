import { instance } from '../api/axios.api';

export function getTokenFromLocalStorage(): string {
	const data = localStorage.getItem('token');
	const token: string = data ? data : '';
	return token;
}

export function setTokenToLocalStorage(token: string): void {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	localStorage.setItem('token', token);
}

export function removeTokenFromLocalStorage(): void {
	delete instance.defaults.headers.common['Authorization'];
	localStorage.removeItem('token');
}

export function parseJwt(token: string) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
}
