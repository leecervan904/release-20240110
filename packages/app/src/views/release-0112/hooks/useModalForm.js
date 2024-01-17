import { ref, onMounted, nextTick } from "vue";
import { Message } from "view-design";

export function useModalForm({ emit, getTreeList, reloadData }) {
  const refModal = ref(null); // 弹窗组件 ref => BaseModalForm
  const refForm = ref(null); // 表单组件 ref => SimpleForm
  const visible = ref(false);
  const loading = ref(false);

  const confirm = async (callback) => {
    // 1. 校验
    const { valid, form } = refForm.value.validate();
    console.log("校验结果：", valid, { ...form });
    // return;

    // 2. 调接口
    if (valid) {
      try {
        const res = await callback({
          form: form,
        });

        if (res.data.code === 200) {
          Message.success("新增成功！");

          // like cancel
          visible.value = false;
          refForm.value.reset();

          emit("search"); // 自定义事件
          if (reloadData) {
            getTreeList();
          }
        } else {
          Message.error(res.data.message);
        }
      } catch (error) {
        Message.error(error.message);
      }
    }
  };

  onMounted(() => {
    nextTick(() => {
      refForm.value = refModal.value.$refs.refSimpleForm;
    });
  });

  const cancel = () => {
    visible.value = false;
    refForm.value.reset();
  };

  return {
    visible,
    loading,
    refForm,
    refModal,
    confirm,
    cancel,
  };
}
