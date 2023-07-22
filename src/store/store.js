import { createStore } from 'vuex';

export default createStore({
  state: {
    id: localStorage.getItem('id'),
    password: localStorage.getItem('password'),
    gift: localStorage.getItem('money'),
    btcamount : localStorage.getItem('btc'),
    usdcamount: localStorage.getItem('usdc'),
    ethamount: localStorage.getItem('eth')
  },
  mutations: {
    setId(state, id) {
      state.id = id;
      localStorage.setItem('id',id)
    },
    setPassword(state, password){
      state.password = password;
      localStorage.setItem('password',password)
    },
    setGiftMoney(state,gift){
      state.gift = gift;
      localStorage.setItem('money',gift)
    },
    setBTC(state, btcamount){
      state.btcamount = btcamount;
      localStorage.setItem('btc',btcamount)
    },
    setETH(state,ethamount){
      state.ethamount = ethamount;
      localStorage.setItem('eth',ethamount)
    },
    setUSDC(state, usdcamount){
      state.usdcamount = usdcamount;
      localStorage.setItem('usdc',usdcamount)
    }
  },
  actions: {
  },

});
