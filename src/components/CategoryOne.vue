<template>
  <div class="category-one">
    <div v-if="list.length == 4" class="category-4">
      <div class="left">
        <img :src="list[0].poster" alt="" @click="handleClick(0)" />
      </div>
      <div class="right">
        <div class="right-top">
          <img :src="list[1].poster" alt="" @click="handleClick(1)" />
        </div>
        <div class="right-bottom">
          <img :src="list[2].poster" alt="" @click="handleClick(2)" />
          <img :src="list[3].poster" alt="" @click="handleClick(3)" />
        </div>
      </div>
    </div>
    <div v-if="list.length == 5" class="category-5">
      <img :src="list[0].poster" alt="" @click="handleClick(0)" />
      <img :src="list[1].poster" alt="" @click="handleClick(1)" />
      <img :src="list[2].poster" alt="" @click="handleClick(2)" />
      <img :src="list[3].poster" alt="" @click="handleClick(3)" />
      <img :src="list[4].poster" alt="" @click="handleClick(4)" />
    </div>
  </div>
</template>

<script>
import { getCategoryIdByInfo } from "@/utils/utils";
export default {
  props: ["list"],

  computed: {
    clsName() {
      return `category-${this.list.length}`;
    },
  },

  mounted() {
    console.log(this.list);
  },

  methods: {
    handleClick(index) {
      let item = this.list[index];
      const {
        categoryType,
        linkType,
        linkContent,
        title,
        renderingStyler,
      } = item;
      if (renderingStyler === "building" || renderingStyler == "") {
        this.$toast("栏目升级中，敬请期待");
        return;
      }
      let id = getCategoryIdByInfo(item);
      if (categoryType == 0 || (categoryType == 1 && linkType == 0)) {
        this.$router.push({
          path: "/list",
          query: {
            id,
            renderingStyler,
            title,
          },
        });
      } else if (linkType == 2) {
        window.location.href = linkContent;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.category-one {
  margin-top: 9px;
  padding-left: 16px;
  padding-right: 16px;

  img {
    width: 100%;
    height: 100%;
  }

  .category-4 {
    display: flex;
    justify-content: space-between;
    .left {
      width: 129px;
      height: 116px;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 116px;
      .right-top {
        width: 206px;
        height: 68px;
      }
      .right-bottom {
        width: 206px;
        display: flex;
        justify-content: space-between;

        img {
          width: 99px;
          height: 40px;
        }
      }
    }
  }

  .category-5 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    img:nth-child(1),
    img:nth-child(2) {
      width: 164px;
      height: 44px;
    }
    img:nth-child(3),
    img:nth-child(4),
    img:nth-child(5) {
      margin-top: 8px;
      width: 104px;
      height: 62px;
    }
  }
}
</style>
