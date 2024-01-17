<template>
  <Input v-model="val" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: String,
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
  mounted() {
    console.log(this.$attrs, this.$listeners);
  },
};
</script>
