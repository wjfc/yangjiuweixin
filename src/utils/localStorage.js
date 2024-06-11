function getLocalStorage(item) {
  let type = Object.prototype.toString.call(item);
  if (type != "[object String]" || item === "") {
    console.error("getLocalStorage 你必须传一个非空字符串");
    return;
  }
  let res = localStorage.getItem(item);
  try {
    return JSON.parse(res);
  } catch (error) {
    return res;
  }
}

// function getLocalStorage(item) {
//   return localStorage.getItem(item)
// }

function setLocalStorage(item, value) {
  if (typeof value == "object") {
    localStorage.setItem(item, JSON.stringify(value));
  } else {
    localStorage.setItem(item, value);
  }
}

// token
export function setToken(value) {
  setLocalStorage("x-long-token", value);
}

export function getToken() {
  return getLocalStorage("x-long-token");
}

// 微信用户信息
export function setWechatInfo(value) {
  setLocalStorage("wechatInfo", value);
}

// export function getWechatInfo() {
//   return JSON.parse(getLocalStorage('wechatInfo')) || {}
// }

export function getWechatInfo() {
  return getLocalStorage("wechatInfo");
}

// 位置信息
export function setLocation(value) {
  setLocalStorage("location", value);
}

export function getLocation() {
  return getLocalStorage("location");
}

// ugc用户信息
export function setUgcUserInfo(value) {
  setLocalStorage("ugcUserInfo", value);
}

export function getUgcUserInfo() {
  return getLocalStorage("ugcUserInfo");
}

// tab栏信息
export function setTabInfo(value) {
  setLocalStorage("tabInfo", value);
}

export function getTabInfo() {
  return getLocalStorage("tabInfo");
}

// 记录当前tab栏
export function setActiveTab(value) {
  setLocalStorage("activeTab", value);
}

export function getActiveTab() {
  return getLocalStorage("activeTab");
}
