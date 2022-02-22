import req from "./req";

// 获取模版页面列表
export function getThemeData() {
  return req.get("/theme.tmpl", {
    platform: "pc"
  });
}

// 获取页面挂件
export function getTemplateContent(params) {
  let url = "/api/h5app/wxapp/pctemplate/getTemplateContent";
  return req.get(url, {
    ...params
  });
}

// 获取头部尾部
export function getHeaderOrFooter(params) {
  let url = "/api/h5app/wxapp/pctemplate/getHeaderOrFooter";
  return req.get(url, {
    ...params
  });
}
