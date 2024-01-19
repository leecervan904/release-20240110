<template>
  <FormItem label="数据元名称" prop="dataMeta">
    <Input
      placeholder="请输入数据元名称"
      :label-width="80"
      inline
      v-model="form.dataMeta"
      :style="{ width: inputWidth }"
      @keyup.native.enter="$emit('search')"
    />
  </FormItem>
</template>

<script>
export default {
  props: ["form", "inputWidth"],
};
</script>
