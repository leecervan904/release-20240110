<template>
  <div class="search-form">
    <Form inline :model="form" @submit.native.prevent>
      <div class="search-form__wrapper" :style="{ 'column-gap': `${gap}px` }">
        <div v-for="(comp, i) in comps" :key="i" class="search-form__item">
          <component
            :key="comp.type"
            :is="comp.loader"
            :form="form"
            :selectWidth="selectWidth"
            @search="handleSearch"
          />
        </div>

        <div class="search-form__item actions">
          <Button v-if="showSearch" type="primary" @click="$emit('search')"
            >查询</Button
          >
          <Button v-if="showReset" type="primary" @click="$emit('reset')"
            >重置</Button
          >
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const comps = [
  {
    type: "DataSet",
    loader: defineAsyncComponent({ loader: () => import("./DataSet.vue") }),
  },
  {
    type: "DataMeta",
    loader: defineAsyncComponent({ loader: () => import("./DataMeta.vue") }),
  },
  {
    type: "VerifyStatus",
    loader: defineAsyncComponent({
      loader: () => import("./VerifyStatus.vue"),
    }),
  },
  {
    type: "StandardStatus",
    loader: defineAsyncComponent({
      loader: () => import("./StandardStatus.vue"),
    }),
  },
];

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    include: {
      type: Array,
      default: () => comps.map((v) => v.type),
    },
    gap: {
      type: Number,
      default: 10,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    showReset: {
      type: Boolean,
      default: true,
    },
    selectWidth: {
      type: String,
      default: "200px",
    },
  },
  computed: {
    comps() {
      return comps.filter((v) => this.include.includes(v.type));
    },
  },
  methods: {
    handleSearch() {
      this.$emit("search");
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  &__wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;
  }

  &__item {
    // flex: 1;
    &.actions {
      display: flex;
      column-gap: 6px;
    }
  }
}

::v-deep {
  .ivu-form-item {
    display: flex;
    // gap: 5px;
    margin-right: 0;
    .ivu-form-item-label {
      white-space: nowrap;
    }
    .ivu-form-item-content {
      // flex: 1;
    }
    .ivu-select-selection,
    .ivu-input-wrapper {
      // width: 200px;
    }
  }
}
</style>
