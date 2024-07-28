<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý ngày chiếu </span>

      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createShowDate"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Nhập tên rạp chiếu" />
      </div>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[50%]">Ngày chiếu</span>
        <span class="w-[30%]">Rạp</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in showdateList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[50%]">{{ convertTime(item.date) }}</span>
        <span class="w-[30%]">{{ item?.cinemas?.name }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteShowDate"
            @handleUpdate="updateShowDate"
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
  GetAllShowDates,
  getAllCinemas,
  GetCinemasById,
  createNewShowDate,
  updateShowdate,
  deleteShowdate,
  SearchShowDate,
  GetCountShowDate,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      showdateList: [],
      toggleModal: false,
      toggleModalDelete: false,
      selectListData: [],
      count: 0,
      formFields: formFields.showDate,
      keyword: "",
    };
  },
  created() {
    this.loadData();
    this.initializeData();
    this.getCount();
  },
  computed: {
    countPage() {
      return this.count / paginationConfig.perPage;
    },
  },
  methods: {
    async initializeData() {
      this.getCinemas();
      await this.loadData();
    },
    async loadData() {
      try {
        const res = await GetAllShowDates();
        const showDates = res.data.map((item) => {
          return {
            ...item,
            cinemasId: item.cinemas.id,
          };
        });
        this.showdateList = showDates.slice(0, 5);
        this.count = showDates[0].count;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },

    async getCinemas() {
      try {
        await getAllCinemas().then(
          (res) => (this.selectListData = JSON.parse(JSON.stringify(res.data)))
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async getCinemasName(id) {
      try {
        const res = await GetCinemasById(id);
        return res.data.name;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
        return null;
      }
    },

    async createShowDate(form_data) {
      var formData = new FormData();
      formData.append("date", form_data.date);
      formData.append("cinemasId", form_data.cinemasId);

      await createNewShowDate(formData)
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
    async updateShowDate(id, form_data) {
      var formData = new FormData();
      formData.append("date", form_data.date);
      formData.append("cinemasId", form_data.cinemasId);

      await updateShowdate(id, formData)
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
    async deleteShowDate(id) {
      await deleteShowdate(id)
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
      const res = await GetCountShowDate();

      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchShowDate({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword || this.$route?.query?.q,
          },
        });
        const showDates = res.data.map((item) => {
          return {
            ...item,
            cinemasId: item.cinemas.id,
          };
        });
        this.showdateList = showDates;
        this.count = showDates[0].count;
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
