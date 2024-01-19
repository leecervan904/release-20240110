import { addTreeData } from "@/api";
import { useModalForm } from "./useModalForm";
import ModalForm from "../components/ModalForm";

export function useTreeNodeAdd({ emit, currentNode, getTreeList }) {
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
      return addTreeData({
        parentId: currentNode.value.data.id,
        title: form.name,
      });
    });
  };

  const TreeNodeAddModal = () => (
    <ModalForm
      value={visible.value}
      onInput={(val) => (visible.value = val)}
      title="新建目录"
      ref="refAddModal" // 这个和后续 return 的 refAddModal 保持一致
      form-config={formConfig}
      loading={loading.value}
      onConfirm={handleConfirm}
      onCancel={cancel}
    />
  );

  return {
    addFormConfig: formConfig,
    refAddModal: refModal,
    addVisible: visible,
    addLoading: loading,
    addConfirm: handleConfirm,
    addCancel: cancel,
    TreeNodeAddModal,
  };
}
