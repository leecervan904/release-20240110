<template>
  <RadioGroup v-model="val" v-bind="$attrs" v-on="$listeners">
    <Radio v-for="item in options" :key="item.label" :label="item.label" />
  </RadioGroup>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelVal: {
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
        return this.modelVal;
      },
      set(val) {
        this.$emit("update-model-val", val);
      },
    },
  },
};
</script>
