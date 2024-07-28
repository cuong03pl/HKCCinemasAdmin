<template>
  <div>
    <div>
      <div>
        <span class="text-[30px] font-bold"> Quản lý diễn viên </span>
      </div>
      <div class="flex justify-between items-center">
        <ButtonHandleCreate
          @handleCreate="createNewActor"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
        <Search @handleSubmit="search" placeholder="Nhập tên diễn viên" />
      </div>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[15%]">Ảnh diễn viên</span>
        <span class="w-[30%]">Tên diễn viên</span>
        <span class="w-[35%]"></span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in actorList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <div class="w-[15%] flex items-center justify-center">
          <img
            class="w-full h-full"
            :src="`https://localhost:7253/${item.image}`"
            alt=""
          />
        </div>
        <span class="w-[30%]">{{ item.name }}</span>
        <span class="w-[35%]">{{}}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteActor"
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
import { convertTime } from "../../config/functions";
import { formFields } from "../../config/formFields";
import {
  GetAllFilmByActorId,
  createNewActor,
  deleteActor,
  getAllActors,
  getFilmList,
  updateActor,
  GetCountActor,
  SearchActor,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import { paginationConfig } from "../../config/paginationConfig";
export default {
  data() {
    return {
      actorList: [],
      toggleModal: false,
      toggleModalDelete: false,
      keyword: "",
      selectListData: [],
      formFields: formFields.actor,
      count: 0,
    };
  },
  created() {
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
        const res = await getAllActors();
        const actors = await Promise.all(
          res.data.map(async (item) => {
            const films = await GetAllFilmByActorId(item.id);
            return { ...item, filmIds: films.data };
          })
        );
        this.actorList = actors.slice(0, 5);
        this.count = actors[0].count;
      } catch (error) {}
    },
    async fetchApi() {
      try {
        await getFilmList().then(
          (res) => (this.selectListData = JSON.parse(JSON.stringify(res.data)))
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async createNewActor(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("formFile", form_data.image);
      if (form_data.filmIds) {
        form_data.filmIds?.forEach((item) => {
          formData.append("filmIds[]", item);
        });
      }
      await createNewActor(formData)
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
    async updateActor(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("formFile", form_data.image);
      if (form_data.filmIds) {
        form_data.filmIds?.forEach((item) => {
          formData.append("filmIds[]", item);
        });
      }
      await updateActor(id, formData)
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
    async deleteActor(id) {
      await deleteActor(id)
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
    async getCount() {
      const res = await GetCountActor();
      this.count = res.data;
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
    async handlePagination(page) {
      try {
        const res = await SearchActor({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const actors = await Promise.all(
          res.data.map(async (item) => {
            const films = await GetAllFilmByActorId(item.id);
            return { ...item, filmIds: films.data };
          })
        );
        this.actorList = actors;
        this.count = actors[0].count;
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
  },
};
</script>

<style></style>
