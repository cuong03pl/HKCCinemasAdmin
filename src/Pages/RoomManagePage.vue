<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý phòng chiếu phim </span>

      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createRoom"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Nhập tên rạp" />
      </div>
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
          {{ item?.roomName }}
        </div>
        <span class="w-[30%]">{{ item?.cinemas?.name }}</span>
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
  getAllCinemas,
  createNewRoom,
  deleteRoom,
  updateRoom,
  SearchRoom,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
export default {
  data() {
    return {
      roomList: [],
      toggleModal: false,
      toggleModalDelete: false,

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
    async loadData() {
      await GetAllRooms().then((res) => {
        const rooms = res.data.map((item) => {
          return { ...item, cinemasId: item.cinemas.id };
        });
        this.roomList = rooms;
      });
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

    async createRoom(form_data) {
      var formData = new FormData();
      formData.append("roomName", form_data.roomName);
      formData.append("cinemasId", form_data.cinemasId);
      await createNewRoom(formData)
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
    async updateRoom(id, form_data) {
      var formData = new FormData();
      formData.append("roomName", form_data.roomName);
      formData.append("cinemasId", form_data.cinemasId);

      await updateRoom(id, formData)
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
    async deleteRoom(id) {
      await deleteRoom(id)
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
          const res = await SearchRoom(keyword);
          const rooms = await Promise.all(
            res.data.map(async (item) => {
              return { ...item, cinemasId: item?.cinemas?.id };
            })
          );
          this.roomList = rooms;
        } catch (error) {}
      } else this.loadData();
    },
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage, Search },
};
</script>

<style></style>
