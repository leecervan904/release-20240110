<template>
  <TreeSelect v-model="val" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelVal: {
      type: [String, Number, Array],
    },
  },
  computed: {
    val: {
      get() {
        return this.modelVal;
      },
      set(val) {
        console.log("update", val);
        this.$emit("update-model-val", val);
      },
    },
  },
};
</script>

<style lang="less">
.ivu-form-item-error .vue-treeselect__control {
  border: 1px solid #ed4014 !important;
}
</style>
