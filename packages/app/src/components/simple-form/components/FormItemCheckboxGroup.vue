<template>
  <CheckboxGroup v-model="val" v-bind="$attrs" v-on="$listeners">
    <Checkbox v-for="item in options" :key="item.label" :label="item.label" />
  </CheckboxGroup>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelVal: {
      type: Array,
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
