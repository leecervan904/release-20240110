<template>
  <Modal v-bind="$attrs" v-on="$listeners">
    <slot></slot>

    <template #footer>
      <slot name="footer"> </slot>
    </template>
  </Modal>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
