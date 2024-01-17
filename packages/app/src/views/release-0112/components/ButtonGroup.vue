<template>
  <div class="button-group">
    <Button type="primary" @click="handleCreate">新增</Button>
    <Button type="primary" @click="$emit('lib-import')">图书馆引入</Button>
    <Button type="primary" @click="$emit('batch-delete')">批量删除</Button>
    <Button type="primary" @click="$emit('import')">导入</Button>
    <Button type="primary" @click="$emit('download-template')"
      >下载导入模板</Button
    >

    <Dropdown>
      <a href="javascript:void(0)">
        <Icon type="ios-more" />
        更多功能
      </a>

      <DropdownMenu slot="list">
        <DropdownItem>
          <Button type="primary" long @click="$emit('export')">导出</Button>
        </DropdownItem>
        <DropdownItem>
          <Button type="primary" long @click="$emit('batch-verify')"
            >批量送审</Button
          >
        </DropdownItem>
        <DropdownItem>
          <Button type="primary" long @click="$emit('start')">启用</Button>
        </DropdownItem>
        <DropdownItem>
          <Button type="primary" long @click="$emit('stop')">停用</Button>
        </DropdownItem>
        <DropdownItem>
          <Button type="primary" long @click="$emit('modify')">变更</Button>
        </DropdownItem>
        <DropdownItem>
          <Button type="primary" long @click="$emit('change-dir')"
            >移动目录</Button
          >
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <!-- Modal -->
    <Modal v-model="visible" title="Common Modal dialog box title">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleCreate() {
      this.visible = true;

      this.$emit("create");
    },
  },
};
</script>

<style lang="less" scoped>
.button-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
