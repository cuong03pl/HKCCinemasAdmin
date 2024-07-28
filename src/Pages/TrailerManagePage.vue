<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý trailer </span>

      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createNewTrailer"
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
        <span class="w-[30%]">Demo</span>
        <span class="w-[30%]">Phim</span>
        <span class="w-[30%]">Link</span>
        <span class="w-[10%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in trailerList"
        :key="index"
        class="flex justify-between items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[30%] block">
          <iframe
            :key="index"
            :src="item.link"
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </span>
        <span class="w-[30%] block break-words">{{ item.filmTitle }}</span>
        <span class="w-[30%] block break-words"> {{ item.link }}</span>
        <span class="w-[10%]">
          <ButtonHandleModal
            @handleDelete="deleteTrailer"
            @handleUpdate="updateActor"
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
  createNewTrailer,
  deleteTrailer,
  GetAllTrailers,
  GetCountTrailer,
  getFilmById,
  getFilmList,
  SearchTrailer,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      trailerList: [],
      toggleModal: false,
      toggleModalDelete: false,

      selectListData: [],
      count: 0,
      formFields: formFields.trailer,
      keyword: "",
    };
  },
  mounted() {
    this.fetchApi();
    this.loadData();
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
        const res = await GetAllTrailers();
        const trailers = await Promise.all(
          res.data.map(async (item) => {
            const title = await this.getFilmName(item.filmId);
            return { ...item, filmTitle: title };
          })
        );
        this.trailerList = trailers.slice(0, 5);
        this.count = res.data[0].count;
      } catch (error) {}
    },
    async fetchApi() {
      try {
        await getFilmList().then((res) => (this.selectListData = res.data));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async getFilmName(id) {
      return await getFilmById(id).then((res) => res.data.title);
    },
    async createNewTrailer(form_data) {
      var formData = new FormData();
      formData.append("link", form_data.link);
      formData.append("filmId", form_data.filmId);
      await createNewTrailer(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.trailerList.push(JSON.parse(res.config.data));
        })
        .catch((error) => {
          console.error("Error:", error); // Log lỗi nếu có
        });
    },
    async deleteTrailer(id) {
      await deleteTrailer(id)
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
      const res = await GetCountTrailer();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchTrailer({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const trailers = await Promise.all(
          res.data.map(async (item) => {
            const title = await this.getFilmName(item.filmId);
            return { ...item, filmTitle: title };
          })
        );
        this.trailerList = trailers;
        this.count = trailers[0].count;
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
