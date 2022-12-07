<template>
    <div class="Admin">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <Admin />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Admin from '@/components/Admin.vue'
  export default {
    name: 'AdminView',
    components: {
      Admin
    }
  }
  </script>