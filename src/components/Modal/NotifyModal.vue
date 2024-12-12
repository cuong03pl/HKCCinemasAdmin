<template>
  <!-- thong tin phim + tong tien -->
  <div class="bg-white p-[16px] w-[600px] rounded-xl z-[999]">
    <!-- ten phim + do tuoi -->
    <span class="flex justify-center mb-[20px] font-bold text-[20px]">{{
      this.message
    }}</span>
    <div class="flex justify-center items-center">
      <Button loginBtn title="OK" @click="handleCloseModal" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    message: String,
    handleCloseModal: Function,
  },
};
</script>

<style></style>
