<template>
  <Select v-model="val" v-bind="$attrs" v-on="$listeners">
    <Option v-for="item in options" :key="item.value" :value="item.value">{{
      item.label
    }}</Option>
  </Select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
    },
    options: {
      type: Array,
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
