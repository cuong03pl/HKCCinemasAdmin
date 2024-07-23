<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý phim </span>
      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createNewFilm"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Tìm kiếm phim" />
      </div>
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
  </div>
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { convertTime } from "../../config/functions";
import { formFields } from "../../config/formFields";
import {
  createNewFilm,
  deleteFilm,
  getAllCategories,
  getFilmList,
  updateFilm,
  GetAllCategoryIdByFilmId,
  SearchFilm,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
export default {
  data() {
    return {
      filmList: [],
      toggleModal: false,
      toggleModalDelete: false,

      selectListData: [],
      formFields: formFields.film,
    };
  },
  created() {
    this.getAllCategories();
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const res = await getFilmList();
        const films = await Promise.all(
          res.data.map(async (item) => {
            const categories = await GetAllCategoryIdByFilmId(item.id);
            return { ...item, categoryIds: categories.data };
          })
        );
        this.filmList = films;
      } catch (error) {}
    },
    async getAllCategories() {
      try {
        await getAllCategories().then(
          (res) => (this.selectListData = JSON.parse(JSON.stringify(res.data)))
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async createNewFilm(form_data) {
      var formData = new FormData();
      formData.append("title", form_data.title);
      formData.append("detail", form_data.detail);
      formData.append("synopsis", form_data.synopsis);
      formData.append("ageLimit", form_data.ageLimit);
      formData.append("duration", form_data.duration);
      formData.append("country", form_data.country);
      formData.append("rating", form_data.rating);
      formData.append("formFile", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("releaseDate", form_data.releaseDate);
      formData.append("endDate", form_data.endDate);
      if (form_data.categoryIds) {
        form_data.categoryIds?.forEach((item) => {
          formData.append("categoryIds[]", item);
        });
      }
      formData.append("director", form_data.director);
      await createNewFilm(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadFilm();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            store.commit("setNotifyModal", {
              isOpen: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            });
          }
        });
    },
    async updateFilm(id, form_data) {
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
      formData.append("formFileBackground", form_data.background);
      formData.append("releaseDate", form_data.releaseDate);
      formData.append("endDate", form_data.endDate);
      form_data.categoryIds?.forEach((item) => {
        formData.append("categoryIds[]", item);
      });
      formData.append("director", form_data.director);

      await updateFilm(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadFilm();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            store.commit("setNotifyModal", {
              isOpen: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            });
          }
        });
    },
    async deleteFilm(id) {
      await deleteFilm(id)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadFilm();
        })
        .catch((err) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: "Xóa không thành công",
          });
        });
    },
    async search(keyword) {
      if (keyword !== "") {
        try {
          const res = await SearchFilm(keyword);
          const films = await Promise.all(
            res.data.map(async (item) => {
              const categories = await GetAllCategoryIdByFilmId(item.id);
              return { ...item, categoryIds: categories.data };
            })
          );
          this.filmList = films;
        } catch (error) {}
      } else this.loadData();
    },
    convertTime,
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage, Search },
};
</script>

<style></style>
