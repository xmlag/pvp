<template>
  <div>
    <h1>List</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250">
      </el-table-column>
      <!-- <el-table-column prop="categories.name" label="分类">
      </el-table-column> -->
      <el-table-column prop="title" label="文章标题"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items:[]
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('/rest/articles')
      this.items = res.data
    },
    edit(id){
      this.$router.push(`/articles/edit/${id}`)
    },
    async remove(row){
      this.$confirm(`是否删除“${row.title}”?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        })
    }
  },
  created(){
    this.fetch()
  }
}
</script>