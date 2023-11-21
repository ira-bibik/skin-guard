import { instance } from "../api/axios.api";

export function getTokenFromLocalStorage(): string {
	const data = localStorage.getItem('token');
	const token: string = data ? JSON.parse(data) : '';
	return token;
}

export function setTokenToLocalStorage(key: string, token: string): void {
	localStorage.setItem(key, JSON.stringify(token));
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function removeTokenFromLocalStorage(key: string): void {
	localStorage.removeItem(key);
	delete instance.defaults.headers.common['Authorization'];
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
