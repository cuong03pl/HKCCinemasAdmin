<template>
    <div class="relative">
      <router-link
        ref="trigger"
        @click="toggleDropdown"
        class="flex items-center gap-4"
        to="#"
      >
        <span class="hidden text-right lg:block">
          <span class="block text-sm font-medium text-black dark:text-white">
            Thomas Anree
          </span>
          <span class="block text-xs">UX Designer</span>
        </span>
  
        <span class="h-12 w-12 rounded-full">
          <img src="https://free-demo.tailadmin.com/src/images/user/user-01.png" alt="User" />
        </span>
  
        <svg
          :class="{ 'rotate-180': dropdownOpen }"
          class="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </router-link>
  
      <!-- Dropdown Start -->
      <div
        ref="dropdown"
        @focus="openDropdown"
        @blur="closeDropdown"
        :class="{ 'block': dropdownOpen, 'hidden': !dropdownOpen }"
        class="absolute right-0 mt-4 flex w-[248px] flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <ul class="flex flex-col gap-[4px] border-b border-stroke px-[12px] py-[6px] dark:border-strokedark ">
          <li v-for="(item, index) in menu_item" :key="index" class="py-[8px] px-1 hover:bg-[#f0ebeb] rounded-md" :class="{'border-t border-solid border-[#e2e8f4]': item.serepate}">
              <router-link :to="item.to" class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                <component :is="item.icon.item" :height=item.icon.height :width=item.icon.width :fill="item.icon.fill" />
                {{ item.title }}
              </router-link>
            </li>
        </ul>
        
      </div>
      <!-- Dropdown End -->
    </div>
  </template>
  
  <script>
import LogoutIcon from './Icon/LogoutIcon.vue';
import SettingIcon from './Icon/SettingIcon.vue';
import UserIcon from './Icon/UserIcon.vue';

  export default {
    data() {
      return {
        dropdownOpen: false,
        menu_item: [
          {
            title: "My Profile",
            to: "/myprofile",
            icon: {
                  item: UserIcon,
                  height: 18,
                  width: 18,
                  fill: "#000"
                }  ,
          },
          {
            title: "Setting",
            to: "/setting",
            icon: {
                  item: SettingIcon,
                  height: 18,
                  width: 18,
                  fill: "#000"
                } 
          },
          {
            title: "Log Out",
            to: "/logout",
            serepate: true,
            icon: {
                  item: LogoutIcon,
                  height: 18,
                  width: 18,
                  fill: "#000"
                } 
          },
        ]
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      openDropdown() {
        this.dropdownOpen = true;
      },
      closeDropdown() {
        this.dropdownOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  