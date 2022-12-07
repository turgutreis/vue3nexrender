<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <User />
  </div>
</template>

<script>
// @ is an alias to /src
import User from "@/components/User.vue";
export default {
  name: "HomeView",
  components: {
    User,
  },
};
</script>
