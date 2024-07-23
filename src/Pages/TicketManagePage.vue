<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý vé phim </span>

      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createTicket"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Nhập tên phim" />
      </div>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Rạp chiếu</span>
        <span class="w-[30%]">Tên phim</span>
        <span class="w-[10%]">Bắt đầu</span>
        <span class="w-[10%]">Kết thúc</span>
        <span class="w-[10%]">Ngày</span>
        <span class="w-[5%]">Giá</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in ticketList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[15%]">{{ item.cinemasName }}</span>
        <span class="w-[30%]">{{ item.filmName }}</span>
        <span class="w-[10%]">{{ item.startTime }}</span>
        <span class="w-[10%]">{{ item.endTime }}</span>
        <span class="w-[10%]">{{ convertTime(item.showDate) }}</span>
        <span class="w-[5%]">{{ item.price }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteTicket"
            @handleUpdate="updateTicket"
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
  createNewTicket,
  deleteTicket,
  GetAllSchedules,
  GetAllTickets,
  GetCinemasById,
  SearchTicket,
  updateTicket,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
export default {
  data() {
    return {
      ticketList: [],
      toggleModal: false,
      toggleModalDelete: false,

      selectListData: [],
      formFields: formFields.ticket,
    };
  },
  created() {
    this.fetchApi();
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const res = await GetAllTickets();
        const tickets = res.data.map((item) => {
          return {
            ...item,
            scheduleId: item.scheduleId,
          };
        });
        this.ticketList = tickets;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async fetchApi() {
      try {
        await GetAllSchedules().then((res) => (this.selectListData = res.data));
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
    async createTicket(form_data) {
      var formData = new FormData();
      formData.append("price", form_data.price);
      formData.append("scheduleId", form_data.scheduleId);

      await createNewTicket(formData)
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
    async updateTicket(id, form_data) {
      var formData = new FormData();
      formData.append("price", form_data.price);
      formData.append("scheduleId", form_data.scheduleId);
      if (form_data.filmIds) {
        form_data.filmIds?.forEach((item) => {
          formData.append("filmIds[]", item);
        });
      }
      await updateTicket(id, formData)
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
    async deleteTicket(id) {
      await deleteTicket(id)
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
      if (keyword !== "") {
        try {
          const res = await SearchTicket(keyword);
          const tickets = res.data.map((item) => {
            return {
              ...item,
              scheduleId: item.scheduleId,
            };
          });
          this.ticketList = tickets;
        } catch (error) {}
      } else this.loadData();
    },
    convertTime,
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage, Search },
};
</script>

<style></style>
