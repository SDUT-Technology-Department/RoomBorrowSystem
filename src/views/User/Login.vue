<template>
  <div class="bac">
    <div class="loginBox">
      <p>账号密码登陆</p>
      <el-space direction="vertical" :size="30">
        <el-input v-model="subform.userId" placeholder="学号" clearable style="width: 240px;height: 40px;"/>
        <el-input v-model="subform.pwd" placeholder="密码" type="password" style="width: 240px;height: 40px;"/>
      </el-space>
      <el-button type="primary" @click="login" style="width: 240px;height: 40px;font-size: 14px">登陆</el-button>
    </div>
  </div>
</template>

<script>
import { Avatar, Key } from '@element-plus/icons-vue'
export default {
  name: 'Login',
  data(){
    return{
      subform:{
        userId:'',
        pwd:'',
      }
    }
  },
  methods:{
    login(){
      this.$http({
        method:'post',
        url:'/user/login',
        data:this.subform
      }).then(res =>{
        console.log(res);
      })
    }

  },
  components:{
    Avatar,
    Key
  }

}
</script>

<style scoped>
.bac{
  width: 1440px;
  height: 900px;
  background: url("../../assets/img/loginBac.png");
}

.loginBox{
  width: 250px;
  height: 320px;
  position: absolute;
  left: 955px;
  top: 320px;
}
</style>
