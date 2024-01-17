<template>
  <FormItem label="标准状态" prop="standardStatus">
    <Select v-model="form.standardStatus" :style="{ width: selectWidth }">
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
