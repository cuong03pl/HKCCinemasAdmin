<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý suất chiếu </span>
      <ButtonHandleCreate
        @handleCreate="createSchedule"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
        @handleChange="handleCinemaChange"
      />
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
} from "@/Services/FetchAPI";
export default {
  data() {
    return {
      scheduleList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      selectListData: [],
      formFields: formFields.schedule,
    };
  },
  mounted() {
    this.initializeData();
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
        this.scheduleList = schedules;
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
        this.message = "Phòng chiếu này đã bị trùng giờ";
        this.toggleModalMessage = true;
        return;
      }
      await createNewSchedule(formData)
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.initializeData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
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
          this.toggleModalMessage = true;
          this.message = res.data;
          this.initializeData();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    async deleteSchedule(id) {
      await deleteSchedule(id)
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.initializeData();
        })
        .catch((err) => {
          this.message = "Xóa không thành công";
          this.toggleModalMessage = true;
        });
    },
    handleClose(n) {
      this.toggleModalMessage = n;
    },
    handleCinemaChange(cinemaId) {
      this.selectedCinemaId = cinemaId.value;
      this.getRoomByCinemasId(cinemaId.value);
      this.getShowDate(cinemaId);
      console.log(this.selectListData);
    },

    convertTime,
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage },
};
</script>

<style></style>
