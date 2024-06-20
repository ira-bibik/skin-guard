import axios from 'axios';
import { getTokenFromLocalStorage } from '../helper/localstorage.helper';

export const instance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}`,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
	},
});
