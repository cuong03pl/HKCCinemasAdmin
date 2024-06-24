<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý chỗ ngồi </span>
      <ButtonHandleCreate
        @handleCreate="createSeat"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Tên chỗ ngồi</span>
        <span class="w-[30%]">Tên phòng</span>
        <span class="w-[25%]">Tên rạp</span>
        <span class="w-[10%]">Trạng thái</span>
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
        <span class="w-[25%]">{{ item.cinemas.name }}</span>
        <span class="w-[10%]">{{
          item.status == 1 ? "Còn trống" : "Đã đặt"
        }}</span>
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
} from "@/Services/FetchAPI";
import store from "@/store/store";
export default {
  data() {
    return {
      seatList: [],
      toggleModal: false,
      toggleModalDelete: false,

      selectListData: [],
      formFields: formFields.seat,
      roomName: "",
      statusData: [
        {
          id: 0,
          name: "Đã đặt",
        },
        {
          id: 1,
          name: "Còn trống",
        },
      ],
    };
  },
  created() {
    this.getRooms();
    this.loadData();
    this.selectListData = { status: this.statusData };
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
        this.seatList = seats;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async getRooms() {
      try {
        await GetAllRooms().then((res) => {
          (this.selectListData = {
            ...this.selectListData,
            roomID: res.data,
          }),
            console.log(this.selectListData);
          console.log(res);
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
      formData.append("status", form_data.status);

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
      formData.append("status", form_data.status);

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
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage },
};
</script>

<style></style>
