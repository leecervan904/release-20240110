import { ref } from "vue";
import { Message } from "view-design";

export function useModalForm({ emit, getTreeList, reloadData }) {
  const refForm = ref(null);
  const visible = ref(false);
  const loading = ref(false);

  const confirm = async (callback) => {
    // 1. 校验
    const { valid, form } = refForm.value.$refs.refSimpleForm.validate();
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
          visible.value = false;
          emit("search-table"); // 自定义事件
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

  const cancel = () => {
    visible.value = false;
    // form.value.resetFields();
    refForm.value.$refs.refSimpleForm.reset();
  };

  return {
    visible,
    loading,
    // form,
    // rules,
    refForm,
    confirm,
    cancel,
  };
}
