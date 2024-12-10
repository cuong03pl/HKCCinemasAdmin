<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Room" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          All rooms
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Search for rooms" />
        <!-- End search -->
        <ButtonHandleCreate
          @handleCreate="createRoom"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
          title="New Room"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden shadow">
          <table
            class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600"
          >
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên phòng
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên rạp
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
            >
              <tr
                v-for="(item, index) in roomList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.roomName }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.cinemas?.name }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteRoom"
                    @handleUpdate="updateRoom"
                    :data="item"
                    :formFields="formFields"
                    :selectListData="selectListData"
                    title="Update Room"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Pagination
              :pageCount="countPage"
              @handlePagination="handlePagination"
            />
          </div>
        </div>
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
  GetCountRoom,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
export default {
  data() {
    return {
      roomList: [],
      toggleModal: false,
      toggleModalDelete: false,

      selectListData: [],
      formFields: formFields.room,
      cinemasName: "",
      count: 0,
      keyword: "",
    };
  },
  created() {
    this.getCinemas();
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
      await GetAllRooms().then((res) => {
        const rooms = res.data.map((item) => {
          return { ...item, cinemasId: item.cinemas.id };
        });
        this.roomList = rooms.slice(0, 5);
        this.count = res.data[0].count;
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
      const res = await GetCountRoom();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchRoom({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const rooms = await Promise.all(
          res.data.map(async (item) => {
            return { ...item, cinemasId: item?.cinemas?.id };
          })
        );
        this.roomList = rooms;
        this.count = rooms[0].count;
      } catch (error) {}
    },
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,
    Search,
    Pagination,
    Breadcrumb,
  },
};
</script>

<style></style>
