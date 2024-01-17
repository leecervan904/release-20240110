<template>
  <div style="width: 400px">
    <h2>表单简单配置化</h2>

    <SimpleForm :form-config="formConfig" show-footer />
  </div>
</template>

<script>
import SimpleForm from "@/components/simple-form";
import { formConfigDemo } from "./config";

import data from "./treeSelectData";

export default {
  components: {
    SimpleForm,
  },
  data() {
    return {
      formConfig: [],
    };
  },
  mounted() {
    const treeItem = formConfigDemo.find((v) => v.prop === "treeSelect");

    treeItem.component.props.normalizer = (node) => {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.label,
        children: node.children,
      };
    };

    this.formConfig = formConfigDemo;

    this.getTreeSelectData();
  },
  methods: {
    getTreeSelectData() {
      setTimeout(() => {
        const treeItem = this.formConfig.find((v) => v.prop === "treeSelect");
        treeItem.component.props.options = data;
      }, 1000);
    },
  },
};
</script>
