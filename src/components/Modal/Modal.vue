<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="bg-[#36445c4d] fixed h-full w-full top-0 right-0 left-0 flex justify-center items-center modal-overlay"
    >
      <div
        class="bg-white p-6 rounded-xl w-[900px] overflow-scroll max-h-[600px] modal-content"
      >
        <div class="flex justify-between items-center">
          <div class="font-bold text-[24px]">THÔNG TIN NHÂN VIÊN</div>
          <CloseIcon
            :height="24"
            :width="24"
            class="cursor-pointer"
            @click="$emit('handleClose', false)"
          />
        </div>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div
            v-for="(item, index) in formFields"
            :key="index"
            class="w-[100%]"
          >
            <label v-if="item.title" for=""
              >{{ item.title }} (<span class="text-[red]">*</span>)</label
            >
            <select
              multiple
              v-if="item.isSelect"
              v-model="FormData[item.id]"
              :options="selectListData"
              class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
            >
              <option
                v-for="(item, index) in selectListData"
                :key="index"
                :value="item.id"
              >
                {{ item.name || item.title }}
              </option>
            </select>
            <select
              v-if="item.isSelectnotMuti && item.isChange"
              v-model="FormData[item.id]"
              @change="handleChange"
              class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
            >
              <option
                v-for="(item, index) in selectListData[item.id] ||
                selectListData"
                :key="index"
                :value="item.id"
              >
                {{ item.name || item.title || item.date }}
              </option>
            </select>
            <select
              v-if="item.isSelectnotMuti && !item.isChange"
              v-model="FormData[item.id]"
              class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
            >
              <option
                v-for="(item, index) in selectListData[item.id] ||
                selectListData"
                :key="index"
                :value="item.id"
              >
                {{
                  item.name ||
                  item.title ||
                  (item.date ? convertTime(item.date) : "") ||
                  `${item.cinemas.name} - ${item.film.title} - từ ${item.startTime} đến ${item.endTime}`
                }}
              </option>
            </select>
            <input
              v-model="FormData[item.id]"
              type="date"
              v-if="item.isDate"
              class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
            />
            <input
              v-model="FormData[item.id]"
              type="time"
              v-if="item.isTime"
              class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
            />

            <div v-if="item.isFile" class="flex pt-2 items-center">
              <div class="flex relative image_upload">
                <label
                  class="top-0 absolute h-[100px] w-[100px] bg-[#27262696] text-white opacity-0 overplay_image flex items-center justify-center"
                  :for="`${item.id}`"
                  >Tải ảnh lên</label
                >
                <img
                  class="w-[100px] h-[100px] object-cover"
                  @error="handleFallBack"
                  :src="
                    item.id === 'background'
                      ? background ||
                        `https://localhost:7253${FormData[item.id]}`
                      : image || `https://localhost:7253${FormData[item.id]}`
                  "
                  alt=""
                />
                <input
                  :id="`${item.id}`"
                  @change="handleFileChange"
                  type="file"
                  class="hidden border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
                />
              </div>
            </div>
            <input
              v-if="item.isText"
              v-model="FormData[item.id]"
              class="block border-[2px] mt-1 focus:border-[green] rounded-md outline-none w-[100%] text-[16px] border-[#ccc] px-4 py-2"
              :placeholder="item.placeholder"
            />
          </div>
        </div>

        <div class="flex justify-end mt-3 gap-3">
          <button
            @click="$emit('handleClose', false)"
            class="w-[100px] px-10 py-2 hover:bg-[#ccc] rounded-md flex justify-center"
          >
            Đóng
          </button>
          <button
            @click="handleSubmit"
            class="bg-[#019160] hover:bg-[#2fbe8e] w-[100px] text-white rounded-md flex justify-center items-center"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import axios from "axios";
import CloseIcon from "../Icon/CloseIcon.vue";
import convertTime from "../../../config/functions";
export default {
  components: { CloseIcon, CloseIcon },
  props: {
    isOpen: Boolean,
    formFields: Array,
    data: Object,
    isCreate: Boolean,
    selectListData: Array,
  },
  data() {
    return {
      open: this.isOpen,
      FormData: this.isCreate ? this.initFormCreate() : this.initFormUpdate(),
      username: "",
      selectData: [],
      selectList: [],
      image: null,
      background: null,
    };
  },
  watch: {
    selectListData(newG, oldG) {
      this.selectList = newG;
      console.log(this.selectListData);
    },
  },
  methods: {
    initFormUpdate() {
      const init = {};
      this.formFields.forEach((field) => {
        init[field.id] = this.data[field.id]; // tạo ra 1 abcd: ""
      });
      return init;
    },
    initFormCreate() {
      const init = {};
      this.formFields.forEach((field) => {
        init[field.id] = ""; // tạo ra 1 abcd: ""
      });
      return init;
    },
    handleSubmit() {
      this.isCreate
        ? this.$emit("handleCreate", this.FormData)
        : this.$emit("handleUpdate", this.data.id, this.FormData);

      // this.$emit('handleClose', false);
    },
    handleFileChange(event) {
      var file = event.target.files[0];
      var id = event.target.id;
      this.FormData[id] = file;
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        if (id == "background") {
          this.background = objectUrl;
        } else {
          this.image = objectUrl;
        }
      }
    },
    handleChange(e) {
      this.$emit("handleChange", e.target);
    },
    handleFallBack() {
      this.image =
        "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg";
      this.background =
        "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg";
    },
    convertTime,
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.image_upload:hover .overplay_image {
  opacity: 1;
}
.modal-overlay {
  transition: all 0.3s ease; /* Hiệu ứng fade */
}
.modal-content {
  transition: all 0.3s ease;
}
</style>
