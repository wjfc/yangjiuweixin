<template>
  <div
    class="common-back"
    :style="{ background: '#fff' }"
  >
    <van-sticky>
      <van-nav-bar @click-left="handelClickLeft">
        <template #left>
          <van-icon
            name="arrow-left"
            size="20"
            :color="color"
            v-if="!($attrs.show == 'icon')"
          />
        </template>
        <template #title>
          <span :style="{ color: color }">{{ $attrs.title }}</span>
        </template>
        <template #right>
          <slot></slot>
        </template>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, NavBar, Sticky } from "vant";

Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Sticky);

export default {
  computed: {
    color() {
      // 默认色为#000，设置theme为light则为白色
      return this.$attrs.theme === "light" ? "#fff" : "#000";
    },
  },

  methods: {
    handelClickLeft() {
      const clickLeft = this.$listeners["click-left"];
      if (clickLeft) {
        clickLeft();
      } else {
        this.$router.back();
      }
    },
  },

  mounted() {},
};
</script>

<style lang="less" scoped>
.common-back {
  text-align: center;
  font-size: 18px;
  text-align: center;

  /deep/ .van-nav-bar {

    .van-nav-bar__content {
      height: 44px;
    }

    &::after,
    &::before {
      border: none !important;
    }
  }

  .back-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
