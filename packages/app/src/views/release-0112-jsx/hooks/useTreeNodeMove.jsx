import { ref, watch } from "vue";
import { getTreeData } from "@/api";

import { moveTreeData } from "@/api";
import { useModalForm } from "./useModalForm";
import ModalForm from "../components/ModalForm";

export function useTreeNodeMove({ emit, getTreeList, tempNode }) {
  const formConfig = ref([
    {
      prop: "targetId",
      label: "选择移动的目录",
      rules: [
        {
          trigger: "blur, change",
          validator: (rule, value, callback) => {
            console.log("treeSelect, trigger", value);

            if (value == null) {
              callback(new Error("请选择"));
            } else {
              callback();
            }
          },
        },
      ],
      component: {
        type: "TreeSelect",
        initialValue: tempNode.value && tempNode.value.data.id,
        props: {
          noChildrenText: "无子目录",
          noOptionsText: "暂无可选目录",
          placeholder: "请选择目录",
          options: [],
          "default-expand-level": 3,
          normalizer: (node) => {
            if (node.children && !node.children.length) {
              delete node.children;
            }
            return {
              id: node.id,
              label: node.title,
              children: node.children,
            };
          },
        },
      },
    },
  ]);

  const { refModal, visible, loading, confirm, cancel } = useModalForm({
    emit,
    reloadData: true,
    getTreeList,
  });

  const handleConfirm = async () => {
    confirm(({ form }) => {
      return moveTreeData({
        id: tempNode.value.data.id,
        parentId: form.targetId,
      });
    });
  };

  const TreeNodeMoveModal = () => (
    <ModalForm
      value={visible.value}
      onInput={(val) => (visible.value = val)}
      title="移动目录"
      ref="refMoveModal"
      form-config={formConfig.value}
      loading={loading.value}
      onConfirm={handleConfirm}
      onCancel={cancel}
    />
  );

  watch(visible, (val) => {
    if (val) {
      getTreeData().then((res) => {
        formConfig.value[0].component.props.options = [res.data.data];
      });
    }
  });

  return {
    moveFormConfig: formConfig,
    refMoveModal: refModal,
    moveVisible: visible,
    moveLoading: loading,
    moveConfirm: handleConfirm,
    moveCancel: cancel,
    TreeNodeMoveModal,
  };
}
