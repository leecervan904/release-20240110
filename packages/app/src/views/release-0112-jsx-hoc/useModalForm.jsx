import {
  ref,
  defineComponent,
  computed,
  onMounted,
  nextTick,
  getCurrentInstance,
  provide,
  inject,
} from "vue";
import { Message } from "view-design";

import BaseModal from "@/components/BaseModal";
import SimpleForm from "@/components/simple-form";

const INJECT_FORM_KEY = Symbol("refForm");

function withModal(Comp) {
  const WrapperModal = defineComponent({
    name: "WrapperModal",
    props: {
      value: Boolean,
      title: String,
      confirm: Function,
      cancel: Function,
    },
    setup(props, { attrs, listeners, emit }) {
      const { proxy: inst } = getCurrentInstance();

      const refForm = inject(INJECT_FORM_KEY);

      onMounted(() => {
        nextTick(() => {
          refForm.value = inst.$refs.refForm;
        });
      });

      const show = computed({
        get() {
          return props.value;
        },
        set(val) {
          emit("input", val);
        },
      });

      const confirm = async () => {
        const { refForm } = inst.$refs;
        const { valid, form } = refForm.validate();

        if (!valid) {
          Message.error("表单校验失败");
          return;
        }

        try {
          const res = await props.confirm({ form });

          if (res.code === 200) {
            Message.success(res.message);

            refForm.reset();
            show.value = false;

            emit("search");
          } else {
            Message.error(res.message);
          }
        } catch (error) {
          Message.error(error.message);
        }
      };

      const cancel = () => {
        // emit("cancel");
        show.value = false;
      };

      return () => (
        <BaseModal
          title={props.title || "no title"}
          value={show.value}
          onInput={(val) => (show.value = val)}
          scopedSlots={{
            footer: () => (
              <div slot="footer" style="text-align: center">
                <Button onClick={cancel}>取消1</Button>
                <Button
                  type="primary"
                  style="margin-left: 20px"
                  onClick={confirm}
                >
                  确定1
                </Button>
              </div>
            ),
          }}
        >
          <Comp
            ref="refForm"
            {...{
              attrs,
              on: listeners,
            }}
          />
        </BaseModal>
      );
    },
  });

  return WrapperModal;
}

const noop = () => {};

export function useModalForm({
  formConfig,
  confirm = noop,
  cancel = noop,
  title,
}) {
  const visible = ref(false);
  const refForm = ref(null);

  provide(INJECT_FORM_KEY, refForm);

  const WrapperModal = withModal(SimpleForm);

  const ModalForm = () => (
    <WrapperModal
      value={visible.value}
      onInput={(val) => (visible.value = val)}
      form-config={formConfig}
      title={title}
      confirm={confirm}
      cancel={cancel}
    />
  );

  return {
    refForm,
    visible,
    ModalForm,
  };
}
