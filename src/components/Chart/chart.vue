<template>
  <Bar
    id="my-chart-id"
    aria-label=""
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { GetTotalMoneyWithMonth } from "@/Services/FetchAPI";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{ data: [] }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  mounted() {
    this.getTotalMoney();
  },
  methods: {
    async getTotalMoney() {
      const res = await GetTotalMoneyWithMonth();
      console.log(res);
      this.chartData = {
        labels: res.data?.map((item) => `Tháng ${item.month}`),
        datasets: [
          {
            label: "Tổng doanh thu (VNĐ)",
            data: res.data?.map((item) => item.total),
            backgroundColor: "#f87979",
          },
        ],
      };
    },
  },
};
</script>
