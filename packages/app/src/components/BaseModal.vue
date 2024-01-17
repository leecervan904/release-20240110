<template>
  <Modal v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </Modal>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
