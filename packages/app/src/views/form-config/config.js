/**
 * 表单项配置数组，各字段含义
 *
 * prop: 绑定到 form 上的字段名，同时组件会根据这个名字生成相应式的 form
 * label: FormItem 前面的 label
 * labelConfig: FormItem 的更多参数配置：width 等
 * rules: 当前表单项的校验规则
 * component: 所需要渲染的表单组件
 *   - name: 组件名，目前只适配 iview
 *   - initialValue：表单的初始值，用于回显、重置表单
 *   - props: 组件属性，会直接传递到目标表单组件：如 iview 的各个表单控件：Input、Checkbox、Select、...
 *   - events: 组件事件，会直接传递到目标表单组件，除了能访问事件的 $event，还能访问整个响应式表单，可以在这里处理表单联动
 */
export const formConfigDemo = [
  {
    prop: "name",
    label: "姓名",
    rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    component: {
      name: "Input",
      initialValue: "法外狂徒 - 张三",
      props: {
        placeholder: "请输入姓名",
      },
      events: {
        change: (value, form) => {
          console.log(value, { ...form });
        },
      },
    },
  },
  {
    prop: "unknown",
    label: "无知按钮",
    component: {
      name: "Radio",
      initialValue: false,
    },
  },
  {
    prop: "sex",
    label: "性别（联动）",
    rules: [{ required: true, message: "请选择性别", trigger: "blur" }],
    component: {
      name: "RadioGroup",
      props: {
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
      },
      events: {
        change: (value, form) => {
          // 处理联动
          if (value === "男") {
            form.desc = `我是男的`;
            form.hobby = ["睡觉", "游戏"];
          } else if (value === "女") {
            form.desc = `我是女生`;
            form.hobby = ["睡觉", "逛街"];
          } else {
            form.hobby = ["睡觉"];
          }
          console.log(value, { ...form });
        },
      },
    },
  },
  {
    prop: "beAPerson2",
    label: "做个人吧（联动）",
    component: {
      name: "Checkbox",
      initialValue: true,
      events: {
        change: (value, form) => {
          if (!value) {
            form.sex = "";
            form.hobby = ["摆烂"];
            form.desc = "毁灭吧!!!!!!!!!!!!!!!!!!!!!!";
          } else {
            form.hobby = ["睡觉"];
            form.desc = "再看看吧～";
          }
        },
      },
    },
  },
  {
    prop: "hobby",
    label: "爱好",
    rules: [
      {
        required: true,
        type: "array",
        min: 1,
        message: "至少选择一项！",
        trigger: "change",
      },
      {
        type: "array",
        max: 2,
        message: "最多只能选择两项！！",
        trigger: "change",
      },
    ],
    component: {
      name: "CheckboxGroup",
      initialValue: ["睡觉"],
      props: {
        options: [
          { label: "睡觉", value: "sleep" },
          { label: "游戏", value: "game" },
          { label: "逛街", value: "gogogo" },
          { label: "摆烂", value: "fuck" },
        ],
      },
    },
  },
  {
    prop: "city",
    label: "城市",
    rules: [{ required: true, message: "请选择所在城市", trigger: "blur" }],
    component: {
      name: "Select",
      props: {
        placeholder: "请选择所在城市",
        options: [
          { label: "北京", value: "bj" },
          { label: "上海", value: "sh" },
          { label: "广州", value: "gz" },
          { label: "深圳", value: "sz" },
        ],
      },
      events: {
        change: (value, form) => {
          console.log(value, { ...form });
        },
      },
    },
  },
  {
    prop: "date",
    label: "日期",
    rules: [
      {
        required: true,
        type: "date",
        message: "Please select the date",
        trigger: "change",
      },
    ],
    component: {
      name: "DatePicker",
      props: {
        type: "date",
        placeholder: "选择日期",
      },
    },
  },
  {
    prop: "time",
    label: "时间",
    rules: [
      {
        required: true,
        type: "string",
        message: "Please select time",
        trigger: "change",
      },
    ],
    component: {
      name: "TimePicker",
      props: {
        type: "time",
        placeholder: "选择时间",
      },
    },
  },
  {
    prop: "desc",
    label: "简介",
    rules: [
      { required: true, message: "请输入自我介绍", trigger: "input, blur" },
    ],
    component: {
      name: "Input",
      props: {
        type: "textarea",
        placeholder: "请输入自我介绍",
      },
    },
  },
];
