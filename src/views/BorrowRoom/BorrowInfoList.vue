<template>
  <el-page-header content="借用记录" style="margin-bottom: 30px" @back="this.$router.push('/Login')"/>
  <el-card>
    <el-form label-width="120px">
      <el-form-item label="日期">
        <el-date-picker
            v-model="subForm.date"
            type="date"
            placeholder="请选择借用日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="getBorrowInfo"
            style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="时间">
        <el-select
            v-model="subForm.time"
            placeholder="请选择借用时间"
            style="width: 200px"
            @change="getBorrowInfo"
        >
          <el-option
              v-for="item in TimeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="教室">
        <el-select
            v-model="subForm.roomName"
            placeholder="请选择教室"
            style="width: 200px"
            @change="getBorrowInfo">
          <el-option
              v-for="item in Rooms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-form-item label="导入课表" v-show="userRole === 'admin'">
          <el-breadcrumb :separator-icon="ArrowRight" style="margin-right: 20px;">
            <el-date-picker v-model="this.startDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="学期开始日期"/>
          </el-breadcrumb>
          <el-upload :on-change="fileChange" :show-file-list="false" :auto-upload="false">
            <el-button type="warning">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-divider />
    <div style="margin-left:20px;margin-right:20px;padding-left: 70px;padding-top: 40px;padding-bottom: 30px" v-loading:loading>
      <el-table :data="borrowInfo" stripe  border :highlight-current-row="true" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="time" label="时间" width="120" />
        <el-table-column prop="roomName" label="教室名称" width="100" />
        <el-table-column prop="reason" label="用途" width="150"/>
        <el-table-column prop="name" label="借用人" />
        <el-table-column prop="applyDate" label="申请时间" width="180"/>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button type="danger" @click="cancel(scope.row.id)" v-show="userInfo.role === 'admin' || userInfo.username === scope.row.name">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="getBorrowInfo"
          @current-change="getBorrowInfo"
          v-model:current-page="subForm.pageNum"

          v-model:page-size="subForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import {ElMessage} from "element-plus";
let formData = new FormData;
export default {
  name: "BorrowInfoList",
  data(){
    return{
      loading:true,
      TimeOption:[],
      Rooms:[],

      userInfo:{
        userId:'',
        role:'',
        username:'',
        userDepart:'',
      },

      borrowInfo:[],

      subForm:{
        date:'',
        time:'',
        reason:'',
        userId:'',
        roomName:'',
        pageNum:1,
        pageSize: 30,
        total:0
      },

      startDate:null,
    }
  },
  mounted() {
    this.userInfo.role = window.sessionStorage.getItem("role");
    this.userInfo.userId = window.sessionStorage.getItem("userId");

    this.getBorrowInfo();
    this.getAllRooms();
    this.getAllTimeOptions();
  },
  methods:{
    getAllTimeOptions(){
      this.$http({
        url:'/timeOption/getAllTimeOption',
        method:'get',
      }).then(({data})=>{
        for(let i=0;i<data.list.length;i++){
          this.TimeOption.push({
            label:data.list[i].name,
            key:data.list[i].name,
            value:data.list[i].name
          })
        }
      })
    },
    getAllRooms(){
      this.$http({
        url:'/room/getAllRoom',
        method:'get',
      }).then(({data})=>{
        for(let i=0;i<data.list.length;i++){
          this.Rooms.push({
            label:data.list[i].name,
            key:data.list[i].name,
            value:data.list[i].name
          })
        }
      })
    },

    getBorrowInfo(){
      this.loading = true;
      this.$http({
        method:'post',
        url: '/borrowInfo/queryRBIByOptions',
        data:this.subForm
      }).then(res =>{
        console.log(res);
        if (res.data.code !== 200){
          ElMessage({
            message: '教室信息获取失败，请联系工具人QQ3231977651',
            type: 'error',
          })
        }else {
          ElMessage({
            message: '借用信息获取成功',
            type: 'success',
          })

          this.borrowInfo = res.data.RBI;
          this.subForm.total = res.data.total;
        }
        this.loading = false;
      })
    },
    cancel(id){
      this.$http({
        method:'get',
        url: '/borrowInfo/cancel?id=' + parseInt(id),
      }).then(res =>{
        ElMessage({
          message: '撤销成功',
          type: 'success',
        })
        this.getBorrowInfo();
      })
    },

    fileChange(files, fileList) {
      formData.append('file', files.raw)
      files = null;
      this.importTimeTable();
    },

    importTimeTable(){
      if (this.startDate === null || this.subForm.roomId === ''){
        alert("请选择日期和教室");
        return;
      }

      formData.append("startDate",this.startDate);
      formData.append("roomId",this.subForm.roomId);

      this.$http({
        method: 'post',
        url: '/file/importTimeTable',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            title: '上传成功',
            message: '',
            type: 'success'
          });
          this.getBorrowInfo();
        } else {
          this.$notify({
            title: '上传失败',
            message: res.data.msg,
            type: 'warning'
          });
        }
        formData = null;
        formData = new FormData();
      })
    },
  }
}
</script>

<style scoped>

</style>
