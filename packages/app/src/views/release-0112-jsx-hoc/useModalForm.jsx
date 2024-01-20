import {
  ref,
  defineComponent,
  computed,
  onMounted,
  nextTick,
  getCurrentInstance,
} from "vue";
import { Message } from "view-design";
import VueTypes from "vue-types";
import { omit } from "lodash-es";

import BaseModal from "@/components/BaseModal";
import SimpleForm from "@/components/simple-form";

const noop = () => {};

function withModal(Comp, { refForm }) {
  const WrapperModal = defineComponent({
    name: "WrapperModal",
    props: {
      showModal: VueTypes.bool.def(false),
      confirmModal: VueTypes.func.def(noop),
      cancelModal: VueTypes.func.def(noop),
      modalAttrs: VueTypes.object.def({}),
    },
    setup(props, { attrs, listeners, emit }) {
      const { proxy: inst } = getCurrentInstance();

      onMounted(() => {
        nextTick(() => {
          refForm.value = inst.$refs.refForm;
        });
      });

      const show = computed({
        get() {
          return props.showModal;
        },
        set(val) {
          emit("update:showModal", val);
        },
      });

      const defaultModalAttrs = {
        title: "标题",
        width: 800,
        "max-height": 800,
        "mask-closable": false,
      };

      const onConfirm = async () => {
        const { refForm } = inst.$refs;
        const { valid, form } = refForm.validate();

        if (!valid) {
          Message.error("表单校验失败");
          return;
        }

        try {
          const res = await props.confirmModal({ form });

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

      const onCancel = async () => {
        try {
          await props.cancelModal();
          show.value = false;
        } catch (error) {
          Message.error(error.message);
        }
      };

      return () => (
        <BaseModal
          title={props.title || "no title"}
          {...{ ...defaultModalAttrs, ...props.modalAttrs }}
          value={show.value}
          onInput={(val) => (show.value = val)}
          scopedSlots={{
            footer: () => (
              <div style="text-align: center">
                <Button onClick={onCancel}>取消1</Button>
                <Button
                  type="primary"
                  style="margin-left: 20px"
                  onClick={onConfirm}
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
              on: omit(listeners, "update:showModal"),
            }}
          />
        </BaseModal>
      );
    },
  });

  return WrapperModal;
}

export function useModalForm({
  formConfig,
  modalAttrs,
  onConfirm = noop,
  onCancel = noop,
}) {
  const visible = ref(false);
  const refForm = ref(null);

  const WrapperModal = withModal(SimpleForm, { refForm });

  const ModalForm = () => (
    <WrapperModal
      showModal={visible.value}
      on={{
        "update:showModal": (val) => (visible.value = val),
      }}
      form-config={formConfig}
      modalAttrs={modalAttrs}
      confirmModal={onConfirm}
      cancelModal={onCancel}
    />
  );

  return {
    refForm,
    visible,
    ModalForm,
  };
}
