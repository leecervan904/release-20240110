import request from "./request";

export const addTreeData = (data) => {
  return request({
    url: "/api/tree/node/add",
    method: "post",
    data,
  });
};

export const deleteTreeData = (data) => {
  return request({
    url: "/api/tree/node/delete",
    method: "post",
    data,
  });
};

export const renameTreeData = (data) => {
  return request({
    url: "/api/tree/node/rename",
    method: "post",
    data,
  });
};

export const copyTreeData = (data) => {
  return request({
    url: "/api/tree/node/copy",
    method: "post",
    data,
  });
};

export const moveTreeData = (data) => {
  return request({
    url: "/api/tree/node/move",
    method: "post",
    data,
  });
};

export const getTreeData = (data) => {
  return request({
    url: "/api/tree/",
    method: "get",
    params: data,
  });
};

export const getTableData = (data) => {
  return request({
    url: "/api/table/",
    method: "get",
    params: data,
  });
};
