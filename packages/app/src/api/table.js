import request from "./request";

export const getTableData = (data) => {
  return request({
    url: "/api/table/",
    method: "get",
    params: data,
  });
};
