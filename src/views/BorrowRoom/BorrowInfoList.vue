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
<!--      <el-form-item label="原因">-->
<!--        <el-select-->
<!--            v-model="screenForm.reason"-->

<!--            placeholder="请选择借用原因"-->
<!--            style="width: 200px"-->
<!--            @change="getBorrowInfo">-->
<!--          <el-option-->
<!--              v-for="item in ReasonOptions"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--              @change="getBorrowInfo"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
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
      </el-form-item>
<!--      <el-form-item label="用户">-->
<!--        <el-input v-model="screenForm.userId" style="width: 200px" @change="getBorrowInfo"/>-->
<!--      </el-form-item>-->
    </el-form>
    <el-divider />
    <div style="margin-left:20px;margin-right:20px;padding-left: 70px;padding-top: 40px;padding-bottom: 30px">

      <el-table :data="borrowInfo" stripe  border :highlight-current-row="true" style="width: 100%">
        <el-table-column prop="borrowDate" label="日期" width="120" />
        <el-table-column prop="borrowTimeName" label="时间" width="120" />
        <el-table-column prop="borrowRoomName" label="教室名称" width="100" />
        <el-table-column prop="borrowReason" label="用途" width="150"/>
        <el-table-column prop="username" label="借用人" />
        <el-table-column prop="uclass" label="所属部门/班级" width="180"/>
        <el-table-column prop="applyTime" label="申请时间" width="180"/>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button type="danger" @click="cancel(scope.row)" v-show="userRole === 'admin' || cancelForm.userId === scope.row.borrowUserId">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </el-card>
</template>

<script>
import {ElMessage} from "element-plus";

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
        userId:''
      },

      cancelForm:{
        roomId:'',
        userId:'',
        timeId:'',
        date:'',
      }
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
      this.$http({
        method:'get',
        url:'/room/getAllRoom',
      }).then(res =>{
        if (res.data.code !== 200){
          ElMessage({
            message: '教室信息获取失败，请联系工具人QQ3231977651',
            type: 'error',
          })
          return;
        }

        for (let i=0;i<res.data.data.length;i++){
          this.RoomOptions.push({
            key:res.data.data[i].roomName,
            value: res.data.data[i].roomId,
            label: res.data.data[i].roomName,
          })
        }
      })
    },
    getBorrowInfo(){
       let path = null;
      /*if (this.screenForm.roomId === '0'){
        path = '/room/getAllRBI'
      }else {
        path = '/room/searchBorrowedInfoByOptions'
      }*/
      path = '/room/searchBorrowedInfoByOptions'
      this.$http({
        method:'post',
        url: path,
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

          this.borrowInfo = res.data.data;
        }
      })
    },

    cancel(item){
      console.log(item)
      this.cancelForm.date = item.borrowDate;
      if (this.cancelForm.userId === ''){
        this.cancelForm.userId = item.borrowUserId;
      }
      this.cancelForm.timeId = item.borrowTimeId;
      this.cancelForm.roomId = item.borrowRoomId;
      console.log(this.cancelForm);

      this.$http({
        method:'post',
        url: '/room/cancel',
        data:this.cancelForm
      }).then(res =>{
        console.log(res);
        ElMessage({
          message: '借用已取消',
          type: 'success',
        })
        this.getBorrowInfo();
      })
    }
  }
}
</script>

<style scoped>

</style>