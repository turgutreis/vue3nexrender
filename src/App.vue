<template>
  <div>
    <v-app>
      <v-app-bar height="50" app color="blue" dark>
        <div class="d-flex align-center">
          <!-- <font-awesome-icon class="fa-2xl" icon="seedling" /> -->
          <span class="ml-2">Vue-Render</span>
          <nav>
            <v-btn color="" variant="tonal"> <router-link to="/">Home</router-link> </v-btn>
            <v-btn variant="tonal">
              <router-link to="/admin">Admin</router-link>
            </v-btn>
          </nav>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script setup></script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
