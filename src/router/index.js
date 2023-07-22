import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/store';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/Account/LoginView.vue'
import PurchaseView from '../views/Trade/PurchaseView.vue'
import RegisterViews from '../views/Account/RegisterView.vue'
import SellView from '../views/Trade/SellingView.vue'
import HistoryView from '../views/Data Info/HistoryView.vue'
import CurrentState from '../views/Data Info/CurrentState.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterViews
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { protectedView: true}
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: PurchaseView,
    meta: { protectedView: true}
  },
  {
    path: '/sell',
    name: 'Sell',
    component: SellView,
    meta: { protectedView: true}
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryView,
    meta: { protectedView: true}
  },
  {
    path: '/state',
    name: 'CurrentState',
    component: CurrentState,
    meta: {protectedView: true}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next)=>{
  const view = to.matched.some((item) => item.meta.protectedView);
  if(view && store.state.id == null)
{
  next('/')
}else{
  next();
}})
export default router;
