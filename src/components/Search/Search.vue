<template>
  <div class="w-[50%]">
    <div
      class="py-2 h-[40px] flex items-center border border-gray-300 rounded-lg bg-gray-50"
    >
      <input
        v-model="keyword"
        class="block w-full text-[16px] px-4 text-gray-900 outline-none bg-transparent"
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
