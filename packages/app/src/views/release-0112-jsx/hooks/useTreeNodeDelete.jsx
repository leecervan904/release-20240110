import { Modal, Message } from "view-design";

import { useModalForm } from "./useModalForm";
import { deleteTreeData } from "@/api";

export function useTreeNodeDelete({ emit, getTreeList, tempNode }) {
  const confirm = async () => {
    try {
      const res = await deleteTreeData({
        id: tempNode.value.data.id,
      });
      if (res.data.code === 200) {
        Message.success("新增成功！");
        getTreeList();
        emit("search");
      } else {
        Message.success(res.data.message);
      }
    } catch (error) {
      Message.success(error.message);
    }
  };

  const cancel = () => {
    //
  };

  const showModal = () => {
    Modal.confirm({
      title: "删除目录",
      content: `确认删除目录：${tempNode.value.data.title}`,
      onOk: confirm,
      onCancel: cancel,
    });
  };

  return {
    showDeleteModal: showModal,
  };
}
