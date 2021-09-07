import { createRouter, createWebHashHistory } from 'vue-router'
import Claim from '../views/Claim.vue'

const routes = [
  {
    path: '/',
    name: 'Claim',
    component: Claim
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
