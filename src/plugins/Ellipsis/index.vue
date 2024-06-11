<template>
  <div
    class="ellipsis"
    ref="ellipsis"
    :class="!more ? 'more' : 'less'"
    :id="ellipsisId"
  >
    <p
      class="ellipsis-content"
      ref="ellipsisInfo"
      :class="hasOverflow ? 'hasOverflow' : 'normal'"
    >
      {{ ellipsisProps.info }}
    </p>
    <div class="label" v-if="hasOverflow" @click.stop="changeStatus">
      {{ more | showtext(ellipsisProps.endHtml) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MyEllipsis",
  props: ["ellipsisProps"],
  data() {
    return {
      hasOverflow: false,
      more: false,
      ellipsisId: "ellipsis_" + String(Math.random()),
    };
  },
  mounted() {
    this.checkHeight();
  },
  methods: {
    checkHeight() {
      const { lineClamp, info } = this.ellipsisProps;
      console.log(info);
      let stNode = this.$refs.ellipsisInfo;
      let wrapNode = document.getElementById(this.ellipsisId);
      const lineHeight = this.getStyle(wrapNode, "line-height");
      let stNodeHeight = stNode.getBoundingClientRect().height;
      let maxHeight = parseFloat(lineHeight) * lineClamp;
      if (stNodeHeight - maxHeight > 0) {
        // 超过
        this.hasOverflow = true;
        this.more = true;
      }
    },
    changeStatus() {
      this.more = !this.more;
    },
    getStyle(element, att) {
      //特性侦测
      if (window.getComputedStyle) {
        //优先使用W3C规范
        return window.getComputedStyle(element)[att];
      } else {
        //针对IE9以下兼容
        return element.currentStyle[att];
      }
    },

    getTrueLength(str) {
      var realLength = 0,
        len = str.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    },
  },
  computed: {},
  filters: {
    showtext(flag, endHtml) {
      return flag ? endHtml[0] : endHtml[1];
    },
  },
};
</script>


<style lang="less">
.more.ellipsis {
  // padding-bottom: 24px;
  p {
    -webkit-line-clamp: unset !important;
  }
  .label {
    background: rgba(255, 255, 255, 0);
  }
}
.ellipsis {
  padding: 0 10px;
  position: relative;
  color: #131313;
  font-size: 15px;
  line-height: 23px;
  background: #fff;
  p {
  }
  p.hasOverflow {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .label {
    // display: none;
    position: absolute;
    right: 0px;
    bottom: 0px;
    padding: 4px 0;
    padding-right: 5px;
    padding-left: 45px;
    line-height: normal;
    color: #027aff;
    height: 24px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    );
  }
}
</style>