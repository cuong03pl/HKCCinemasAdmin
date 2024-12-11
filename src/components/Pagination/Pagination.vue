<template>
  <div
    class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center mb-4 sm:mb-0">
      <button
        @click="prevPage"
        class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg
          class="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        @click="nextPage"
        class="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg
          class="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
        >Showing
        <span class="font-semibold text-gray-900 dark:text-white"
          >{{ (currentPage - 1) * pageSize + 1 ?? 0 }} -
          {{ currentPage * pageSize > count ? count : currentPage * pageSize }}
        </span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{{
          count
        }}</span></span
      >
    </div>
    <div class="flex items-center space-x-3">
      <button
        @click="prevPage"
        class="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <svg
          class="w-5 h-5 mr-1 -ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Previous
      </button>
      <button
        @click="nextPage"
        class="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Next
        <svg
          class="w-5 h-5 ml-1 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: Number,
    pageSize: Number,
    currentPage: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage === 1) {
        console.log("a");

        this.$emit("handlePagination", 1);
      } else {
        console.log("b");

        this.$emit("handlePagination", this.currentPage - 1);
      }
    },

    nextPage() {
      if (this.currentPage + 1 >= this.pageCount) {
        console.log("c");

        this.$emit("handlePagination", this.pageCount);
      } else this.$emit("handlePagination", this.currentPage + 1);
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  list-style-type: none;
}
.page-item {
  margin: 0 5px;
  background: #cccccc75;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  font-weight: 500;
}
.page-link {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.active-class {
  background: #0d6efd;
  color: #fff;
}
</style>
