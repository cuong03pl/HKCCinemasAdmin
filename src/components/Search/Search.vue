<template>
  <div
    class="py-2 flex w-[30%] h-[40px] items-center border border-gray-300 rounded-lg bg-gray-50"
  >
    <input
      v-model="keyword"
      class="bg-transparent text-gray-900 px-3 outline-none sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:focus:ring-primary-500 dark:focus:border-primary-500"
      :placeholder="placeholder"
      @keypress.enter="handleSubmit"
    />
    <button
      @click="handleSubmit"
      class="text-white text-nowrap px-2 bg-btnPrimary hover:opacity-80 font-medium rounded-lg text-sm py-2 flex"
    >
      <SearchIcon :width="20" :height="20" />
    </button>
  </div>
</template>

<script>
import SearchIcon from "../Icon/SearchIcon.vue";
export default {
  components: { SearchIcon },
  props: {
    placeholder: String,
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("handleSubmit", this.keyword);
    },
  },
};
</script>

<style></style>
