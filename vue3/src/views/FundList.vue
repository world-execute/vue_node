<template>
  <div class="fillContainer">
    <div>
      <el-form inline ref="add_data" style="margin-right: 10px">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" incn="view" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  <div class="table_container">
    <el-table
      v-if="tableData.length >0"
      :data="tableData"
      max-height="450"
      border
      style="width: 100%">
    <el-table-column
        label="创建时间"
        width="250"
        align="center"
        prop="date">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="收支类型"
        width="150"
        align="center"
        prop="type">
    </el-table-column>
    <el-table-column
        label="收支描述"
        width="150"
        align="center"
        prop="describe">
    </el-table-column>
    <el-table-column
        label="收入"
        width="100"
        align="center"
        prop="income">
      <template slot-scope="scope">
        <span style="color: #00d053">{{ scope.row.income}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="支出"
        width="100"
        align="center"
        prop="expend">
      <template slot-scope="scope">
        <span style="color: #f56767">{{ scope.row.expend}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="账户现金"
        width="120"
        align="center"
        prop="cash">
      <template slot-scope="scope">
        <span style="color: #67baf5">{{ scope.row.cash}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="备注"
        width="220"
        align="center"
        prop="remark">
    </el-table-column>
      <el-table-column label="操作" prop="operation" align="center" width="230">
        <template slot-scope="scope">
          <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
    <!--分页-->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

  </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
  name: "FundList",
  data(){
    return{
      paginations:{
        page_index:1, //当前位于哪一页
        total:0, // 数据总数
        page_size: 5, //每页显示多少条
        page_sizes:[5,10,15,20], //每页显示多少
        layout:'total,sizes,prev,pager,next,jumper'  // 翻页属性
      },
      tableData: [],
      allTableData:[],
      dialog:{
        show:false,
        title:'',
        option:'edit'
      },
      formData:{
        type:'',
        describe:'',
        income:'',
        expend:'',
        cash:'',
        remark:'',
        id:''
      }
    }
  },
  created() {
    this.getProfile();
  },
  methods:{
    setPaginations(){
      // 分页属性设置
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item,index) =>{
        return index < this.paginations.page_size
      })
    },
    getProfile(){
      this.$axios.get('/api/profile')
      .then(value => {
        // console.log(value.data.data)
        this.allTableData = value.data.data
        // 设置分页数据
        this.setPaginations()
        })
      .catch(reason => {
        console.log(reason)
      })
    },
    handleEdit(index,row){
      // 编辑
      // console.log(this.dialog)
      this.dialog = {
        show:true,
        title: '修改资金信息',
        option:'edit'
      }
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id:row._id
      }
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((value) => {
         return this.$axios.delete(`/api/profile/delete/${row._id}`)
      }).then(()=>{
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getProfile()
      },() => {
        this.$message({
          type: 'error',
          message: '删除失败!'
        });
      })
    },
    handleAdd(){
      this.dialog = {
        show:true,
        title: '添加资金信息',
        option:'add'
      }
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: ''
      }
    },
    handleSizeChange(page_size){
      // console.log(page_size)
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size
      this.tableData = this.allTableData.filter((item,index) =>{
        return index < page_size
      })

    },
    handleCurrentChange(page){
      // console.log(page)
      // 获取当前页
      let index = this.paginations.page_size * (page-1)
      // 数据的总数
      let nums = this.paginations.page_size * page
      // 容器
      let tables = []
      for(let i = index;i<nums;i++){
        if(this.allTableData[i]){
          tables.push(this.allTableData[i])
        }
        this.tableData = tables
      }
    }
  },
  components:{
    Dialog
  }

}
</script>

<style scoped>
.fillContainer{
  width: 100%;
  height: 100%;
  padding-top:10px;
  box-sizing: border-box;
}
.btnRight{
  float: right;

}
.table_container{
  margin-left: 40px;
}
.pagination{
  text-align: right;
  margin-top: 10px;
  margin-right: 20px;
}
</style>
