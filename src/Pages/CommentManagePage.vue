<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Quản lý bình luận" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          Quản lý bình luận
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Nhập tên người dùng" />
        <!-- End search -->
      </div>
    </div>
  </div>
  <div v-if="commentList.length > 0 && !isLoading" class="flex flex-col">
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
                  Người bình luận
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Nội dung
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên phim
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Thời gian
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
                v-for="(item, index) in commentList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.userName }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.content }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.filmTitle }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ convertTime(item?.time) }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteComment"
                    :onlyDelete="true"
                    :data="item"
                    :formFields="formFields"
                    :selectListData="selectListData"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Pagination
              :pageCount="countPage"
              @handlePagination="handlePagination"
              :pageSize="pageSize"
              :currentPage="currentPage"
              :count="count"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-if="isLoading" />
  <EmptyList v-if="commentList.length <= 0 && !isLoading" />
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
  GetCountComment,
  getFilmById,
  getUserById,
  SearchComment,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
import { comment } from "postcss";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
import EmptyList from "@/components/EmptyList/EmptyList.vue";
import Spinner from "@/components/Spinner/Spinner.vue";
export default {
  data() {
    return {
      commentList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,
      pageSize: 5,
      currentPage: 1,
      selectListData: [],
      formFields: formFields.actor,
      userName: "",
      filmName: "",
      keyword: "",
      isLoading: true,
    };
  },
  created() {
    this.loadData();
    this.getCount();
    this.currentPage = Number(this.$route.query.PageNumber) || 1;
  },
  computed: {
    countPage() {
      return Math.ceil(this.count / paginationConfig.perPage);
    },
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      const res = await GetAllComments();
      const comments = await Promise.all(
        res.data.map(async (item) => {
          const userName = await this.getUserName(item.userID);
          const filmName = await this.getFilmName(item.filmId);
          return { ...item, filmTitle: filmName, userName: userName };
        })
      );
      if (this.currentPage > this.countPage) {
        await this.handlePagination(this.countPage);
      }
      if (this.currentPage <= 0) {
        await this.handlePagination(1);
      }
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.commentList = comments.slice(start, end);
      this.count = res.data[0]?.count;
      this.isLoading = false;
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
        .then(async (res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          await this.loadData();
          if (this.commentList.length === 0 && this.currentPage > 1) {
            await this.handlePagination(this.currentPage - 1);
          }
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
      const res = await GetCountComment();
      this.count = res.data;
    },
    async handlePagination(page) {
      this.currentPage = page;
      try {
        this.$router.push({
          query: {
            ...this.$route.query,
            PageNumber: page,
          },
        });
        const res = await SearchComment({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: this.pageSize,
            Keyword: this.keyword,
          },
        });
        const comments = await Promise.all(
          res.data.map(async (item) => {
            const userName = await this.getUserName(item.userID);
            const filmName = await this.getFilmName(item.filmId);
            return { ...item, filmTitle: filmName, userName: userName };
          })
        );
        this.commentList = comments;
        this.count = comment[0].count;
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
    Breadcrumb,
    EmptyList,
    Spinner,
  },
};
</script>

<style></style>
