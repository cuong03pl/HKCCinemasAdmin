<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Quản lý đặt vé" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          Quản lý đặt vé
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
  <div v-if="bookingList.length > 0" class="flex flex-col">
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
                  Tên người dùng
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
                  Giá vé
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Rạp chiếu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Chỗ ngồi
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Phòng chiếu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Ngày chiếu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Thời gian bắt đầu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Thời gian kết thúc
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
            >
              <tr
                v-for="(item, index) in bookingList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.user?.userName }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.schedule?.film?.title }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.ticket?.price }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.schedule?.cinemas?.name }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.seat?.name }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.schedule?.room?.roomName }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ convertTime(item?.schedule?.showDate?.date) }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.schedule?.startTime }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.schedule?.endTime }}
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
  <EmptyList v-if="bookingList.length <= 0" />
</template>
<script>
import { GetAllBookingDetails } from "@/Services/FetchAPI";
import { convertTime } from "../../config/functions";
import Search from "@/components/Search/Search.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
import EmptyList from "@/components/EmptyList/EmptyList.vue";

export default {
  components: { Search, Pagination, Breadcrumb, EmptyList },
  data() {
    return {
      bookingList: [],
      count: 0,
      pageSize: 5,
      currentPage: 1,
    };
  },
  created() {
    this.loadData();
    this.currentPage = Number(this.$route.query.PageNumber) || 1;
  },
  computed: {
    countPage() {
      return Math.ceil(this.count / paginationConfig.perPage);
    },
  },
  methods: {
    async loadData() {
      try {
        const res = await GetAllBookingDetails();

        if (this.currentPage > this.countPage) {
          await this.handlePagination(this.countPage);
        }
        if (this.currentPage <= 0) {
          await this.handlePagination(1);
        }

        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.bookingList = res.data.slice(start, end);
        this.count = res.data[0].count;
      } catch (error) {}
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
      this.currentPage = page;
      this.$router.push({
        query: {
          ...this.$route.query,
          PageNumber: page,
        },
      });
      try {
        const res = await GetAllBookingDetails({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: this.pageSize,
            Keyword: this.keyword,
          },
        });
        this.bookingList = res.data;
        this.count = res.data[0].count;
      } catch (error) {}
    },
    convertTime,
  },
};
</script>

<style></style>
