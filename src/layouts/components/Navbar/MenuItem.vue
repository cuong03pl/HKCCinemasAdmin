<template>
  <li>
    <router-link
      exact-active-class="active"
      :to="menu_item.to"
      class="hover:bg-[#333a48] rounded-[8px]"
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
      <component
        :is="menu_item.icon.item"
        :height="menu_item.icon.height"
        :width="menu_item.icon.width"
        :fill="menu_item.icon.fill"
      />
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
