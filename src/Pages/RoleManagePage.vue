<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý vai trò </span>
      <ButtonHandleCreate
        @handleCreate="createNewRole"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[40%]">Tên role</span>
        <span class="w-[40%]">NormalizedName </span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in roleList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[40%]">{{ item.name }}</span>
        <span class="w-[40%]">{{ item.normalizedName }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteRole"
            @handleUpdate="updateRole"
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
  GetAllRoles,
  createNewActor,
  deleteActor,
  getAllActors,
  getFilmList,
  updateActor,
  createNewRole,
  updateRole,
  deleteRole,
  GetCountRole,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      roleList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,

      selectListData: [],
      formFields: formFields.role,
      keyword: "",
    };
  },
  created() {
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
        const res = await GetAllRoles();
        this.count = res.data[0].count;
        this.roleList = res.data.slice(0, 5);
      } catch (error) {}
    },
    async createNewRole(form_data) {
      var formData = new FormData();
      formData.append("rolename", form_data.name);
      await createNewRole(formData)
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
    async updateRole(id, form_data) {
      var formData = new FormData();
      formData.append("rolename", form_data.name);

      await updateRole(id, formData)
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
    async deleteRole(id) {
      await deleteRole(id)
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
      const res = await GetCountRole();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await GetAllRoles({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        this.roles = res.data;
      } catch (error) {}
    },

    convertTime,
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,
    Pagination,
  },
};
</script>

<style></style>
