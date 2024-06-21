<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý diễn viên </span>
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
} from "@/Services/FetchAPI";
export default {
  data() {
    return {
      roleList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      selectListData: [],
      formFields: formFields.role,
    };
  },
  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const res = await GetAllRoles();
        this.roleList = res.data;
      } catch (error) {
        console.error("Error fetching actors or films:", error);
      }
    },
    async createNewRole(form_data) {
      var formData = new FormData();
      formData.append("rolename", form_data.name);
      await createNewRole(formData)
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
    async updateRole(id, form_data) {
      var formData = new FormData();
      formData.append("rolename", form_data.name);

      await updateRole(id, formData)
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
    async deleteRole(id) {
      await deleteRole(id)
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
