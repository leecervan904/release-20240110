<template>
  <div class="custom-table">
    <div class="custom-table__content">
      <Table
        width="100%"
        ref="refTable"
        border
        stripe
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-for="(slot, name) in $scopedSlots" #[name]="scope">
          <slot :name="name" v-bind="{ ...scope }" />
        </template>
      </Table>
    </div>

    <div v-if="showPagination" class="custom-table__pagination">
      <Page
        :total="total"
        :current.sync="pageInfo.page"
        :page-size.sync="pageInfo.pageSize"
        show-total
        show-sizer
        show-elevator
        @on-change="handChangePage"
        @on-page-size-change="handleChangePageSize"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  inheritAttrs: false,
  props: {
    pageInfo: {
      type: Object,
      default: () => ({
        page: 1,
        pageSize: 10,
      }),
    },

    total: {
      type: Number,
      default: 0,
    },

    showPagination: {
      type: Boolean,
      default: true,
    },
  },

  // emits: ['get-data'],

  methods: {
    handChangePage(page) {
      this.pageInfo.page = page;
      this.$emit("get-data", this.pageInfo);
    },

    handleChangePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize;
      this.$emit("get-data", this.pageInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.custom-table {
  &__pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
