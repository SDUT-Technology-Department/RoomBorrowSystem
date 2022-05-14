<template>
  <el-card>
    <el-form label-width="120px">
      <el-form-item label="日期">
        <el-date-picker
            v-model="QueryForm.date"
            type="date"
            placeholder="请选择借用日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            @change="getRoom"
            style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="时间">
        <el-select
            v-model="QueryForm.timeId"

            placeholder="请选择借用时间"
            style="width: 200px"
            @change="getRoom"
        >
          <el-option
              v-for="item in TimeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="getRoom"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="多媒体">
        <el-switch
            v-model="QueryForm.isMedia"
            class="ml-2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
        />
      </el-form-item>
      <el-form-item label="会议室" @click="messageAlert">
        <el-switch
            v-model="QueryForm.isSpecial"
            class="ml-2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="getRoom"
            disabled
        />
      </el-form-item>
    </el-form>
    <el-divider />
    <div style="margin-left:20px;margin-right:20px;padding-left: 70px;padding-top: 40px;padding-bottom: 30px">

      <el-space :size="45" wrap>
        <div v-for="(item,i) in Rooms">
          <el-card :body-style="{ padding: '0px' }" style="height: 235px;width: 200px;">
            <div style="height: 110px;width: 200px;">
              <el-image :src="item.img" />
            </div>

            <div style="padding: 14px">
              <div style="margin-bottom: 10px">{{ item.roomName }}</div>
              <div style="width: 200px;height: 32px">
                  <el-space wrap>
                    <el-tag v-show="item.isPower === 1">电源</el-tag>
                    <el-tag v-show="item.isMedia === 1">多媒体</el-tag>
                    <el-tag v-show="item.isSpecial === 1">会议室</el-tag>
                  </el-space>
              </div>
            </div>
            <el-button type="primary" @click="preBorrow(item.roomId,item.roomName)" style="width: 100%">借用该教室</el-button>
          </el-card>
        </div>
      </el-space>

    </div>
  </el-card>


  <el-dialog
      v-model="confirmDialogVisible"
      title="请确认您的借用信息"
      width="30%"
  >
    <el-form label-width="120px">
      <el-form-item label="教室">
        {{ QueryForm.roomName }}
      </el-form-item>
      <el-form-item label="借用日期">
        {{ QueryForm.date }}
      </el-form-item>
      <el-form-item label="借用时间">
        <el-tag>{{ QueryForm.timeName }}</el-tag>
      </el-form-item>
      <el-form-item label="多媒体">
        <el-tag v-show="QueryForm.isMedia">
          是
        </el-tag>
        <el-tag type="danger" v-show="!QueryForm.isMedia">
          否
        </el-tag>
      </el-form-item>
      <el-form-item label="会议室">
        <el-tag v-show="QueryForm.isSpecial">
          是
        </el-tag>
        <el-tag type="danger" v-show="!QueryForm.isSpecial">
          否
        </el-tag>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmBorrow">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "BorrowRoom",
  data(){
    return{
      TimeOption:[
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
      },],

      Rooms:[],

      QueryForm:{
        roomId:'',
        roomName:'',
        date:'',
        timeId:'',
        timeName:'',
        isMedia:true,
        isSpecial:false,
        applyTime:'',
        reason:'',
        user:'',
      },

      confirmDialogVisible:false,
    }
  },
  mounted() {
    this.getAllRoom();
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
        }else {
          ElMessage({
            message: '教室信息获取成功',
            type: 'success',
          })

          this.Rooms = res.data.data;
        }
      })
  },

    getRoom(){
      if (this.QueryForm.date!=='' && this.QueryForm.timeId!==''){
        this.$http({
          method:'post',
          url:'/room/searchRoomForBorrow',
          data:this.QueryForm
        }).then(res =>{
          if (res.data.code !== 200){
            ElMessage({
              message: '教室信息获取失败，请联系工具人QQ3231977651',
              type: 'error',
            })
          }else {
            ElMessage({
              message: '教室信息获取成功',
              type: 'success',
            })

            this.Rooms = res.data.data;
          }
        })
      }

    },

    preBorrow(roomId,roomName){
      if(this.QueryForm.date === '' || this.QueryForm.timeId.length === 0){
        ElMessage({
          message: '请先选择欲借用的日期和时间段',
          type: 'warning',
        })
        return;
      }

      let timeName;
      switch (this.QueryForm.timeId){
        case 1:timeName = '第一、二节';break;
        case 2:timeName = '第三、四节';break;
        case 3:timeName = '第五、六节';break;
        case 4:timeName = '第七、八节';break;
        case 5:timeName = '第九、十节';break;
      }
      this.QueryForm.timeName = timeName;

      this.QueryForm.roomId = roomId;
      this.QueryForm.roomName = roomName;
      this.confirmDialogVisible = true;
    },

    messageAlert(){
      ElMessageBox.confirm(
          '如需多媒体卡请前往9教105领取',
          '登记成功',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'success',
          }
      )
          .then(() => {

          })
          .catch(() => {

          })
    },

    confirmBorrow(){
      this.confirmDialogVisible = false;

      let date= new Date();

      let year = new Date().getFullYear();

      let month = new Date().getMonth() +1;

      let day = new Date().getDate();

      let hour = new Date().getHours();

      let minute = new Date().getMinutes();

      let second = new Date().getSeconds();
      this.QueryForm.applyTime = year + '-' + month + '-' + day

      this.$http({
        method:'post',
        url:'/room/borrow',
        data:this.QueryForm
      }).then(res =>{
          if (res.data.code !== 200){
            ElMessage({
              message: '登记失败，' + res.data.msg,
              type: 'warning',
            })
          }else {
            this.messageAlert();
            this.getAllRoom();
          }
      })
    }
  }
}
</script>

<style scoped>

</style>