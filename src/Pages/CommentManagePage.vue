<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý bình luận </span>
    </div>
    <div class="flex justify-between items-center my-2">
      <Search @handleSubmit="search" placeholder="Nhập tên phim" />
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
          {{ item.userName }}
        </div>
        <span class="w-[30%] max-w-[330px] text-wrap overflow-hidden">{{
          item.content
        }}</span>
        <span class="w-[20%]">{{ item.filmTitle }}</span>
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
  SearchComment,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
export default {
  data() {
    return {
      commentList: [],
      toggleModal: false,
      toggleModalDelete: false,

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
      const res = await GetAllComments();
      const comments = await Promise.all(
        res.data.map(async (item) => {
          const userName = await this.getUserName(item.userID);
          const filmName = await this.getFilmName(item.filmId);
          return { ...item, filmTitle: filmName, userName: userName };
        })
      );
      this.commentList = comments;
    },
    async getUserName(id) {
      try {
        return await getUserById(id).then((res) => res.data.userName);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async getFilmName(id) {
      try {
        return await getFilmById(id).then((res) => res.data.title);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async deleteComment(id) {
      await deleteComment(id)
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
          const res = await SearchComment(keyword);
          const comments = await Promise.all(
            res.data.map(async (item) => {
              const userName = await this.getUserName(item.userID);
              const filmName = await this.getFilmName(item.filmId);
              return { ...item, filmTitle: filmName, userName: userName };
            })
          );
          this.commentList = comments;
        } catch (error) {}
      } else this.loadData();
    },
    convertTime,
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage, Search },
};
</script>

<style></style>
