import { ref } from "vue";
import { Message } from "view-design";

export function useModalForm({
  emit,
  initForm,
  rulesOuter,
  getTreeData,
  reloadData,
}) {
  const refForm = ref(null);
  const visible = ref(false);
  const loading = ref(false);

  const form = ref(initForm);

  const rules = rulesOuter;

  const validateForm = () => {
    let res = false;
    refForm.value.validate((valid) => {
      res = valid;
    });
    return res;
  };

  const confirm = async (callback) => {
    // 1. 校验
    const valid = validateForm();

    // 2. 调接口
    if (valid) {
      try {
        const res = await callback({
          form: form.value,
        });

        if (res.data.code === 200) {
          Message.success("新增成功！");
          visible.value = false;
          emit("search-table"); // 自定义事件
          if (reloadData) {
            getTreeData();
          }
        } else {
          Message.error(res.data.message);
        }
      } catch (error) {
        Message.error(error.message);
      }
    }
  };

  const cancel = () => {
    visible.value = false;
    form.value.resetFields();
  };

  return {
    visible,
    loading,
    form,
    rules,
    refForm,
    validateForm,
    confirm,
    cancel,
  };
}
