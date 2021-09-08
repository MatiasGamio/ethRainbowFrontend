import { createRouter, createWebHashHistory } from 'vue-router'
import Claim from '../views/Claim.vue'
import Experiment from '../views/ExperimentSoon.vue'

const routes = [
  {
    path: '/',
    name: 'Claim',
    component: Claim
  },
  {
    path: '/experiment',
    name: 'Experiment',
    component: Experiment
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
