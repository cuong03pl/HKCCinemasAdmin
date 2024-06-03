<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý ngày chiếu </span>
      <ButtonHandleCreate
        @handleCreate="createShowDate"
        :selectListData="selectListData"
        :class="'mt-4 mb-4'"
        :formFields="formFields"
      />
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[50%]">Ngày chiếu</span>
        <span class="w-[30%]">Rạp</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in showdateList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[50%]">{{ convertTime(item.date) }}</span>
        <span class="w-[30%]">{{ item.cinemasName }}</span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteShowDate"
            @handleUpdate="updateShowDate"
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
import convertTime from "../../config/functions";
import { formFields } from "../../config/formFields";
export default {
  data() {
    return {
      showdateList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      selectListData: [],
      formFields: formFields.showDate,
    };
  },
  created() {
    this.loadData();
    this.initializeData();
  },

  methods: {
    async initializeData() {
      this.getCinemas();
      await this.loadData();
      console.log(this.scheduleList);
      this.showdateList.forEach(async (item) => {
        item.cinemasName = await this.getCinemasName(item.cinemasId);
      });
    },
    async loadData() {
      try {
        const res = await axios.get("https://localhost:7253/api/ShowDates");
        this.showdateList = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
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

    async getCinemasName(id) {
      try {
        const res = await axios.get(`https://localhost:7253/api/Cinemas/${id}`);

        return res.data.name;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
        return null;
      }
    },

    createShowDate(form_data) {
      var formData = new FormData();
      formData.append("date", form_data.date);
      formData.append("cinemasId", form_data.cinemasId);

      axios
        .post("https://localhost:7253/api/ShowDates", formData, {
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
    updateShowDate(id, form_data) {
      var formData = new FormData();
      formData.append("date", form_data.date);
      formData.append("cinemasId", form_data.cinemasId);

      axios
        .put(`https://localhost:7253/api/ShowDates/${id}`, formData, {
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
    deleteShowDate(id) {
      axios
        .delete(`https://localhost:7253/api/ShowDates/${id}`)
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
