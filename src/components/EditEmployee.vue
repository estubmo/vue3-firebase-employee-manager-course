<template>
  <div id="edit-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form class="col s12" @submit.prevent="updateEmployee">
        <div class="row">
          <div class="input-field col s12">
            <input v-model="employee_id" disabled type="text" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="name" type="text" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="dept" type="text" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="position" type="text" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Back</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import {
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore'

export default {
  name: 'EditEmployee',
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
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
      doc: null,
      data: 'cakecake',
      ref: null,
    }
  },
  watch: {
    $route: 'beforeRouteEnter',
  },
  methods: {
    updateEmployee: async function () {
      try {
        const employeesCollectionRef = collection(db, 'employees')
        const employeeCollectionQuery = query(
          employeesCollectionRef,
          where('employee_id', '==', this.employee_id)
        )

        const querySnapshot = await getDocs(employeeCollectionQuery)
        let docRef
        querySnapshot.forEach((doc) => {
          docRef = doc.ref
        })

        await updateDoc(docRef, {
          name: this.name,
          dept: this.dept,
          position: this.position,
        })
        this.$router.push({
          name: 'view-employee',
          params: { employee_id: this.employee_id },
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
