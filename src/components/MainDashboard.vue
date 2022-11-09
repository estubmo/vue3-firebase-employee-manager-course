<template>
  <div id="main-dashboard">
    <h3>Dashboard</h3>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li
        v-for="employee in employees"
        :key="employee.id"
        class="collection-item"
      >
        <div class="chip">{{ employee.dept }}</div>
        {{ employee.employee_id }}:{{ employee.name }}

        <router-link
          class="secondary-content"
          :to="{
            name: 'view-employee',
            params: { employee_id: employee.employee_id },
          }"
          ><i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'

export default {
  name: 'MainDashboard',
  data() {
    return {
      employees: [],
    }
  },
  created: async function () {
    const employeesCollectionRef = collection(db, 'employees')
    const employeesCollectionQuery = query(
      employeesCollectionRef,
      orderBy('dept')
    )

    const querySnapshot = await getDocs(employeesCollectionQuery)

    // Getting actual data requires fetching doc.data()
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        employee_id: doc.data().employee_id,
        name: doc.data().name,
        dept: doc.data().dept,
        position: doc.data().position,
      }
      this.employees.push(data)
    })
  },
}
</script>
