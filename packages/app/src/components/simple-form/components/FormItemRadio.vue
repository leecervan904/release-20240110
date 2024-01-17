<template>
  <Radio v-model="val" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelVal: [String, Number, Boolean],
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
