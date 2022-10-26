import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import MainDashboard from '@/components/MainDashboard'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import ViewEmployee from '@/components/ViewEmployee'

const routes = [
  { path: '/', component: MainDashboard },
  { path: '/new', component: NewEmployee },
  {
    path: '/edit/:employee_id',
    component: EditEmployee,
  },
  {
    path: '/:employee_id',
    component: ViewEmployee,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
