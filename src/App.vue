<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <!-- This shows the content of the defined path, resolved by the router -->
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted')
})

export default {
  name: 'App',
  components: {
    NavBar,
  },
}
</script>
