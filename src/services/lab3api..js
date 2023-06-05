import axios from "axios";

export const apiUTN = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});


export default{
	transaction(purchase){
		return apiUTN.post('/transaction',purchase)
	},
	getHistorial(id){
		return apiUTN.get(`/transactions?q={"user_id": "${id}"}`)
	},
	delete(id){
		return apiUTN.delete(`/transactions/${id}"}`)
	}
}