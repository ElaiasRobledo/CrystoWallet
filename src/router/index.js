import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/Account/LoginView.vue'
import PurchaseView from '../views/Trade/PurchaseView.vue'
import RegisterViews from '../views/Account/RegisterView.vue'
import SellView from '../views/Trade/SellingView.vue'
import HistoryView from '../views/Data Info/HistoryView.vue'
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
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: PurchaseView,
  },
  {
    path: '/sell',
    name: 'Sell',
    component: SellView
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
