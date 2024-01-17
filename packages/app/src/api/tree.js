import request from "./request";

export const addTreeData = (data) => {
  return request({
    url: "/api/tree/node/create",
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
    url: "/api/tree/node/update",
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
    url: "/api/tree/node/update",
    method: "post",
    data,
  });
};

export const getTreeData = (data) => {
  return request({
    url: "/api/tree",
    method: "get",
    params: data,
  });
};
