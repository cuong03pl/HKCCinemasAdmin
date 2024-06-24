<script setup>
import DashboardPage from "./Pages/DashboardPage.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import ModelMessage from "./components/Modal/ModelMessage.vue";
components: {
  DashboardPage;
}
</script>

<template>
  <router-view></router-view>
  <ModelMessage></ModelMessage>
</template>

<style scoped></style>
