<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý bình luận </span>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Người bình luận</span>
        <span class="w-[30%]">Nội dung</span>
        <span class="w-[20%]">Tên phim</span>
        <span class="w-[15%]">Thời gian</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in commentList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <div class="w-[15%]">
          {{ getUserName(item.userID) || userName }}
        </div>
        <span class="w-[30%] max-w-[330px] text-wrap overflow-hidden">{{
          item.content
        }}</span>
        <span class="w-[20%]">{{ getFilmName(item.filmId) || filmName }}</span>
        <span class="w-[15%]">{{ convertTime(item.time) }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteComment"
            :onlyDelete="true"
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
  deleteComment,
  GetAllComments,
  getFilmById,
  getUserById,
} from "@/Services/FetchAPI";
export default {
  data() {
    return {
      commentList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      selectListData: [],
      formFields: formFields.actor,
      userName: "",
      filmName: "",
    };
  },
  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      await GetAllComments().then((res) => (this.commentList = res.data));
    },
    async getUserName(id) {
      try {
        await getUserById(id).then(
          (res) => (this.userName = res.data.userName)
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async getFilmName(id) {
      try {
        await getFilmById(id).then((res) => (this.filmName = res.data.title));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async deleteComment(id) {
      await deleteComment(id)
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
