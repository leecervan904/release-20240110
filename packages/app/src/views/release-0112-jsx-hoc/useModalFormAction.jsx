import { watch } from "vue";

import { useModalForm } from "./useModalForm.jsx";

function getData() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    const res = {
      code: success ? 200 : 400,
      message: success ? "xxx 成功" : "xxx 错误",
      data: [],
    };
    success ? resolve(res) : reject(res);
  });
}

export function useModalFormAdd() {
  const { visible, ModalForm } = useModalForm({
    formConfig: [
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
    ],
    title: "目录名称",
    confirm: async () => {
      return getData();
    },
  });

  return {
    visibleAdd: visible,
    ModalFormAdd: ModalForm,
  };
}

export function useModalFormRename() {
  const { refForm, visible, ModalForm } = useModalForm({
    formConfig: [
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
    ],
    title: "重命名",
    confirm: async () => {
      return getData();
    },
  });

  watch(visible, (val) => {
    if (val) {
      refForm.value.setFieldValue("name", "12345");
    }
  });

  return {
    visibleRename: visible,
    ModalFormRename: ModalForm,
  };
}
