<template>
  <BaseModal v-model="open" v-bind="{ ...modalAttrs }" :title="title">
    <Form ref="refForm" :model="form" :rules="rules" :label-width="120">
      <FormItem label="目录名称" prop="name">
        <Input
          v-model="form.name"
          placeholder="请输入目录名称"
          :label-width="150"
        />
      </FormItem>
    </Form>

    <div slot="footer" style="text-align: center">
      <Button @click="$emit('cancel')">取消</Button>
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
import { toRef, computed } from "vue";
import BaseModal from "@/components/BaseModal";

export default {
  components: {
    BaseModal,
  },
  props: {
    refForm: Object,
    visible: Boolean,
    form: Object,
    rules: Object,
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
      refForm: toRef(props, "refForm"),
      open,
      title,
    };
  },
};
</script>
