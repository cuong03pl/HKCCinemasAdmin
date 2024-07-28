<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý suất chiếu </span>

      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createSchedule"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
          @handleChange="handleCinemaChange"
        />
        <Search @handleSubmit="search" placeholder="Nhập tên phim" />
      </div>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[20%]">Tên rạp</span>
        <span class="w-[20%]">Tên phim</span>
        <span class="w-[10%]">Phòng chiếu</span>
        <span class="w-[10%]">Ngày chiếu</span>
        <span class="w-[10%]">Bắt đầu</span>
        <span class="w-[10%]">Kết thúc</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in this.scheduleList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[20%]">{{ item.cinemas.name }}</span>
        <span class="w-[20%]">{{ item.film.title }}</span>
        <span class="w-[10%]">{{ item.room.roomName }}</span>
        <span class="w-[10%]">{{
          item.showDate ? convertTime(item.showDate.date) : ""
        }}</span>
        <span class="w-[10%]">{{ item.startTime }}</span>
        <span class="w-[10%]">{{ item.endTime }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteSchedule"
            @handleUpdate="updateSchedule"
            :data="item"
            :formFields="formFields"
            :selectListData="selectListData"
            @handleChange="handleCinemaChange"
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
import { convertTime } from "../../config/functions";
import {
  GetAllSchedules,
  getAllCinemas,
  GetNowShowingFilms,
  GetAllShowDateByCinemasId,
  GetRoomByCinemasId,
  IsCinemaRoomOccupied,
  createNewSchedule,
  updateSchedule,
  deleteSchedule,
  SearchSchedule,
  GetCountSchedule,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      scheduleList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,

      selectListData: [],
      formFields: formFields.schedule,
      keyword: "",
    };
  },
  mounted() {
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
      await this.loadData();
      await this.getCinemas();
      await this.getFilms();
    },
    async loadData() {
      try {
        const res = await GetAllSchedules();
        const schedules = res.data.map((item) => {
          return {
            ...item,
            cinemasId: item.cinemas.id,
            filmId: item.film.id,
            roomId: item.room.id,
            showDateId: item.showDate.id,
          };
        });
        this.scheduleList = schedules.slice(0, 5);
        this.count = res.data[0].count;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },

    async getCinemas() {
      try {
        const res = await getAllCinemas();
        this.selectListData = {
          cinemasId: res.data,
        };
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async getFilms() {
      try {
        const res = await GetNowShowingFilms();
        this.selectListData = {
          ...this.selectListData,
          filmId: res.data,
        };
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },

    async getShowDate(selectedCinemaId) {
      try {
        await GetAllShowDateByCinemasId(selectedCinemaId.value).then(
          (res) =>
            (this.selectListData = {
              ...this.selectListData,
              showDateId: res.data,
            })
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async getRoomByCinemasId(selectedCinemaId) {
      try {
        await GetRoomByCinemasId(selectedCinemaId).then(
          (res) =>
            (this.selectListData = {
              ...this.selectListData,
              roomId: res.data,
            })
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async isCinemaRoomOccupied(form_data) {
      try {
        const res = await IsCinemaRoomOccupied({
          params: {
            Id: 1,
            FilmId: form_data.filmId,
            RoomId: form_data.roomId,
            ShowDateId: form_data.showDateId,
            CinemasId: form_data.cinemasId,
            StartTime: form_data.startTime,
          },
        });
        return res;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async createSchedule(form_data) {
      var formData = new FormData();
      formData.append("filmId", form_data.filmId);
      formData.append("cinemasId", form_data.cinemasId);
      formData.append("roomId", form_data.roomId);
      formData.append("showDateId", form_data.showDateId);
      formData.append("startTime", form_data.startTime);
      var data = await this.isCinemaRoomOccupied(form_data);
      if (data.data) {
        store.commit("setNotifyModal", {
          isOpen: true,
          message: "Phòng chiếu này đã bị trùng giờ",
        });

        return;
      }
      await createNewSchedule(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.initializeData();
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
    async updateSchedule(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("filmId", form_data.filmId);
      formData.append("cinemasId", form_data.cinemasId);
      formData.append("roomId", form_data.roomId);
      formData.append("showDateId", form_data.showDateId);
      formData.append("startTime", form_data.startTime);

      await updateSchedule(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.initializeData();
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
    async deleteSchedule(id) {
      await deleteSchedule(id)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.initializeData();
        })
        .catch((err) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: "Xóa không thành công",
          });
        });
    },

    handleCinemaChange(cinemaId) {
      this.selectedCinemaId = cinemaId.value;
      this.getRoomByCinemasId(cinemaId.value);
      this.getShowDate(cinemaId);
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
      const res = await GetCountSchedule();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchSchedule({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const schedules = res.data.map((item) => {
          return {
            ...item,
            cinemasId: item.cinemas.id,
            filmId: item.film.id,
            roomId: item.room.id,
            showDateId: item.showDate.id,
          };
        });
        this.scheduleList = schedules;
        this.count = schedules[0].count;
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
