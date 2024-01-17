<template>
  <RadioGroup v-model="val" v-bind="$attrs" v-on="$listeners">
    <Radio v-for="item in options" :key="item.label" :label="item.label" />
  </RadioGroup>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
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
