import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import SellView from '../components/HelloWorld.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/sell',
    name: 'Sell',
    component: SellView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
