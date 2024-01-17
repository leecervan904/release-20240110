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
        :is="getComp(item.component.name)"
        :value="form[item.prop]"
        @input="
          (val) => {
            form[item.prop] = val;
          }
        "
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
        :clear="clear"
      >
        <Button type="primary" @click="submit">Submit</Button>
        <Button @click="reset" style="margin-left: 8px">Reset</Button>
        <Button @click="clear" style="margin-left: 8px">Clear</Button>
      </slot>
    </FormItem>
  </Form>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { cloneDeep, isPlainObject } from "lodash-es";
import { Radio, Checkbox, DatePicker, TimePicker } from "view-design";

// 异步加载组件
const FormItemComponents = {
  Input: defineAsyncComponent(() => import("./components/FormItemInput.vue")),
  Radio,
  RadioGroup: defineAsyncComponent(() =>
    import("./components/FormItemRadioGroup.vue")
  ),
  Checkbox,
  CheckboxGroup: defineAsyncComponent(() =>
    import("./components/FormItemCheckboxGroup.vue")
  ),
  Select: defineAsyncComponent(() => import("./components/FormItemSelect.vue")),
  DatePicker,
  TimePicker,
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
      return "";
    case "TimePicker":
      return "";
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
  mounted() {
    this.form = cloneDeep(this.initialForm);
  },
  methods: {
    getComp(name) {
      if (!allowComponents.includes(name)) {
        throw new Error("不支持的表单类型");
      }

      return FormItemComponents[name];
    },
    registerEvents(item) {
      const events = item.component.events;

      if (!isPlainObject(events)) {
        return {};
      }

      return Object.keys(events).reduce((accu, curr) => {
        return {
          ...accu,
          [`on-${curr}`]: ($event) => {
            console.log("on", curr);
            events[curr]($event, this.form);
          },
          "on-input": (val) => {
            console.log(123);
            this.form[item.prop] = val;
            // input 事件会覆盖掉 v-model 的值，所以需要手动触发一次用户自定义的 input
            if (events.input) {
              events.input(val, this.form);
            }
          },
        };
      }, {});
    },
    submit() {
      const valid = this.validate();
      if (valid) {
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

      this.form = cloneDeep(this.initialForm);
      // 没看到组件库提供的方法，手动清空错误信息
      this.$refs.refForm.fields.forEach((el) => {
        el.validateState = "";
      });
    },
    clear() {
      console.log("will clear...");

      this.$refs.refForm.resetFields();
    },
  },
};
</script>
