<template>
  <div>
    <div class="category-two">
      <div
        class="category-item"
        v-for="item in list"
        :key="item.id"
        @click="handleClick(item)"
      >
        <img :src="item.poster" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryIdByInfo } from "@/utils/utils";
export default {
  props: ["list"],

  mounted() {
    console.log(this.list);
  },

  methods: {
    handleClick(item) {
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
          path: `/commonSubPage/${title}/${id}`,
        });
      } else if (linkType == 2) {
        window.location.href = linkContent;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.category-two {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  padding-left: 16px;

  .category-item {
    margin-right: 11px;
    margin-bottom: 12px;
    width: 107px;
    height: 66px;

    img {
      display: block;
      height: 100%;
    }
  }
}
</style>
