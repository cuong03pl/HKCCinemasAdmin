<template>
  <aside
    id="sidebar"
    class="top-0 left-0 z-20 flex flex-col hidden flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
    aria-label="Sidebar"
  >
    <div
      class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div
          class="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
        >
          <ul class="pb-2 space-y-2">
            <Menu />
          </ul>
        </div>
      </div>
    </div>
  </aside>

  <div
    class="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
    id="sidebarBackdrop"
  ></div>
</template>

<script>
import Menu from "./Menu.vue";
export default {
  components: { Menu },
  data() {
    return {
      sidebarToggle: false,
      activeMenu: 0,
    };
  },
  methods: {
    handleMenu(id) {
      this.activeMenu = id;
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles */
</style>
