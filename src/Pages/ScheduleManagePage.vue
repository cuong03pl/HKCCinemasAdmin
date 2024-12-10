<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Schedule" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          All schedules
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Search for schedules" />
        <!-- End search -->
        <ButtonHandleCreate
          @handleCreate="createSchedule"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
          @handleChange="handleCinemaChange"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden shadow">
          <table
            class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600"
          >
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên rạp
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên phim
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Phòng chiếu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Ngày chiếu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Bắt đầu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Kết thúc
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
            >
              <tr
                v-for="(item, index) in scheduleList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.cinemas.name }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.film.title }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.room.roomName }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.showDate ? convertTime(item.showDate.date) : "" }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.startTime }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.endTime }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteSchedule"
                    @handleUpdate="updateSchedule"
                    :data="item"
                    :formFields="formFields"
                    :selectListData="selectListData"
                    @handleChange="handleCinemaChange"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Pagination
              :pageCount="countPage"
              @handlePagination="handlePagination"
            />
          </div>
        </div>
      </div>
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
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
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
    Breadcrumb,
  },
};
</script>

<style></style>
