<script setup>
import DashboardPage from "./Pages/DashboardPage.vue";
import HomePage from "./Pages/HomePage.vue";
import DefaultLayout from './layouts/DefaultLayout.vue';

  components: { HomePage, DashboardPage };


</script>

<template>
  
  <router-view></router-view>

</template>

<style scoped>

</style>
