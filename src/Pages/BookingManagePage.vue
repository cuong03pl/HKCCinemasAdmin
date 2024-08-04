<template>
  <div>
    <div>
      <div>
        <span class="text-[30px] font-bold"> Quản lý đặt vé </span>
      </div>
      <div class="flex justify-between items-center">
        <Search @handleSubmit="search" placeholder="Nhập tên người dùng" />
      </div>
    </div>
    <div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[10%]">Tên người dùng</span>
        <span class="w-[20%]">Tên phim</span>
        <span class="w-[10%]">Giá vé</span>
        <span class="w-[20%]">Rạp chiếu</span>
        <span class="w-[10%]">Chỗ ngồi</span>
        <span class="w-[10%]">Phòng chiếu</span>
        <span class="w-[10%]">Ngày chiếu</span>
        <span class="w-[10%]">Thời gian bắt đầu</span>
        <span class="w-[10%]">Thời gian kết thúc</span>

        <!-- <span class="w-[20%]">Chức năng </span> -->
      </div>
      <div
        v-for="(item, index) in bookingList"
        :key="index"
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
      >
        <span class="w-[10%]">{{ item?.user?.userName }}</span>
        <span class="w-[20%]">{{ item?.schedule?.film?.title }}</span>
        <span class="w-[10%]">{{ item?.ticket?.price }}</span>
        <span class="w-[20%]">{{ item?.schedule?.cinemas?.name }}</span>
        <span class="w-[10%]">{{ item?.seat?.name }}</span>
        <span class="w-[10%]">{{ item?.schedule?.room?.roomName }}</span>
        <span class="w-[10%]">{{
          convertTime(item?.schedule?.showDate?.date)
        }}</span>
        <span class="w-[10%]">{{ item?.schedule?.startTime }}</span>
        <span class="w-[10%]">{{ item?.schedule?.endTime }}</span>
        <!-- <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteActor"
            @handleUpdate="updateActor"
            :data="item"
            :formFields="formFields"
            :selectListData="selectListData"
          />
        </span> -->
      </div>
    </div>
    <div>
      <Pagination :pageCount="countPage" @handlePagination="handlePagination" />
    </div>
  </div>
</template>
<script>
import { GetAllBookingDetails } from "@/Services/FetchAPI";
import { convertTime } from "../../config/functions";
import Search from "@/components/Search/Search.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import { paginationConfig } from "../../config/paginationConfig";

export default {
  components: { Search, Pagination },
  data() {
    return {
      bookingList: [],
      count: 0,
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    countPage() {
      return this.count / paginationConfig.perPage;
    },
  },
  methods: {
    async loadData() {
      try {
        const res = await GetAllBookingDetails();
        this.bookingList = res.data.slice(0, 5);
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
      try {
        const res = await GetAllBookingDetails({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
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
