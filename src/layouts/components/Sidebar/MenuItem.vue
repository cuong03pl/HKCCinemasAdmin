<template>
  <li>
    <router-link
      exact-active-class="active"
      :to="menu_item.to"
      class="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      :class="{
        group: true,
        relative: true,
        flex: true,
        'items-center': true,
        'gap-2.5': true,
        'rounded-sm': true,
        'py-2': true,
        'px-4': true,
        'font-medium': true,
        'text-bodydark1': true,
        'duration-300': true,
        'ease-in-out': true,
        'hover:bg-graydark': true,
        'dark:hover:bg-meta-4': isSelected,
      }"
    >
      <span class="text-white">
        {{ menu_item.title }}
      </span>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    menu_item: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>
.active span {
  color: #0d6efd;
}
.active svg {
  fill: #0d6efd;
}
</style>
