<template>
  <div
    class="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
      <MenuItem v-for="(item, index) in data" :data="item" :key="index" />
    </ul>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
export default {
  components: { MenuItem },
  props: {
    data: Array,
  },
};
</script>

<style></style>
