<template>
  <div class="flex gap-2 items-center">
    <button
      v-if="!onlyDelete"
      @click="handleOpen"
      class="bg-[#0d6efd] hover:opacity-80 h-[35px] w-[70px] px-2 py-1 rounded-lg text-[white] font-bold"
    >
      Sửa
    </button>
    <button
      @click="handleOpenModalDelete"
      class="bg-[#dc3545] hover:opacity-80 h-[35px] w-[70px] px-2 py-1 rounded-lg text-[white] font-bold"
    >
      Xóa
    </button>
  </div>
  <Modal
    :data="data"
    :isOpen="toggleModal"
    @handleClose="handleClose"
    @handleUpdate="handleUpdate"
    :formFields="formFields"
    :selectListData="selectListData"
    @handleChange="handleChange"
  />
  <ModalDelete
    :isOpen="toggleModalDelete"
    @handleClose="handleCloseModalDelete"
    @handleDelete="handleDelete"
  />
</template>

<script>
import Modal from "./Modal.vue";
import ModalDelete from "./ModalDelete.vue";

export default {
  props: {
    formFields: Array,
    data: Object,
    selectListData: Array,
    onlyDelete: Boolean,
  },
  created() {},
  data() {
    return {
      toggleModal: false,
      toggleModalDelete: false,
    };
  },
  watch: {
    selectListData(newG, oldG) {},
    data(newD, oldD) {},
  },
  methods: {
    handleOpen() {
      this.toggleModal = true;
    },
    handleClose(n) {
      this.toggleModal = n;
    },
    handleOpenModalDelete() {
      this.toggleModalDelete = true;
    },
    handleCloseModalDelete(n) {
      this.toggleModalDelete = n;
    },
    handleDelete() {
      this.$emit("handleDelete", this.data.id);
    },
    handleUpdate(id, data) {
      this.$emit("handleUpdate", id, data);
    },
    handleChange(data) {
      this.$emit("handleChange", data);
    },
  },
  components: { Modal, ModalDelete },
};
</script>

<style></style>
