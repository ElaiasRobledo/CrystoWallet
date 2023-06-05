import axios from 'axios';

const apiCrypto = axios.create({
  baseURL: 'https://criptoya.com/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export default{
    getBTC(){
        try{
            return apiCrypto.get('argenbtc/btc/ars/1')
        }catch(error){
            console.error(error)
        }
    },
    getUSDC(){
        try{
        return apiCrypto.get('lemoncash/usdc/ars/1')
        }catch(error){
            console.error(error)
        }
    },
    getETH(){
        try{
        return apiCrypto.get('satoshitango/eth/ars/1')
        }catch(error){
            console.error(error)
        }
    }
}