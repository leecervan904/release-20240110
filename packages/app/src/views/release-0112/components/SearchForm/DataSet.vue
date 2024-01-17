<template>
  <FormItem label="代码集名称" prop="dataSet">
    <Input
      placeholder="请输入标准名称"
      :label-width="80"
      :style="{ width: inputWidth }"
      v-model="form.dataSet"
    />
  </FormItem>
</template>

<script>
export default {
  props: ["form", "inputWidth"],
};
</script>
