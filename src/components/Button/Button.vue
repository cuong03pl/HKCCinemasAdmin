<template>
  <component :is="tag" :to="to" :class="classes">
    <span v-if="leftIcon">
      <component :is="leftIcon.item" :class="leftIcon.class"></component>
    </span>
    <span class="text-center">{{ title }}</span>
  </component>
</template>

<script>
export default {
  props: {
    to: String,
    title: String,
    loginBtn: Boolean,
    watchBtn: Boolean,
    favouriteBtn: Boolean,
    menuBtn: Boolean,
    leftIcon: { type: [Object, Array], default: null },
  },

  computed: {
    classes() {
      return {
        loginBtn: this.loginBtn,
        watchBtn: this.watchBtn,
        favouriteBtn: this.favouriteBtn,
        menuBtn: this.menuBtn,
      };
    },
    tag() {
      if (this.to) return "router-link";
      else return "button";
    },
  },
};
</script>

<style>
.loginBtn {
  background-color: #fe2c55;
  color: #fff;
  font-weight: 700;
  padding: 6px 8px;
  border-radius: 4px;
  transition: all linear 0.3s;
}

.watchBtn {
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  background: #dd003f;
  text-transform: uppercase;
  font-size: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.watchBtn span {
  text-align: center;
}

.favouriteBtn {
  padding: 8px;
  width: 120px;
  background: #8746f9dc;
  font-size: 16px;
  color: white;
  display: flex;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  border-radius: 8px;
}
.favouriteBtn span {
  margin-left: 6px;
}
.favouriteBtn:hover {
  opacity: 0.8;
  transition: all linear 0.3s;
}
.menuBtn {
  padding: 8px;
  font-size: 16px;
  color: black;
  display: flex;
  gap: 4px;
  font-weight: 600;
  align-items: center;
}
</style>
