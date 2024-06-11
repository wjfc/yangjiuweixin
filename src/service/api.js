import request from "@/service/request.js";
import { stringify } from "qs";
const baseService = "/apigateway/cms/api/v1/external";

// *********************** cms3.0 **************************** //

// 根据栏目id获取栏目信息


// 获取栏目列表
export function getCategoryListForMobile(params) {
  return request.post(`${baseService}/getCategoryListForMobile?${stringify(params)}`);
}
export function getCategoryList(params) {
  return request.post(`${baseService}/getCategoryList?${stringify(params)}`);
}
export function getCategory(params) {
  // console.log(params);
  return request.post(`${baseService}/getCategoryList`, params);
}

// 根据栏目id获取栏目信息
export function getCategoryInfo(params) {
  return request.post(`${baseService}/datasource/preview`, params);
}

// 新增栏目访问量接口 /apigateway/dataProbe/probe/api/v1/cmsDataSys/catgory
export function catgoryLog(_params) {
  let params = {
    ..._params,
    businessCode: "catgory",
    userValue: localStorage.getItem("openid") || "81170119360008369",
    userType: 1,
    sysCode: "cmsDataSys"
  }
  return request.post(`/apigateway/dataProbe/probe/api/v1/cmsDataSys/catgory`, params);
}

// 获取资讯列表
export function getContentList(params) {
  return request.post(`${baseService}/getContentList?${stringify(params)}`);
}

// 获取资讯详情
export function getContentInfo(params) {
  return request.post(`${baseService}/getInfoContent?${stringify(params)}`);
}
// 获取全栏目最新资讯
export function getNewInfoList(params) {
  return request.post(`${baseService}/newInfoList?${stringify(params)}`);
}

// 数据源接口
export function preview(params) {
  return request.post(`${baseService}/datasource/preview`, params);
}

// *********************** user **************************** //
// 收藏
export function getCollectionList(params) {
  return request.post(`${baseService}/content/collectionSelect`, params);
}
// /apigateway/cms/api/v1/external/content/likeSelect
// 点赞
export function getLikeList(params) {
  return request.post(`${baseService}/content/likeSelect`, params);
}
// 点赞
export function setLikeNum(params) {
  // export async function setLikeNum(params) {
  return request.post(`/apigateway/cms/api/v1/useraction`, params);
}

// 点赞
export function userAction(params) {
  // export async function setLikeNum(params) {
  return request.post(`/apigateway/cms/api/v1/useraction`, params);
}

// *********************** ugc 相关 **************************** //
// 上传图片
export function loadImage(params) {
  return request.post(`/ugc/api/v1/image/handle/uploadImage`, params, {
    "Content-Type": "multipart/form-data",
  });
}

// 上传视频
export function uploadChunk(params) {
  return request.post(`/ugc/api/v1/video/upload`, params, {
    "Content-Type": "multipart/form-data",
  });
}

// 合并视频
export function mergeChunk(params) {
  return request.post(`/ugc/api/v1/video/merge`, params);
}

export function checkUploadPart(params) {
  return request.post(`/ugc/api/v1/video/checkUploadPart`, params);
}

export function deleteVideo(params) {
  // /ugc/api/v1/video/{fileMD5}
  return request.delete(`/ugc/api/v1/video/${stringify(params)}`);
}

// 发布
export async function addPublishContent(params) {
  return request.post(
    `/ugc/api/v1/interface/entrance/addPublishContent`,
    params,
    { "Content-Type": "multipart/form-data" }
  );
}

// 获取发布入口id
export async function getListEntrance(params) {
  return request.post(
    `/ugc/api/v1/interface/entrance/listEntrance?${stringify(params)}`
  );
}

// 我的发布
export async function getPersonalPublishList(params) {
  return request.post(
    `/ugc/api/v1/interface/entrance/personalPublishList?${stringify(params)}`
  );
}
// 获取微信公众号相关参数
export function dojssdk(params) {
  return request(`/ugc/api/v1/auth/dojssdk?${stringify(params)}`);
}

// 获取微信用户信息
export function addUserInfo(params) {
  return request.post(`/ugc/api/v1/auth/addUserInfo`, params, {
    "Content-Type": "application/json",
  });
}

/** 营销平台活动相关 */
// 获取投票项
export function getVoteItem(params) {
  return request.get(`/interface/getVoteItem?${stringify(params)}`);
}

// 获取剩余投票次数
export function voteCount(params) {
  return request.get(`/interface/voteCount?${stringify(params)}`);
}

// 投票
export function votesubmit(params) {
  return request.get(`/interface/votesubmit?${stringify(params)}`);
}


