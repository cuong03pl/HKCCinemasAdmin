<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý chỗ ngồi </span>
      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createSeat"
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
        <span class="w-[15%]">Tên chỗ ngồi</span>
        <span class="w-[30%]">Tên phòng</span>
        <span class="w-[35%]">Tên rạp</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in seatList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <div class="w-[15%]">
          {{ item.name }}
        </div>
        <span class="w-[30%]">{{ item.room.roomName }}</span>
        <span class="w-[35%]">{{ item.cinemas.name }}</span>

        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteSeat"
            @handleUpdate="updateSeat"
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
  GetAllRooms,
  GetAllSeats,
  GetRoomById,
  createNewSeat,
  updateSeat,
  deleteSeat,
  SearchSeat,
  GetCountSeat,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      seatList: [],
      toggleModal: false,
      toggleModalDelete: false,

      selectListData: [],
      formFields: formFields.seat,
      roomName: "",
      count: 0,
      keyword: "",
    };
  },
  created() {
    this.getRooms();
    this.loadData();
    this.selectListData = { status: this.statusData };
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
        const res = await GetAllSeats();
        const seats = res.data.map((item) => {
          return {
            ...item,
            roomID: item.room.id,
          };
        });
        this.seatList = seats.slice(0, 5);
        this.count = res.data[0].count;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async getRooms() {
      try {
        await GetAllRooms().then((res) => {
          this.selectListData = {
            ...this.selectListData,
            roomID: res.data,
          };
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async getRoomById(id) {
      try {
        await GetRoomById(id).then((res) => (this.roomName = res.data.name));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async createSeat(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("roomID", form_data.roomID);

      await createNewSeat(formData)
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
    async updateSeat(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("roomID", form_data.roomID);

      await updateSeat(id, formData)
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
    async deleteSeat(id) {
      await deleteSeat(id)
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
      const res = await GetCountSeat();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchSeat({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const seats = res.data.map((item) => {
          return {
            ...item,
            roomID: item.room.id,
          };
        });
        this.seatList = seats;
        this.count = seats[0].count;
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
