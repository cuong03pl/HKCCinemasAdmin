<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý rạp phim </span>
      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createNewCinemas"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
          :selectListData="selectListData"
        />
        <Search @handleSubmit="search" placeholder="Tìm kiếm rạp chiếu" />
      </div>
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
        v-for="(item, index) in cinemasList"
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
  createNewCinemas,
  deleteCinemas,
  getAllCinemas,
  getAllCinemasCategories,
  GetCountCinemas,
  SearchCinemas,
  updateCinemas,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      cinemasList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,

      selectListData: [],
      keyword: "",
      formFields: formFields.cinemas,
    };
  },
  created() {
    this.getAllCategories();
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
      await getAllCinemas().then((res) => {
        this.cinemasList = res.data.slice(0, 5);
        this.count = res.data[0].count;
      });
    },
    async getAllCategories() {
      try {
        await getAllCinemasCategories().then((res) => {
          this.selectListData = JSON.parse(JSON.stringify(res.data));
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async createNewCinemas(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("address", form_data.address);
      formData.append("specialOffer", form_data.specialOffer);
      formData.append("formFileImage", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("cinemasCategoryId", form_data.cinemasCategoryId);

      await createNewCinemas(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
          this.toggleModal = false;
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
    async updateCinemas(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("address", form_data.address);
      formData.append("specialOffer", form_data.specialOffer);
      formData.append("formFileImage", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("cinemasCategoryId", form_data.cinemasCategoryId);

      await updateCinemas(id, formData)
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
    async deleteCinemas(id) {
      await deleteCinemas(id)
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
      const res = await GetCountCinemas();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchCinemas({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword || this.$route?.query?.q,
          },
        });
        this.cinemasList = res.data;
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
