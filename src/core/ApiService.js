export default class ApiService {
	instance;
	constructor () {
		instance = axios.create({
			baseURL: 'http://10.19.247.54:8000/common/test',
			timeout: 1000,
			headers: {'Content-type': 'application/json'}
		});
	}
}
