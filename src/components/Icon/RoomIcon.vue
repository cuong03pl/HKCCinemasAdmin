<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
   
    viewBox="0 0 64 64"
    stroke-width="3"
    stroke="#000000"
    :width="width"
    :height="height"
    :fill="fill"
  >
    <rect x="7.07" y="15.98" width="49.87" height="27.41" rx="5" />
    <circle cx="42.64" cy="29.81" r="8.04" />
    <path d="M39.7,29.65a3.55,3.55,0,0,1,3.56-3.55" stroke-linecap="round" />
    <line x1="13.5" y1="23.57" x2="28.38" y2="23.57" stroke-linecap="round" />
    <line x1="13.5" y1="29.36" x2="28.38" y2="29.36" stroke-linecap="round" />
    <line x1="13.5" y1="35.14" x2="28.38" y2="35.14" stroke-linecap="round" />
    <path
      d="M49.18,43.4V47a1,1,0,0,1-1,1H41.91a1,1,0,0,1-1-1V43.4"
      stroke-linecap="round"
    />
    <path
      d="M22.53,43.4V47a1,1,0,0,1-1,1H15.26a1,1,0,0,1-1-1V43.4"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    fill: String,
  },
};
</script>

<style></style>
