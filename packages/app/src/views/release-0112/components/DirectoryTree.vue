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

      <div class="directory-tree__search">
        <Input v-model="search" placeholder="请输入目录名称" />
      </div>

      <div class="directory-tree__tree">
        <!-- <Tree ref="refTree" :data="data1" node-key="title" @current-change="handleCurrentChange" @on-select-change="$emit('select', $event)"></Tree> -->

        <el-tree
          ref="refTree"
          :data="data1"
          default-expand-all
          node-key="title"
          @current-change="handleCurrentChange"
          @on-select-change="$emit('select', $event)"
        ></el-tree>
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
      data1: [
        {
          label: "parent 1",
          expand: true,
          children: [
            {
              label: "parent 1-1",
              expand: true,
              children: [
                {
                  label: "leaf 1-1-1",
                },
                {
                  label: "leaf 1-1-2",
                },
              ],
            },
            {
              label: "parent 1-2",
              expand: true,
              children: [
                {
                  label: "leaf 1-2-1",
                },
                {
                  label: "leaf 1-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs);
      this.$refs.refTree.setCurrentKey("parent 1");
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
