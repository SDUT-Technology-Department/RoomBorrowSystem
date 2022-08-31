<template>
  <el-page-header content="借用记录" style="margin-bottom: 30px" @back="this.$router.push('/Login')"/>
  <el-card>
    <el-form label-width="120px">
      <el-form-item label="日期">
        <el-date-picker
            v-model="screenForm.date"
            type="date"
            placeholder="请选择借用日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            @change="getBorrowInfo"
            style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="时间">
        <el-select
            v-model="screenForm.timeId"

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
            v-model="screenForm.roomId"

            placeholder="请选择教室"
            style="width: 200px"
            @change="getBorrowInfo">
          <el-option
              v-for="item in RoomOptions"
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
    <div style="margin-left:20px;margin-right:20px;padding-left: 70px;padding-top: 40px;padding-bottom: 30px">
      <el-table :data="borrowInfo" stripe  border :highlight-current-row="true" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="timeName" label="时间" width="120" />
        <el-table-column prop="roomName" label="教室名称" width="100" />
        <el-table-column prop="reason" label="用途" width="150"/>
        <el-table-column prop="username" label="借用人" />
        <el-table-column prop="userDepart" label="所属部门/班级" width="180"/>
        <el-table-column prop="applyTime" label="申请时间" width="180"/>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button type="danger" @click="cancel(scope.row.id)" v-show="userRole === 'admin' || cancelForm.userId === scope.row.id">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>

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
      TimeOption:[
        { label:'不限',
          key:'不限',
          value:0
        },
        { label:'第一、二节',
          key:'第一、二节',
          value:1
        },{
          label:'第三、四节',
          key:'第三、四节',
          value:2
        },{
          label:'第五、六节',
          key:'第五、六节',
          value:3
        },{
          label:'第七、八节',
          key:'第七、八节',
          value:4
        },{
          label:'第九、十节',
          key:'第九、十节',
          value:5
        },
      ],
      ReasonOptions:[
        {
        label:'会议',
        key:'会议',
        value:'会议'
  },{
      label:'上课',
          key:'上课',
          value:'上课'
    },{
      label:'二课活动',
          key:'二课活动',
          value:'二课活动'
    },{
      label:'团日活动',
          key:'团日活动',
          value:'团日活动'
    }
    ],
      RoomOptions:[{
        label:'全部',
        key:'全部',
        value:''
      }],

      userRole:'',

      borrowInfo:[],

      screenForm:{
        date:'',
        timeId:0,
        reason:'',
        roomId:'',
        userId:'',
        roomName:''
      },

      cancelForm:{
        roomId:'',
        userId:'',
        timeId:'',
        date:'',
      },

      startDate:null,
    }
  },
  mounted() {
    this.getAllRoom();
    if (window.sessionStorage.getItem('role')!==''){
      this.userRole = window.sessionStorage.getItem('role');
    }
    if (window.sessionStorage.getItem('userId')!==''){
      this.cancelForm.userId = window.sessionStorage.getItem('userId');
    }
    this.getBorrowInfo();
  },
  methods:{
    getAllRoom(){
      this.RoomOptions = [];
      this.$http({
        method:'get',
        url:'/room/getAllRoom',
      }).then(res =>{
        console.log(res);
        if (res.data.code !== 200){
          ElMessage({
            message: '教室信息获取失败，请联系工具人QQ3231977651',
            type: 'error',
          })
          return;
        }

        for (let i=0;i<res.data.list.length;i++){
          this.RoomOptions.push({
            key:res.data.list[i].roomName,
            value: res.data.list[i].id,
            label: res.data.list[i].roomName,
          })
        }
      })
    },
    getBorrowInfo(){

      this.$http({
        method:'post',
        url: '/room/queryRBIByOptions',
        data:this.screenForm
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

          for(let i=0;i<this.borrowInfo.length;i++){
            this.borrowInfo[i].date = this.borrowInfo[i].date.substring(0,10);
          }
        }
      })
    },
    cancel(id){
      this.$http({
        method:'get',
        url: '/room/cancel?id=' + parseInt(id),
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
      if (this.startDate === null || this.screenForm.roomId === ''){
        alert("请选择日期和教室");
        return;
      }

      formData.append("startDate",this.startDate);
      formData.append("roomId",this.screenForm.roomId);

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
