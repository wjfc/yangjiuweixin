<template>
  <div class="village-home">
    <CommonBack :title="categoryInfo.alias"> </CommonBack>
    <div class="swiper-box" v-if="banners.length > 0">
      <!-- <swiper class="my-swipe" ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banners" :key="item.id">
          <img :src="item.poster" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper> -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banners" :key="item.id"
          ><img :src="item.poster"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="news">
      <img src="@/assets/images/home_jhtt_town2x.png" alt="" />
      <div class="swiper-news">
        <van-swipe autoplay="3000" vertical :show-indicators="false">
          <van-swipe-item v-for="item in newsList" :key="item.id">
            <p class="van-ellipsis">
              {{ item.title }}
            </p>
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-icon
        @click="handleMoreClick"
        name="arrow"
        color="#000"
        size="20px"
      />
    </div>
    <CategoryOne
      v-if="categoryOneList.length > 0"
      :list="categoryOneList"
    ></CategoryOne>
    <CategoryTwo
      v-if="categoryTwoList.length > 0"
      :list="categoryTwoList"
    ></CategoryTwo>

    <TownCategory
      v-for="item in resetCategoryList"
      :key="item.id"
      :category="item"
    ></TownCategory>
  </div>
</template>

<script>
import Vue from "vue";
import { List, PullRefresh, Swipe, SwipeItem } from "vant";
import CommonBack from "@/components/CommonBack";
import CategoryOne from "@/components/CategoryOne";
import CategoryTwo from "@/components/CategoryTwo";
import TownCategory from "@/components/TownCategory";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import {
  getCategoryListForMobile,
  getContentList,
  getCategoryInfo,
  catgoryLog,
} from "@/service/api";
import "swiper/css/swiper.min.css";
import { getCategoryIdByInfo,  } from "@/utils/utils";

Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },

  components: {
    Swiper,
    SwiperSlide,
    CommonBack,
    CategoryOne,
    CategoryTwo,
    TownCategory,
  },

  directives: {
    swiper: directive,
  },

  data() {
    return {
      categoryId: "",
      swiperOptions: {
        initialSlide: 0,
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      categoryInfo: {
        title: "",
      },
      townCategoryList: [],
      categoryOneList: [],
      categoryTwoList: [],
      resetCategoryList: [],
      banners: [],
      newsList: [],
    };
  },

  mounted() {
    const { id } = this.$route.query;
    this.categoryId = id || window.categoryId;
    this.getCategoryInfo();
  },

  methods: {
    async getCategoryInfo() {
      var params = {
        code: "categoryDetail",
        dataSourceParamList: [
          {
            key: "id",
            value: this.categoryId,
          },
        ],
      };
      const res = await getCategoryInfo(params);
      const { data: { errorCode, data: { list = [] } = {} } = {} } = res;
      if (errorCode === 0) {
        this.categoryInfo = list[0];
        document.title = this.categoryInfo.description;
        catgoryLog({
          categoryId: this.categoryId,
          categoryName: this.categoryInfo.title,
        });
      }
      this.getTownCategoryList();
    },

    async getTownCategoryList() {
      const params = {
        categoryId: this.categoryId,
        pageNo: 1,
        pageSize: 100,
        sorted: 1,
      };
      const response = await getCategoryListForMobile(params);
      const { data: { data: { list = [] } = {} } = {} } = response;
      this.townCategoryList = list;
      if (list.length >= 4) {
        this.getCategoryOneList(getCategoryIdByInfo(list[2]));
        this.getCategoryTwoList(getCategoryIdByInfo(list[3]));
        this.resetCategoryList = list.slice(4);
        this.initNews();
        this.getBanners();
      }
    },

    async initNews() {
      const category = this.townCategoryList[1];
      const params = {
        categoryId: getCategoryIdByInfo(category),
      };
      const response = await getContentList(params);
      const { data: { data: { list = [] } = {} } = {} } = response;
      if (list.length > 0) {
        this.newsList = list;
      }
    },

    async getCategoryOneList(categoryId) {
      const params = {
        categoryId,
        sorted: 1,
      };
      const response = await getCategoryListForMobile(params);
      const { data: { data: { list = [] } = {} } = {} } = response;
      this.categoryOneList = list.map((v) => {
        return {
          ...v,
          poster: `/res/${v.poster}`,
        };
      });
    },

    async getCategoryTwoList(categoryId) {
      const params = {
        categoryId,
        sorted: 1,
      };
      const response = await getCategoryListForMobile(params);
      const { data: { data: { list = [] } = {} } = {} } = response;
      this.categoryTwoList = list.map((v) => {
        return {
          ...v,
          poster: `/res/${v.poster}`,
        };
      });
    },

    async getBanners() {
      let categoryId = getCategoryIdByInfo(this.townCategoryList[0]);
      const params = {
        categoryId,
      };
      const response = await getContentList(params);
      const { data: { data: { list = [] } = {} } = {} } = response;
      this.banners = list.map((v) => {
        return {
          poster: `/res${v.poster1}`,
          ...v,
        };
      });
    },

    handleMoreClick() {
      const { title } = this.townCategoryList[1];
      let categoryId = getCategoryIdByInfo(this.townCategoryList[1]);
      this.$router.push({
        path: `/commonSubPage/${title}/${categoryId}`,
      });
    },

    handleItemClick(item) {
      const { linkType, linkContent, id } = item;
      if (linkType === 2) {
        window.location.href = linkContent;
      } else {
        this.$router.push({
          path: "/detail",
          query: {
            id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.village-home {
  min-height: 100vh;
  background: #fff;
}

/deep/ .swiper-box {
  padding: 16px;
  height: 182px;

  .my-swipe {
    height: 100%;
    .swiper-wrapper {
    }

    .swiper-slide {
      border-radius: 8px;
      height: 144px !important;
    }

    .swiper-slide-active {
    }

    .swiper-pagination {
      bottom: 0;

      .swiper-pagination-bullet {
        margin: 0 4px;
        width: 12px;
        height: 3px;
        background: #ccc;
        border-radius: 0;
      }

      .swiper-pagination-bullet-active {
        width: 20px;
        height: 3px;
        background: #ee0a24;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
}

.news {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 39px;

  img {
    margin-right: 12px;
    width: 70px;
    height: 25px;
  }

  /deep/ .swiper-news {
    width: 230px;
    margin-right: 12px;

    .van-swipe {
      height: 25px;
      line-height: 25px;

      .van-swipe-item {
        height: 100%;

        p {
          height: 100%;
        }
      }
    }
  }
}
</style>
