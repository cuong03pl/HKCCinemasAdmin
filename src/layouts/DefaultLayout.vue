<template>
  <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <div class="flex h-screen">
      <Navbar />
      <div
        className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
      >
        <Header></Header>
        <main>
          <div
            className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#f1f5f9]"
          >
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar/Navbar.vue";
export default {
  components: {
    Header,
    Navbar,
  },
};
</script>

<style></style>
