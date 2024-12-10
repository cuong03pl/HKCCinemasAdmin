<template>
  <div class="">
    <Header />
    <div class="flex h-screen overflow-hidden">
      <Sidebar />
      <div class="relative w-full overflow-y-auto overflow-x-hidden">
        <main>
          <div class="mx-auto max-w-screen-2xl mt-[62px]">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/layouts/components/Header/Header.vue";
import Sidebar from "@/layouts/components/Sidebar/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style></style>
