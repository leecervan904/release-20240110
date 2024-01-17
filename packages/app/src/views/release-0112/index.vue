<template>
  <div>
    <BaseModal
      v-model="addVisible"
      title="新建目录"
      @on-cancel="handleCancel"
      :mask-closable="false"
      width="800"
      max-height="800"
    >
      <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="120">
        <FormItem label="目录名称" prop="name">
          <Input
            placeholder="请输入目录名称"
            :label-width="150"
            v-model="addForm.name"
          />
        </FormItem>
      </Form>
      <div slot="footer" style="text-align: center">
        <Button @click="handleCancel">取消</Button>
        <Button
          type="primary"
          @click="handleAddCatalog"
          :loading="addLoading"
          style="margin-left: 20px"
        >
          确定
        </Button>
      </div>
    </BaseModal>

    <h2>release 0112</h2>

    <div style="height: 600px">
      <DefaultLayout>
        <template #sidebar>
          <DirectoryTree @select="handleSelectDir" />
        </template>

        <template #search>
          <SearchForm
            :form="searchForm"
            @search="handleSearch"
            @reset="handleReset"
          />
        </template>

        <ButtonGroup />
        <CommonTable
          :columns="columns"
          :data="tableData"
          :pageInfo.sync="pageInfo"
          :total="total"
          border
          stripe
          @get-data="handleGetData"
        >
          <template #action>
            <div style="display: flex; gap: 10px; justify-content: center">
              <Button type="primary" size="small" @click="addTree"
                >新建树目录</Button
              >
              <Button type="primary" size="small">删除</Button>
              <Button type="primary" size="small">引用详情</Button>
              <Button type="primary" size="small">版本管理</Button>
            </div>
          </template>
        </CommonTable>

        <VersionDiff />
      </DefaultLayout>
    </div>
  </div>
</template>

<script>
import BaseModal from "@/components/BaseModal";
import SearchForm from "./components/SearchForm";
import DirectoryTree from "./components/DirectoryTree";
import ButtonGroup from "./components/ButtonGroup";
import CommonTable from "./components/CommonTable";
import VersionDiff from "./components/VersionDiff";
import DefaultLayout from "./layouts";

const defaultForm = {
  name: "",
  dataSet: "",
  dataMeta: "",
  verifyStatus: "all",
  standardStatus: "all",
};

function sleep(ms = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function mockData({ page, pageSize }) {
  const total = 99;
  const cnt =
    (page - 1) * pageSize >= total
      ? 0
      : Math.min(pageSize, total - (page - 1) * pageSize);

  // await sleep(1000)

  return {
    data: new Array(cnt).fill(0).map((_, i) => ({
      a: (page - 1) * pageSize + i + 1,
      b: "1",
      c: "1",
      d: "1",
      e: "1",
      f: "1",
      g: "1",
      h: "1",
      i: "1",
      j: "1",
    })),
    pageInfo: {
      page,
      pageSize,
      total,
    },
  };
}

export default {
  components: {
    SearchForm,
    DirectoryTree,
    ButtonGroup,
    CommonTable,
    VersionDiff,
    DefaultLayout,
    BaseModal,
  },
  data() {
    return {
      nodeData: null,
      addForm: {
        name: "",
      },
      addRules: {
        name: {
          required: true,
          message: "请输入目录名称",
          trigger: "blur,change",
        },
      },
      addVisible: false,
      addLoading: false,
      tableData: [],
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "标准代码名称", key: "a", align: "center", width: 100 },
        { title: "标准代码编号", key: "b", align: "center", width: 100 },
        { title: "英文名称", key: "c", align: "center", width: 100 },
        { title: "关联数据元", key: "d", align: "center", width: 100 },
        { title: "参考标准文档", key: "e", align: "center", width: 100 },
        { title: "参考标准编号", key: "f", align: "center", width: 100 },
        { title: "标准状态", key: "g", align: "center", width: 100 },
        { title: "最新审核状态", key: "h", align: "center", width: 100 },
        { title: "创建人", key: "i", align: "center", width: 100 },
        { title: "创建时间", key: "j", align: "center", width: 100 },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 300,
          fixed: "right",
        },
      ],
      pageInfo: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
      searchForm: { ...defaultForm },
    };
  },
  mounted() {
    this.handleGetData();
  },
  methods: {
    handleCancel() {
      this.$refs["addForm"].resetFields();
      this.addVisible = false;
    },
    addTree() {
      this.addVisible = true;
    },
    handleAddCatalog() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          let params = {
            moduleId: 7,
            name: this.addForm.name,
            parentId: this.nodeData.id || "0",
            createTenancyId: localStorage.tenancyId,
            test1: localStorage.projectId
              ? Number(localStorage.projectId)
              : 222,
          };
          // addTreeData(params).then(res => {
          //   if (res.data.code === 200) {
          //     this.$Message.success('新增成功！')
          //     this.$emit('success')
          //     this.handleCancel()
          //   } else {
          //     this.$Message.error(res.data.message)
          //   }
          // })
        } else {
          //
        }
      });
    },
    handleSearch(form) {
      console.log("search", { ...form });
      // 重置分页
      this.pageInfo.page = 1;

      this.handleGetData();
    },
    handleReset() {
      console.log("reset");
      // 重置表单
      this.searchForm = { ...defaultForm };
      // 重置分页
      this.pageInfo.page = 1;

      this.handleGetData();
    },
    async handleGetData(incomingPageInfo) {
      const { data, pageInfo } = await mockData({
        ...this.pageInfo,
        ...incomingPageInfo,
      });

      this.tableData = data;
      this.total = pageInfo.total;
    },
    handleSelectDir(item) {
      // 选中左侧树，考虑请求右边的数据
      console.log("选择树节点: ", item);
    },
  },
};
</script>
