// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("postcss-px-to-viewport")({
      viewportWidth: 375, // 视窗宽度
      viewportHeight: 667, // 视窗高度
      unitPrecision: 6, // 保留小数
      viewportUnit: "vw", // 选择单位
      selectorBlackList: [], // 不转换的类
      minPixelValue: 1, // 最小单位
      mediaQuery: false, // 排除媒体查询
      landscapeUnit: "vh", // 横屏时单位
      fontViewportUnit: "vw", // 字体使用的单位
    }),
  ],
};
