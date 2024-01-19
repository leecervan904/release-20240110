import { getTreeData } from "@/api";
import ModalForm from "../components/ModalForm";
import { useModalForm } from "./useModalForm";
import { copyTreeData } from "@/api";

export function useTreeNodeCopy({ emit, getTreeList, tempNode }) {
  const formConfig = [
    {
      prop: "name",
      label: "目录名称",
      rules: [{ required: true, message: "请输入目录名称", trigger: "blur" }],
      component: {
        type: "Input",
        initialValue: "",
        props: {
          placeholder: "请输入目录名称",
        },
      },
    },
  ];

  const { refModal, visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return copyTreeData({
        name: form.name,
        parentId: tempNode.value.data.id || "0",
      });
    });
  };

  const TreeNodeCopyModal = () => (
    <ModalForm
      value={visible.value}
      onInput={(val) => (visible.value = val)}
      title="复制目录"
      ref="refCopyModal"
      form-config={formConfig}
      loading={loading.value}
      onConfirm={handleConfirm}
      onCancel={cancel}
    />
  );

  return {
    copyFormConfig: formConfig,
    refCopyModal: refModal,
    copyVisible: visible,
    copyLoading: loading,
    copyConfirm: handleConfirm,
    copyCancel: cancel,
    TreeNodeCopyModal,
  };
}
