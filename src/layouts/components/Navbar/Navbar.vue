<template>
    <aside :class="sidebarToggle ? 'translate-x-0' : '-translate-x-full'" class="w-[290px] px-[24px] py-[16px] absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#1c2434] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full" @click="sidebarToggle = false">
      <div class="font-bold text-[36px] px-4 text-white px-[24px] py-[26px]">Admin</div>
      
      <Menu />
    </aside>
  </template>
  
  <script>
import Menu from './Menu.vue';
  export default {
  components: { Menu },
    data() {
      return {
        sidebarToggle: false,
      };
    },
    methods: {
      // Any methods you want to define
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles */
  </style>
  