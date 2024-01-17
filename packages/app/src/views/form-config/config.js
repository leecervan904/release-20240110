/**
 * 表单项配置数组，各字段含义
 *
 * prop: 绑定到 form 上的字段名，同时组件会根据这个名字生成相应式的 form
 * label: FormItem 前面的 label
 * labelConfig: FormItem 的更多参数配置：width 等
 * rules: 当前表单项的校验规则
 * component: 所需要渲染的表单组件
 *   - type: 组件类型，目前只适配 iview 内置表单、TreeSelect
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
      type: "Input",
      initialValue: "法外狂徒 - 张三",
      props: {
        placeholder: "请输入姓名",
      },
      events: {
        // "on-change": (form, value) => {
        //   console.log({ ...form }, value);
        // },
      },
    },
  },
  {
    prop: "unknown",
    label: "无知按钮",
    component: {
      type: "Radio",
      initialValue: false,
    },
  },
  {
    prop: "sex",
    label: "性别（联动）",
    rules: [{ required: true, message: "请选择性别", trigger: "blur" }],
    component: {
      type: "RadioGroup",
      props: {
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
      },
      events: {
        "on-change": (form, value) => {
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
      type: "Checkbox",
      initialValue: true,
      events: {
        "on-change": (form, value) => {
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
      type: "CheckboxGroup",
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
      type: "Select",
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
        "on-change": (form, value) => {
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
      type: "DatePicker",
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
      type: "TimePicker",
      props: {
        type: "time",
        placeholder: "选择时间",
      },
    },
  },
  {
    prop: "treeSelect",
    label: "树形选择（异步）",
    rules: [
      // { required: true, message: '请选择', trigger: 'change' },
      {
        trigger: "blur, change",
        validator: (rule, value, callback) => {
          console.log("treeSelect, trigger", value);

          if (value == null) {
            callback(new Error("请选择"));
          } else {
            callback();
          }
        },
      },
    ],
    component: {
      type: "TreeSelect",
      initialValue: 9,
      props: {
        noChildrenText: "无子目录",
        noOptionsText: "暂无可选目录",
        placeholder: "请选择目录",
        options: [],
        "default-expand-level": 3,
      },
      events: {
        open: (form, ...args) => {
          console.log("open tree select", { ...form }, args);
        },
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
      type: "Input",
      props: {
        type: "textarea",
        placeholder: "请输入自我介绍",
      },
    },
  },
];
