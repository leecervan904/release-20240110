<template>
  <div class="search-tree">
    <Input
      v-model="filterText"
      clearable
      placeholder="输入关键字进行过滤"
    ></Input>
    <tree-skeleton
      v-if="showSkeleton"
      class="search-tree__skeleton"
    ></tree-skeleton>
    <el-tree
      v-else
      ref="tree"
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :highlight-current="true"
      default-expand-all
      :indent="25"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #default="{ node, data }">
        <div
          class="tree"
          @mouseover="showButtons(node.id)"
          @mouseout="hiddenButton(node.id)"
        >
          <div class="tree-left">
            <span class="tree-left__icon">
              <span class="tree-left__icon-collapse">
                <i v-if="!data.children || !data.children.length"></i>
                <i
                  v-else-if="node.expanded"
                  class="iconfont icon-shu-yizhankai"
                ></i>
                <i v-else class="iconfont icon-shu-kezhankai"></i>
              </span>
              <span>
                <slot name="icon" :node="node" :data="data"></slot>
              </span>
            </span>
            <el-tooltip
              :content="subText(data, true)"
              placement="bottom"
              effect="light"
              transition="none"
              :open-delay="500"
            >
              <div class="tree-left__text">
                <span class="tree-left__text-main">
                  {{ mainText ? mainText(node, data) : data[labelField] }}
                </span>
                <span class="tree-left__text-sub">
                  {{ subText(data) }}
                </span>
              </div>
            </el-tooltip>
          </div>
          <div
            class="tree-right"
            :class="'tree-hidden tree-more-button-' + node.id"
          >
            <slot name="action" :node="node" :data="data"></slot>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "SearchTree",
  props: {
    labelField: {
      type: String,
      default: "label",
    },
    mainText: {
      type: Function,
    },
    subText: {
      type: Function, // tootlip文本内容处理
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filterText: "",
      showSkeleton: false,
    };
  },
  computed: {
    defaultProps() {
      return {
        children: "children",
        label: this.labelField,
      };
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    setDefaultNode() {
      console.log("111");
      if (this.data.length) {
        console.log("222");
        this.$refs.tree.setCurrentNode(this.data[0]);
      }
    },
    hiddenButton(ele) {
      const treeNode = document.getElementsByClassName(
        "tree-more-button-" + ele
      );
      treeNode[0].style.display = "none";
    },
    showButtons(ele) {
      const treeNode = document.getElementsByClassName(
        "tree-more-button-" + ele
      );
      treeNode[0].style.display = "block";
    },
    getCurrentNode() {},
    handleCommand() {},
    filterNode(value, data) {
      if (!value) return true;
      return data[this.labelField].indexOf(value) !== -1;
    },
    getContent() {},
    changeItem() {},
  },
};
</script>

<style lang="less" scoped>
.search-tree {
  display: flex;
  flex-direction: column;
  gap: 25px;

  &__skeleton {
    flex: 1;
  }
}

.tree {
  display: flex;
  align-items: center;
  width: 100%;

  &-left {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden; // 确定内容宽度 不能少 少了内容区域宽度会超出
    flex: 1;

    &__icon {
      display: flex;
      gap: 15px;

      &-collapse {
        font-size: 12px;
      }
    }

    &__text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &-main {
      }

      &-sub {
        margin-left: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #989898;
      }
    }
  }

  &-right {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 15px;
  }

  &-hidden {
    display: none;
  }
}

::v-deep {
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    color: black;

    .active-text {
      color: rgb(72, 122, 233);
    }
  }
}
</style>
