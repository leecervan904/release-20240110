/**
 * prop: 对应的 form prop
 * label: FormItem 对应的 label
 * labelConfig: FormItem 对应的 label 的配置
 * rules: form 表单项的校验规则
 * component: 内部渲染的组件信息
 *   - name: 组件名，统一使用 iview：Input, Radio, Checkbox, Select, ...
 *   - props: 组件属性，会直接传递
 *   - events: 组件事件，会直接传递
 */
const formConfigDemo = [
  {
    prop: "name",
    label: "姓名",
    rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    component: {
      name: "Input",
      props: {
        placeholder: "请输入姓名",
      },
    },
  },
  {
    prop: "sex",
    label: "性别",
    rules: [{ required: true, message: "请选择性别", trigger: "blur" }],
    component: {
      name: "Radio",
      props: {},
    },
  },
  {
    prop: "hobby",
    label: "爱好",
    rules: [{ required: true, message: "请选择爱好", trigger: "blur" }],
    component: {
      name: "Checkbox",
      props: {
        options: [
          { label: "篮球", value: "basketball" },
          { label: "足球", value: "football" },
          { label: "乒乓球", value: "pingpang" },
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
      props: {},
    },
    props: {
      placeholder: "请选择所在城市",
      options: [
        { label: "北京", value: "bj" },
        { label: "上海", value: "sh" },
        { label: "广州", value: "gz" },
        { label: "深圳", value: "sz" },
      ],
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
      },
    },
    props: {
      placeholder: "请输入自我介绍",
    },
  },
];
