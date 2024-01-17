<!--
1 搜索页面 分为左边 右边 右边又是(上下布局) 左边可能没有
-->
<template>
  <div class="layout">
    <div class="layout-sidebar" v-if="$slots.sidebar">
      <slot name="sidebar"></slot>
    </div>

    <div class="layout-content">
      <div class="layout-content__search">
        <slot name="search"></slot>
      </div>
      <div class="layout-content__main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  gap: 10px;
  height: 100%;
  background: rgb(245, 246, 249);
  padding: 10px;

  &-sidebar {
    overflow: auto;
    width: 300px;
    height: 100%;
    background: rgb(255, 255, 255);
    padding: 10px;
  }
  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 10px;
    overflow: auto;

    &__search {
      padding: 20px 35px 0 35px;
      background: rgb(255, 255, 255);
    }
    &__main {
      flex: 1;
    }
  }
}
</style>
