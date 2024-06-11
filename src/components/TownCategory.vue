<template>
  <div class="town-category">
    <div class="title">{{ category.title }}</div>
    <div class="list">
      <img
        v-for="item in list"
        :key="item.id"
        :src="item.poster"
        alt=""
        @click.stop="handleClick(item)"
      />
    </div>
  </div>
</template>

<script>
import { getCategoryList } from "@/service/api";
import { getCategoryIdByInfo } from "@/utils/utils";

export default {
  props: {
    category: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },

  data() {
    return {
      list: [],
    };
  },

  mounted() {
    this.getCategoryList();
  },

  methods: {
    async getCategoryList() {
      const params = {
        categoryId: getCategoryIdByInfo(this.category),
        pageNo: 1,
        pageSize: -1,
      };
      const response = await getCategoryList(params);
      const { data: { data: { list = [] } = {} } = {} } = response;
      this.list = list.map((v) => {
        return {
          ...v,
          poster: `/res${v.poster}`,
        };
      });
    },

    handleClick(item) {
      const {
        categoryType,
        linkType,
        linkContent,
        title,
        renderingStyler,
        ext1
      } = item;
      if (ext1) {
        this.$router.push(ext1)
        return;
      }
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

    handleTownClick(item) {
      const { id, title } = item;
      this.$router.push({
        path: "/town",
        query: { title, id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.town-category {
  padding: 0 16px;

  .title {
    height: 64px;
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    line-height: 64px;
  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 8px;

    img {
      width: 164px;
      height: 80px;
      margin-bottom: 16px;
    }
  }

  .town-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;

    img {
      width: 78px;
      height: 80px;
      margin-right: 10px;
      margin-bottom: 10px;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
