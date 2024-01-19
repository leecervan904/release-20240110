<template>
  <FormItem label="最新的审核状态" prop="verifyStatus">
    <Select v-model="form.verifyStatus" :style="{ width: selectWidth }">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
        item.label
      }}</Option>
    </Select>
  </FormItem>
</template>

<script>
export default {
  props: ["form", "selectWidth"],
  data() {
    return {
      cityList: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
    };
  },
};
</script>
