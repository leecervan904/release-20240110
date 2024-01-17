<template>
  <Form ref="refForm" :model="form" :rules="rules" :label-width="140">
    <FormItem
      v-for="item in formConfig"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      v-bind="{ ...(item.labelConfig || {}) }"
    >
      <component
        :is="getComp(item.component.type)"
        :model-val="form[item.prop]"
        v-bind="{ ...(item.component.props || {}) }"
        v-on="registerEvents(item)"
      />
    </FormItem>

    <FormItem v-if="showFooter">
      <slot
        name="footer"
        :form="form"
        :initialForm="initialForm"
        :rules="rules"
        :submit="submit"
        :reset="reset"
      >
        <Button type="primary" @click="submit">Submit</Button>
        <Button @click="reset" style="margin-left: 8px">Reset</Button>
      </slot>
    </FormItem>
  </Form>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { cloneDeep } from "lodash-es";

// 异步加载组件
const FormItemComponents = {
  Input: defineAsyncComponent(() => import("./components/FormItemInput.vue")),
  Radio: defineAsyncComponent(() => import("./components/FormItemRadio.vue")),
  RadioGroup: defineAsyncComponent(() =>
    import("./components/FormItemRadioGroup.vue")
  ),
  Checkbox: defineAsyncComponent(() =>
    import("./components/FormItemCheckbox.vue")
  ),
  CheckboxGroup: defineAsyncComponent(() =>
    import("./components/FormItemCheckboxGroup.vue")
  ),
  Select: defineAsyncComponent(() => import("./components/FormItemSelect.vue")),
  DatePicker: defineAsyncComponent(() =>
    import("./components/FormItemDatePicker.vue")
  ),
  TimePicker: defineAsyncComponent(() =>
    import("./components/FormItemTimePicker.vue")
  ),
  TreeSelect: defineAsyncComponent(() =>
    import("./components/FormItemTreeSelect.vue")
  ),
};

const allowComponents = Object.keys(FormItemComponents);

function getDefaultValue(name) {
  switch (name) {
    case "Input":
      return "";
    case "Radio":
      return false;
    case "RadioGroup":
      return null;
    case "Checkbox":
      return false;
    case "CheckboxGroup":
      return [];
    case "Select":
      return null;
    case "DatePicker":
      return null;
    case "TimePicker":
      return null;
    case "TreeSelect":
      return null;
    default:
      return null;
  }
}

export default {
  name: "SimpleForm",
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    initialForm() {
      return this.formConfig.reduce((accu, curr) => {
        return {
          ...accu,
          [curr.prop]:
            curr.component.initialValue != undefined
              ? curr.component.initialValue
              : getDefaultValue(curr.component.name),
        };
      }, {});
    },
    rules() {
      return this.formConfig.reduce((accu, curr) => {
        return {
          ...accu,
          [curr.prop]: curr.rules,
        };
      }, {});
    },
  },
  watch: {
    formConfig: {
      handler() {
        this.form = cloneDeep(this.initialForm);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    validateField(...args) {
      this.$refs.refForm.validateField(...args);
    },
    getComp(name) {
      if (!allowComponents.includes(name)) {
        throw new Error("不支持的表单类型");
      }

      return FormItemComponents[name];
    },
    registerEvents(item) {
      const { type, events = {} } = item.component;

      // 处理 input 复合事件
      // 1. input 事件需要更改 v-model 的值
      // 2. 需要手动触发一次用户自定义的 input
      // 内置的双向数据更新事件
      // todo：使用复合事件
      events["update-model-val"] = (form, val, ...args) => {
        // console.log("update-model-val trigger:", form, val, args);
        this.form[item.prop] = val;
      };

      return Object.keys(events).reduce((accu, curr) => {
        // iview 事件 on-xxx
        const evts = {
          ...accu,
          [curr]: ($event) => {
            events[curr](this.form, $event);
          },
        };

        // 单独处理非自带表单
        // todo：优化控制方式
        if (type === "TreeSelect") {
          const updateHandler = events["update-model-val"];
          evts["update-model-val"] = (val, ...args) => {
            updateHandler(this.form, val, ...args);

            if (item.rules && item.rules.length) {
              this.validateField(item.prop);
            }
          };
        }

        return evts;
      }, {});
    },
    submit() {
      const valid = this.validate();
      if (valid) {
        console.log({ ...this.form });
        this.$Message.success("Success!");
      } else {
        this.$Message.error("Fail!");
      }
    },
    validate() {
      console.log("will validate...");

      let res = false;
      this.$refs.refForm.validate((valid) => {
        res = valid;
      });
      return { valid: res, form: this.form };
    },
    reset() {
      console.log("will reset...");
      this.$refs.refForm.resetFields();
    },
  },
};
</script>
