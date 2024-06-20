<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý phim </span>
      <ButtonHandleCreate
        @handleCreate="createTicket"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
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
import { convertTime } from "../../config/functions";
import { formFields } from "../../config/formFields";
import {
  createNewTicket,
  deleteTicket,
  GetAllSchedules,
  GetAllTickets,
  GetCinemasById,
  updateTicket,
} from "@/Services/FetchAPI";
export default {
  data() {
    return {
      ticketList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
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
      await GetAllTickets().then((res) => {
        this.ticketList = res.data;
      });
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
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
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
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    async deleteTicket(id) {
      await deleteTicket(id)
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
        })
        .catch((err) => {
          this.message = "Xóa không thành công";
          this.toggleModalMessage = true;
        });
    },
    handleClose(n) {
      this.toggleModalMessage = n;
    },
    convertTime,
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage },
};
</script>

<style></style>
