<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý thể loại phim </span>
      <ButtonHandleCreate
        @handleCreate="createNewCategory"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[30%]">Tên thể loại</span>
        <span class="w-[45%]"></span>
        <span class="w-[25%]">Chức năng</span>
      </div>
      <div
        v-for="(item, index) in categoryList"
        :key="index"
        class="flex justify-between items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[30%]">{{ item.name }}</span>
        <span class="w-[45%]">{{}}</span>
        <span class="w-[25%]">
          <ButtonHandleModal
            @handleDelete="deleteCategory"
            @handleUpdate="updateCategory"
            :data="item"
            :formFields="formFields"
          />
        </span>
      </div>
    </div>
    <ModelMessage
      :isOpen="toggleModalMessage"
      @handleClose="handleClose"
      :message="message"
    />
  </div>
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { convertTime } from "../../config/functions";
import { formFields } from "../../config/formFields";
export default {
  data() {
    return {
      categoryList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      formFields: formFields.category,
    };
  },
  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      axios
        .get("https://localhost:7253/api/Categories/getAllCategories")
        .then((res) => (this.categoryList = res.data));
    },

    createNewCategory(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      axios
        .post("https://localhost:7253/api/Categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
          this.toggleModal = false;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    updateCategory(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      axios
        .put(`https://localhost:7253/api/Categories/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    deleteCategory(id) {
      axios
        .delete(`https://localhost:7253/api/Categories/${id}`)
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
        })
        .catch((err) => {
          this.message = "Xóa không thành công";
          this.toggleModalMessage = true;
        });
    },
    handleClose(n) {
      this.toggleModalMessage = n;
    },
    convertTime,
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage },
};
</script>

<style></style>
