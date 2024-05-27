<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý phim </span>
      <ButtonHandleCreate
        @handleCreate="createNewFilm"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Ảnh phim</span>
        <span class="w-[25%]">Tên phim</span>
        <span class="w-[10%]">Thời gian phim</span>
        <span class="w-[10%]">Đánh giá</span>
        <span class="w-[10%]">Thời gian phát hành</span>
        <span class="w-[10%]">Thời gian kết thúc</span>
        <span class="w-[10%]">Đạo diễn</span>
        <span class="w-[20%]">Chức năng </span>
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
        <span class="w-[30%]">{{ item.title }}</span>
        <span class="w-[10%]">{{ item.duration }} phút</span>
        <span class="w-[10%]">{{ item.rating }} </span>
        <span class="w-[10%]">{{ convertTime(item.releaseDate) }}</span>
        <span class="w-[10%]">{{
          item.endDate && convertTime(item.endDate)
        }}</span>
        <span class="w-[10%]">{{ item.director }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteFilm"
            @handleUpdate="updateFilm"
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
import convertTime from "../../config/functions";
import { formFields } from "../../config/formFields";
export default {
  data() {
    return {
      filmList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      selectListData: [],
      formFields: formFields.film,
    };
  },
  created() {
    this.getAllCategories();
    this.loadFilm();
  },

  methods: {
    loadFilm() {
      axios
        .get("https://localhost:7253/api/Films")
        .then((res) => (this.filmList = res.data));
    },
    getAllCategories() {
      try {
        axios
          .get("https://localhost:7253/api/Categories/getAllCategories")
          .then(
            (res) =>
              (this.selectListData = JSON.parse(JSON.stringify(res.data)))
          );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    createNewFilm(form_data) {
      var formData = new FormData();
      formData.append("title", form_data.title);
      formData.append("detail", form_data.detail);
      formData.append("synopsis", form_data.synopsis);
      formData.append("ageLimit", form_data.ageLimit);
      formData.append("duration", form_data.duration);
      formData.append("country", form_data.country);
      formData.append("rating", form_data.rating);
      formData.append("formFile", form_data.image);
      formData.append("releaseDate", form_data.releaseDate);
      formData.append("endDate", form_data.endDate);
      if (form_data.categoryIds) {
        form_data.categoryIds?.forEach((item) => {
          formData.append("categoryIds[]", item);
        });
      }
      formData.append("director", form_data.director);
      axios
        .post("https://localhost:7253/api/Films", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadFilm();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    updateFilm(id, form_data) {
      var formData = new FormData();
      formData.append("id", id);
      formData.append("title", form_data.title);
      formData.append("detail", form_data.detail);
      formData.append("synopsis", form_data.synopsis);
      formData.append("ageLimit", form_data.ageLimit);
      formData.append("duration", form_data.duration);
      formData.append("country", form_data.country);
      formData.append("rating", form_data.rating);
      formData.append("formFile", form_data.image);
      formData.append("releaseDate", form_data.releaseDate);
      formData.append("endDate", form_data.endDate);
      form_data.categoryIds?.forEach((item) => {
        formData.append("categoryIds[]", item);
      });
      formData.append("director", form_data.director);

      axios
        .put(`https://localhost:7253/api/Films/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadFilm();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    deleteFilm(id) {
      axios
        .delete(`https://localhost:7253/api/Films/${id}`)
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadFilm();
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
