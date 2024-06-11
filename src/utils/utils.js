import router from "@/router/index";
import { douLaiPaiRedirctUrl } from "@/config.js";

export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search
    .substr(1)
    .replace(new RegExp(/(amp;)/g), "")
    .match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
}

// 检查是否在微信中
export function checkWeixinBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  const isWeixin = ua.indexOf("micromessenger") != -1;
  return isWeixin;
}

// 该函数用来判断当前的页面 url 中是否包含 openid （正常微信公众号进入的话，url 中是会包含用户信息的，
// 如果没有，可能是微信扫码其他端的页面打开的，这时候需要手动调用微信的认证接口，但是这个时候默认的配置是最后重定向打开首页，
// 所以我们需要记录当前页面的 fullPath（包含参数），然后再首页中判断进行跳转 (Home.vue 中)）
export function checkPageNeedWXAuth() {
  if (checkWeixinBrowser()) {
    const { history: { current: { fullPath = "" } = {} } = {} } = router;
    if (window.location.href.indexOf("openid") == -1) {
      localStorage.setItem("currentPath", fullPath);
      window.location.replace(douLaiPaiRedirctUrl);
    }
  }
}

// 根据栏目详情获取真实的栏目id
export function getCategoryIdByInfo(info) {
  const { categoryType, linkContent,linkType, id } = info;
  if (categoryType === 1 && linkType == 0) {
    // 关联栏目
    return linkContent.split(",")[0];
  } else {
    return id;
  }
}
