<template>
  <BaseModal v-model="open" v-bind="{ ...modalAttrs }" :title="title">
    <SimpleForm ref="refSimpleForm" :form-config="formConfig" />

    <div slot="footer" style="text-align: center">
      <Button @click="$emit('cancel')">取消22</Button>
      <Button
        type="primary"
        style="margin-left: 20px"
        :loading="loading"
        @click="$emit('confirm')"
      >
        确定
      </Button>
    </div>
  </BaseModal>
</template>

<script>
import { computed } from "vue";
import BaseModal from "@/components/BaseModal";
import SimpleForm from "@/components/simple-form";

export default {
  components: {
    BaseModal,
    SimpleForm,
  },
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    value: Boolean,
    loading: Boolean,
    title: String,
    modalAttrs: {
      type: Object,
      default: () => ({
        title: "标题",
        width: 800,
        "max-height": 800,
        "mask-closable": false,
      }),
    },
  },
  setup(props, { emit }) {
    const open = computed({
      get() {
        return props.value;
      },
      set(val) {
        emit("input", val);
      },
    });

    const title = computed(() => props.title || props.modalAttrs.title);

    return {
      // refForm: toRef(props, "refForm"),
      open,
      title,
    };
  },
};
</script>
