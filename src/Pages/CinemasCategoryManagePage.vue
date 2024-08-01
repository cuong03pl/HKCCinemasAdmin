<template>
  <div>
    <div>
      <span class="text-[30px] font-bold">
        Quản lý rạp chiếu phim (Công ty)
      </span>
      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createNewCinemasCategory"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Nhập rạp chiếu" />
      </div>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Ảnh rạp chiếu</span>
        <span class="w-[30%]">Tên rạp chiếu</span>
        <span class="w-[35%]"></span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in cinemasCategoryList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <div class="w-[15%] flex items-center justify-center">
          <img
            class="w-full h-full"
            :src="`https://hkccinemas.azurewebsites.net/${item.image}`"
            alt=""
          />
        </div>
        <span class="w-[30%]">{{ item.name }}</span>
        <span class="w-[35%]">{{}}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteCinemasCategory"
            @handleUpdate="updateCinemasCategory"
            :data="item"
            :formFields="formFields"
            :selectListData="selectListData"
          />
        </span>
      </div>
    </div>
    <div>
      <Pagination :pageCount="countPage" @handlePagination="handlePagination" />
    </div>
  </div>
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { formFields } from "../../config/formFields";
import {
  createNewCinemasCategories,
  deleteCinemasCategory,
  getAllCinemasCategories,
  GetCountCinemasCategory,
  SearchCinemasCategory,
  updateCinemasCategory,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      cinemasCategoryList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,
      keyword: "",

      selectListData: [],
      formFields: formFields.cinemas_category,
    };
  },
  created() {
    this.loadData();
    this.getCount();
  },
  computed: {
    countPage() {
      return this.count / paginationConfig.perPage;
    },
  },
  methods: {
    async loadData() {
      await getAllCinemasCategories().then((res) => {
        this.cinemasCategoryList = res.data.slice(0, 5);
        this.count = res.data[0].count;
      });
    },

    async createNewCinemasCategory(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("formFile", form_data.image);

      await createNewCinemasCategories(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            store.commit("setNotifyModal", {
              isOpen: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            });
          }
        });
    },
    async updateCinemasCategory(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("formFile", form_data.image);

      await updateCinemasCategory(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
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
    async deleteCinemasCategory(id) {
      await deleteCinemasCategory(id)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
        })
        .catch((err) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: "Xóa không thành công",
          });
        });
    },
    async search(keyword) {
      this.keyword = keyword;
      this.handlePagination(1);
      this.$router.push({
        query: {
          ...this.$route.query,
          q: keyword,
        },
      });
    },
    async getCount() {
      const res = await GetCountCinemasCategory();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchCinemasCategory({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        this.cinemasCategoryList = res.data;
        this.count = res.data[0].count;
      } catch (error) {}
    },
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,
    Search,
    Pagination,
  },
};
</script>

<style></style>
