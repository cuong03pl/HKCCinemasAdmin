<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý thể loại phim </span>

      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createNewCategory"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Nhập tên thể loại phim" />
      </div>
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
import { convertTime } from "../../config/functions";
import { formFields } from "../../config/formFields";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  GetCountCategory,
  SearchCategory,
  updateCategory,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      categoryList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,
      keyword: "",
      formFields: formFields.category,
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
      try {
        const res = await getAllCategories();
        this.categoryList = res.data.slice(0, 5);
        this.count = res.data[0].count;
      } catch (error) {}
    },

    async createNewCategory(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      await createNewCategory(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
          this.toggleModal = false;
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
    async updateCategory(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      await updateCategory(id, formData)
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
    async deleteCategory(id) {
      await deleteCategory(id)
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
      const res = await GetCountCategory();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchCategory({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        this.categoryList = res.data;
        this.count = res.data[0].count;
      } catch (error) {}
    },
    convertTime,
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
