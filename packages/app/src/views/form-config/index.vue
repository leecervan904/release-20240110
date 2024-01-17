<template>
  <div style="width: 400px">
    <h2>表单简单配置化</h2>

    <SimpleForm :form-config="formConfig" />
  </div>
</template>

<script>
import SimpleForm from "@/components/simple-form";
import { formConfigDemo } from "./config";

export default {
  components: {
    SimpleForm,
  },
  data() {
    return {
      formConfig: formConfigDemo,
    };
  },
};
</script>
