<template>
  <div :class="this.class" class="flex gap-2 items-center">
    <button
      @click="handleOpen"
      class="bg-btnPrimary h-[35px] w-[70px] px-2 py-1 flex items-center justify-center rounded-lg text-[white] font-bold hover:opacity-80"
    >
      <create-icon :width="20" :height="20" />
    </button>
  </div>
  <Modal
    @handleCreate="handleCreate"
    @handleChange="handleChange"
    :data="data"
    :isCreate="true"
    :isOpen="toggleModal"
    @handleClose="handleClose"
    :formFields="formFields"
    :selectListData="selectListData"
    :title="title"
  ></Modal>
</template>

<script>
import CreateIcon from "../Icon/CreateIcon.vue";
import Modal from "./Modal.vue";
import ModalDelete from "./ModalDelete.vue";

export default {
  props: {
    formFields: Array,
    data: Object,
    class: String,
    handleCreate: Function,
    selectListData: Array,
    title: String,
  },
  data() {
    return {
      toggleModal: false,
      toggleModalDelete: false,
    };
  },
  watch: {
    selectListData(newG, oldG) {},
  },
  methods: {
    handleOpen() {
      this.toggleModal = true;
    },
    handleClose(n) {
      this.toggleModal = n;
    },
    handleCreate(data) {
      this.$emit("handleCreate", data);
    },
    handleChange(data) {
      this.$emit("handleChange", data);
    },
  },
  components: { Modal, ModalDelete, CreateIcon },
};
</script>

<style></style>
