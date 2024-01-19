<template>
  <div class="directory-tree">
    <div class="directory-tree__title">
      <span class="directory-tree__title-left">{{ title }}</span>
      <span class="directory-tree__title-right" @click="handleAdd">
        <Icon type="md-add" />
      </span>
    </div>

    <div class="directory-tree__wrapper">
      <div class="directory-tree__status">全部资源 ({{ 2510 }})</div>

      <div class="directory-tree__tree">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  data() {
    return {
      search: "",
      data1: [],
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs);
      // this.$refs.refTree.setCurrentKey("parent 1");
    }, 1000);
  },
  methods: {
    handleAdd() {},
    handleCurrentChange(node) {
      console.log("current change", node);
    },
  },
};
</script>

<style lang="less">
.directory-tree {
  border: 1px solid #ccc;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    background-color: #eee;
    border-bottom: 1px solid #ccc;
    &-right {
      font-size: 20px;
    }
  }
  &__wrapper {
    padding: 5px 10px;
    .directory-tree__status {
      margin: 10px 0;
      padding: 5px;
      text-align: center;
      color: #fff;
      background-color: #2dc3e8;
      border-radius: 5px;
    }
    .directory-tree__search {
      margin: 10px 0;
    }
  }
}
</style>
