<template>
  <header
    class="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 border-b border-solid border-[#e2e8f4] h-header"
  >
    <div
      class="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11"
    >
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button
          aria-controls="sidebar"
          @click="toggleSidebar"
          class="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        ></button>
      </div>

      <div class="hidden sm:block"></div>

      <div class="flex items-center gap-3 2xsm:gap-7">
        <DropdownUser />
      </div>
    </div>
  </header>
</template>

<script>
import DropdownUser from "@/components/DropdownUser.vue";

export default {
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar");
    },
  },
  components: {
    DropdownUser,
  },
};
</script>

<style scoped></style>
