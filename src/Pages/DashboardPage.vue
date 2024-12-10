<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
    >
      <div
        v-for="(item, index) in card_item"
        :key="index"
        class="rounded-sm border border-stroke bg-white px-[30px] py-[24px] shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div
          class="flex w-[46px] h-[46px] items-center justify-center rounded-full bg-[#eff2f7]"
        >
          <component
            :is="item.icon.item"
            :height="item.icon.height"
            :width="item.icon.width"
            :fill="item.icon.fill"
          />
        </div>
        <div class="mt-4 flex items-center gap-2">
          <h4 class="text-[24px] font-bold text-black dark:text-white">
            {{ item.data }}
          </h4>
          <span class="text-sm text-[#525050]">{{ item.title }}</span>
        </div>
      </div>
    </div>

    <div class="my-6">
      <div class="font-medium text-[24px] mb-2">
        Top 5 phim được đặt nhiều nhất
      </div>
      <div
        class="flex justify-between font-medium py-[16px] px-3 gap-2 bg-white"
      >
        <span class="w-[35%]">Tên phim</span>
        <span class="w-[15%]">Thời gian phim</span>
        <span class="w-[20%]">Thời gian phát hành</span>
        <span class="w-[20%]">Thời gian kết thúc</span>
        <span class="w-[10%]">Số vé đã bán</span>
      </div>
      <div
        class="flex justify-around items-center gap-2 border-t border-t-[#0000002f] px-[16px] hover:bg-[#e5e5e5] py-[8px]"
        v-for="(item, index) in bestSales"
        :key="index"
      >
        <span class="w-[35%]">{{ item.title }}</span>
        <span class="w-[15%]">{{ item.duration }} phút</span>
        <span class="w-[20%]">{{ convertTime(item.releaseDate) }}</span>
        <span class="w-[20%]">{{
          item.endDate && convertTime(item.endDate)
        }}</span>
        <span class="w-[10%]">{{ item.soldCount }}</span>
      </div>
    </div>

    <div class="my-6">
      <div class="font-medium text-[24px] mb-2">
        Thống kê doanh thu theo tháng của năm {{ new Date().getFullYear() }}
      </div>
      <Chart />
    </div>
  </div>
</template>

<script>
import EyeIcon from "@/components/Icon/EyeIcon.vue";
import CartIcon from "@/components/Icon/CartIcon.vue";
import UserIcon from "@/components/Icon/UserIcon.vue";
import FilmIcon from "@/components/Icon/FilmIcon.vue";
import {
  GetCountCinemas,
  GetCountFilm,
  GetCountTicket,
  GetCountUser,
  GetTop5BestSales,
} from "@/Services/FetchAPI";
import { convertTimeSpan, convertTime } from "../../config/functions";
import Chart from "@/components/Chart/chart.vue";

export default {
  components: { Chart },
  data() {
    return {
      card_item: [],
      bestSales: [],
    };
  },
  async created() {
    await this.getCountFilm();
    await this.getCountCinemas();
    await this.getCountUser();
    await this.getCountTicket();
    await this.GetTop5BestSales();
  },
  computed: {},
  methods: {
    async getCountFilm() {
      const res = await GetCountFilm();
      this.card_item = [
        ...this.card_item,
        {
          title: "Phim",
          data: res.data,
          icon: {
            item: FilmIcon,
            height: 22,
            width: 22,
            fill: "#3C50E0",
          },
        },
      ];
    },
    async getCountCinemas() {
      const res = await GetCountCinemas();
      this.card_item = [
        ...this.card_item,
        {
          title: "Rạp chiếu",
          data: res.data,
          icon: {
            item: EyeIcon,
            height: 22,
            width: 22,
            fill: "#3C50E0",
          },
        },
      ];
    },

    async getCountUser() {
      const res = await GetCountUser();
      this.card_item = [
        ...this.card_item,
        {
          title: "Người dùng",
          data: res.data,
          icon: {
            item: UserIcon,
            height: 22,
            width: 22,
            fill: "#3C50E0",
          },
        },
      ];
    },

    async getCountTicket() {
      const res = await GetCountTicket();
      this.card_item = [
        ...this.card_item,
        {
          title: "Vé được đặt",
          data: res.data,
          icon: {
            item: CartIcon,
            height: 22,
            width: 22,
            fill: "#3C50E0",
          },
        },
      ];
    },
    async GetTop5BestSales() {
      const res = await GetTop5BestSales();
      this.bestSales = res.data;
    },
    convertTime,
    convertTimeSpan,
  },
};
</script>

<style></style>
