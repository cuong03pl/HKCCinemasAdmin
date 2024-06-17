<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý rạp phim </span>
      <ButtonHandleCreate
        @handleCreate="createNewCinemas"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
        :selectListData="selectListData"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Ảnh rạp phim</span>
        <span class="w-[30%]">Tên rạp</span>
        <span class="w-[30%]">Địa chỉ</span>
        <span class="w-[25%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in filmList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <div class="w-[15%] flex items-center justify-center">
          <img
            class="w-full h-full"
            :src="`https://localhost:7253/${item.image}`"
            alt=""
          />
        </div>
        <span class="w-[30%]">{{ item.name }}</span>
        <span class="w-[30%]">{{ item.address }}</span>
        <span class="w-[25%]">
          <ButtonHandleModal
            @handleDelete="deleteCinemas"
            @handleUpdate="updateCinemas"
            :data="item"
            :formFields="formFields"
            :selectListData="selectListData"
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
      filmList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      selectListData: [],
      message: Object,
      formFields: formFields.cinemas,
    };
  },
  created() {
    this.getAllCategories();
    this.loadData();
  },

  methods: {
    loadData() {
      axios.get("https://localhost:7253/api/Cinemas").then((res) => {
        this.filmList = res.data;
      });
    },
    getAllCategories() {
      try {
        axios
          .get("https://localhost:7253/api/CinemasCategories")
          .then((res) => {
            this.selectListData = JSON.parse(JSON.stringify(res.data));
          });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    createNewCinemas(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("address", form_data.address);
      formData.append("specialOffer", form_data.specialOffer);
      formData.append("formFileImage", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("cinemasCategoryId", form_data.cinemasCategoryId);

      axios
        .post("https://localhost:7253/api/Cinemas", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
          this.toggleModal = false;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    updateCinemas(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("address", form_data.address);
      formData.append("specialOffer", form_data.specialOffer);
      formData.append("formFileImage", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("cinemasCategoryId", form_data.cinemasCategoryId);

      axios
        .put(`https://localhost:7253/api/Cinemas/${id}`, formData, {
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
    deleteCinemas(id) {
      axios
        .delete(`https://localhost:7253/api/Cinemas/${id}`)
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
