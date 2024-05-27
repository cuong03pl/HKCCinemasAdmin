<template>
  <div class="flex gap-2 items-center">
    <button
      @click="handleOpen"
      class="bg-[#0d6efd] h-[35px] w-[70px] px-2 py-1 rounded-lg text-[white] font-bold"
    >
      Sửa
    </button>
    <button
      @click="handleOpenModalDelete"
      class="bg-[#dc3545] h-[35px] w-[70px] px-2 py-1 rounded-lg text-[white] font-bold"
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
  },
  components: { Modal, ModalDelete },
};
</script>

<style></style>
