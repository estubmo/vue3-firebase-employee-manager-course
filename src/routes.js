import MainDashboard from '@/components/MainDashboard'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import ViewEmployee from '@/components/ViewEmployee'

const routes = [
  // Routes need a path, a component and a name
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

export default routes
