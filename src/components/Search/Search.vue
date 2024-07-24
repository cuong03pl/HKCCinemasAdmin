<template>
  <div class="w-[50%]">
    <div
      class="py-2 h-[40px] flex items-center border border-gray-300 rounded-lg bg-gray-50"
    >
      <div class="flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        v-model="keyword"
        class="block w-full text-sm px-2 text-gray-900 outline-none"
        :placeholder="placeholder"
      />
      <button
        @click="handleSubmit"
        class="text-white text-nowrap px-2 bg-btnPrimary hover:opacity-80 font-medium rounded-lg text-sm py-2 flex"
      >
        Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
