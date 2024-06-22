<template>
  <div :class="this.class" class="flex gap-2 items-center">
    <button
      @click="handleOpen"
      class="bg-[#0d6efd] h-[35px] w-[100px] px-2 py-1 rounded-lg text-[white] font-bold"
    >
      Set role
    </button>
  </div>
  <Modal
    :data="data"
    :isOpen="toggleModal"
    @handleClose="handleClose"
    :formFields="formFields"
    :selectListData="selectListData"
    @handleUpdate="handleUpdate"
  ></Modal>
</template>

<script>
import Modal from "./Modal.vue";
import ModalDelete from "./ModalDelete.vue";

export default {
  props: {
    formFields: Array,
    data: Object,
    class: String,
    selectListData: Array,
  },
  data() {
    return {
      toggleModal: false,
    };
  },
  watch: {},
  methods: {
    handleOpen() {
      this.toggleModal = true;
    },
    handleClose(n) {
      this.toggleModal = n;
    },

    handleUpdate(id, data) {
      this.$emit("handleUpdate", id, data);
    },
  },
  components: { Modal, ModalDelete },
};
</script>

<style></style>
