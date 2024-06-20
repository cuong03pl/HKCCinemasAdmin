<template>
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
      <div class="mt-4 flex items-end justify-between">
        <div>
          <h4 class="text-[24px] font-bold text-black dark:text-white">
            {{ item.data }}
          </h4>
          <span class="text-sm text-[#525050]">{{ item.title }}</span>
        </div>
      </div>
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
  GetCountUser,
} from "@/Services/FetchAPI";

export default {
  data() {
    return {
      card_item: [],
    };
  },
  mounted() {
    this.getCountFilm();
    this.getCountCinemas();
    this.getCountUser();
  },
  methods: {
    async getCountFilm() {
      const res = await GetCountFilm();
      console.log(res);
      this.card_item = [
        ...this.card_item,
        {
          title: "Phim",
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
    async getCountCinemas() {
      const res = await GetCountCinemas();
      console.log(res);
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
      console.log(res);
      this.card_item = [
        ...this.card_item,
        {
          title: "Người dùng",
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
  },
};
</script>

<style></style>
