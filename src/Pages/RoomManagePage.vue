<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý phòng chiếu phim </span>
      <ButtonHandleCreate
        @handleCreate="createRoom"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Tên phòng</span>
        <span class="w-[30%]">Tên rạp</span>
        <span class="w-[35%]"></span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in roomList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <div class="w-[15%]">
          {{ item.roomName }}
        </div>
        <span class="w-[30%]">{{ item.cinemas.name }}</span>
        <span class="w-[35%]">{{}}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteRoom"
            @handleUpdate="updateRoom"
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
import { formFields } from "../../config/formFields";
export default {
  data() {
    return {
      roomList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      selectListData: [],
      formFields: formFields.room,
      cinemasName: "",
    };
  },
  created() {
    this.getCinemas();
    this.loadData();
  },

  methods: {
    loadData() {
      axios.get("https://localhost:7253/api/Rooms").then((res) => {
        this.roomList = res.data;
      });
    },
    getCinemas() {
      try {
        axios
          .get("https://localhost:7253/api/Cinemas")
          .then(
            (res) =>
              (this.selectListData = JSON.parse(JSON.stringify(res.data)))
          );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    createRoom(form_data) {
      var formData = new FormData();
      formData.append("roomName", form_data.roomName);
      formData.append("cinemasId", form_data.cinemasId);
      console.log(formData);
      axios
        .post("https://localhost:7253/api/Rooms", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.toggleModalMessage = true;
          this.message = res.data;
          this.loadData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            this.message = "Vui lòng nhập đầy đủ thông tin";
            this.toggleModalMessage = true;
          }
        });
    },
    updateRoom(id, form_data) {
      var formData = new FormData();
      formData.append("roomName", form_data.roomName);
      formData.append("cinemasId", form_data.cinemasId);

      axios
        .put(`https://localhost:7253/api/Rooms/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
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
    deleteRoom(id) {
      axios
        .delete(`https://localhost:7253/api/Rooms/${id}`)
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
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage },
};
</script>

<style></style>
