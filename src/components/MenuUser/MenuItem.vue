<template>
  <li>
    <Button
      menuBtn
      :to="this.data.to"
      @click="this.data?.action"
      :title="data.title"
      :leftIcon="this.data?.icon"
      class="w-full block text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
    >
      {{ data.title }}
    </Button>
  </li>
</template>

<script>
import Button from "../Button/Button.vue";

export default {
  components: { Button },
  props: {
    data: Object,
  },
};
</script>

<style></style>
