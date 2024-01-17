<template>
  <CheckboxGroup v-model="val" v-bind="$attrs" v-on="$listeners">
    <Checkbox v-for="item in options" :key="item.label" :label="item.label" />
  </CheckboxGroup>
</template>

<script>
export default {
  props: {
    value: {
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
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
