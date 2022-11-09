<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>
          {{ name }}
        </h4>
      </li>
      <li class="collection-item">Employee ID#: {{ employee_id }}</li>
      <li class="collection-item">Department: {{ dept }}</li>
      <li class="collection-item">Position: {{ position }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button class="btn red" @click="deleteEmployee">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        :to="{
          name: 'edit-employee',
          params: { employee_id: employee_id ? employee_id : 1 },
        }"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'

export default {
  name: 'ViewEmployee',
  beforeRouteEnter: async function (to, from, next) {
    const employeesCollectionRef = collection(db, 'employees')
    const employeeCollectionQuery = query(
      employeesCollectionRef,
      where('employee_id', '==', to.params.employee_id)
    )

    const querySnapshot = await getDocs(employeeCollectionQuery)
    querySnapshot.forEach((doc) => {
      next((vm) => {
        vm.employee_id = doc.data().employee_id
        vm.name = doc.data().name
        vm.dept = doc.data().dept
        vm.position = doc.data().position
      })
    })
  },
  data() {
    return { employee_id: null, name: null, dept: null, position: null }
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      const employeesCollectionRef = collection(db, 'employees')
      const employeeCollectionQuery = query(
        employeesCollectionRef,
        where('employee_id', '==', this.$route.params.employee_id)
      )

      const querySnapshot = getDocs(employeeCollectionQuery)

      querySnapshot.forEach((doc) => {
        this.employee_id = doc.data().employee_id
        this.name = doc.data().name
        this.dept = doc.data().dept
        this.position = doc.data().position
      })
    },
    deleteEmployee: async function () {
      if (confirm('Are you sure?')) {
        const employeesCollectionRef = collection(db, 'employees')
        const employeeCollectionQuery = query(
          employeesCollectionRef,
          where('employee_id', '==', this.$route.params.employee_id)
        )

        const querySnapshot = await getDocs(employeeCollectionQuery)

        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref)
          this.$routes.push('/')
        })
      }
    },
  },
}
</script>
