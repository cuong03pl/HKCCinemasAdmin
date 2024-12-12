<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="bg-[#36445c4d] fixed h-full w-full top-0 right-0 left-0 flex justify-center items-center modal-overlay z-[999999]"
    >
      <div class="bg-white p-6 rounded-xl w-[900px] modal-content">
        <div class="flex justify-between items-center">
          <span></span>
          <CloseIcon
            :height="24"
            :width="24"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <span class="font-semibold text-[24px]">
          {{ message }}
        </span>
        <div class="flex justify-end mt-3 gap-3">
          <button
            @click="handleClose"
            class="w-[100px] px-10 py-2 hover:bg-[#ccc] rounded-md flex justify-center"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import store from "@/store/store";
import CloseIcon from "../Icon/CloseIcon.vue";

export default {
  data() {
    return {
      open: this.isOpen,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.message.isOpen;
    },
    message() {
      return this.$store.state.message.message;
    },
  },
  components: { CloseIcon },
  methods: {
    handleClose() {
      store.commit("setNotifyModal", {
        isOpen: false,
        message: "",
      });
    },
  },
};
</script>

<style>
.modal-overlay {
  transition: all 0.3s ease; /* Hiệu ứng fade */
}
.modal-content {
  transition: all 0.3s ease;
}
</style>
