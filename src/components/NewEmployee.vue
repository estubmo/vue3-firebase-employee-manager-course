<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form class="col s12" @submit.prevent="saveEmployee">
        <div class="row">
          <div class="input-field col s12">
            <input v-model="employee_id" type="text" required />
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="name" type="text" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="dept" type="text" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="position" type="text" required />
            <label>Position</label>
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
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'NewEmployee',
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
    }
  },
  methods: {
    saveEmployee: async function () {
      const employeesCollectionRef = collection(db, 'employees')
      try {
        await addDoc(employeesCollectionRef, {
          employee_id: this.employee_id,
          name: this.name,
          dept: this.dept,
          position: this.position,
        })
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
