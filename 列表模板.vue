<template>
  <div class="content">
    <el-form inline>
      <el-form-item label="选择框">
        <el-select placeholder="所有类型" v-model="params.type">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入框">
        <el-input
          placeholder="供货路线编号/名称/上报人"
          v-model="params.keyword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary">+新建路线</el-button>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      :row-key="getRowKeys"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column label="ID" prop="id" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="del(scope.row.id)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="turner">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40, 100]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        type: "",
        keyword: "",
        page: 1,
        size: 10,
      },
      typeList: [
        {
          value: 0,
          label: "类型",
        },
      ],
      total: 0,
      loading: false,
      tableData: [
        {
          id: 0,
        },
      ],
      checkedList: [], //选中行
    };
  },
  created() {
    this.search();
  },
  methods: {
    // 重置
    reset() {
      this.params = {};
      this.search();
    },
    // 搜索
    search() {
      this.params.page = 1;
      this.getTableList();
    },
    // 获取列表
    getTableList() {
      this.loading = true;
    // 替换自己的获取列表方法
    setTimeout(()=>{
      this.tableData = Array.from({ length: 10 }, (_, index) => ({
        id: 10 * (this.params.page - 1) + index,
      }));
      this.total = 100;
      this.loading = false;
    },200)
      
    },
    //操作
    del() {},
    //页面大小变化
    handleSizeChange(val) {
      this.params.size = val;
      this.getTableList();
    },
    //页码变化
    handleCurrentChange(val) {
      this.params.page = val;
      this.getTableList();
    },
    //选择保持
    handleSelectionChange(list) {
      console.log(list);
      this.checkedList = list;
    },
    //选择保持
    getRowKeys(row) {
      return row.id;//id替换成行的唯一值
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding: 24px;
  .turner {
    display: flex;
    justify-content: right;
    margin-top: 20px;
  }
}
</style>
