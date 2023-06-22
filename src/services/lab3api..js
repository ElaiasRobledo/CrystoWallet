import axios from "axios";

export const apiUTN = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});


export default{
	transaction(trade){
		return apiUTN.post('/transaction',trade)
	},
	getHistorial(id){
		return apiUTN.get(`/transactions?q={"user_id": "${id}"}`)
	},
	delete(id){
		return apiUTN.delete(`/transactions/${id}"}`)
	},
	edit(id){
		return apiUTN.put(`/transactions/${id}"}`)
	}

}