import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import MainDashboard from '@/components/MainDashboard'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import ViewEmployee from '@/components/ViewEmployee'

const routes = [
  { path: '/', component: MainDashboard, name: 'main-dashboard' },
  { path: '/new', component: NewEmployee, name: 'new-employee' },
  {
    path: '/edit/:employee_id',
    component: EditEmployee,
    name: 'edit-employee',
  },
  {
    path: '/:employee_id',
    component: ViewEmployee,
    name: 'view-employee',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
