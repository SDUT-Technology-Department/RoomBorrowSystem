<template>
  <div class="background">
    <el-container>
      <el-aside width="200px">
        <div style="height: 100%;background-color: #334154">
          <el-menu
              active-text-color="#1989FA"
              background-color="#334154"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              :router="true">
            <div style="height: 70px;width: 100%;padding-top: 20px">
<!--              <img src="../assets/img/logoW.png" style="height: 60%;width: 80%; margin-left: 20px;margin-top: 5px" alt="">-->
            </div>
            <el-menu-item index="/BorrowRoom">教室借用</el-menu-item>
            <el-menu-item index="/BorrowInfoList">教室借用记录查询</el-menu-item>
            <el-menu-item index="/UserManage" v-show="userInfo.role === 'admin'">用户管理</el-menu-item>
            <el-menu-item index="/Admit" v-show="userInfo.role === 'admin'">借用审核</el-menu-item>
            <el-menu-item index="/RoomTimeAndReasonManage" v-show="userInfo.role === 'admin'">系统管理</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>

  <el-dialog
      v-model="Visable"
      title="使用说明"
      width="60%"
  >
    <div>
      <!-- saved from url=(0061)https://s12.aconvert.com/convert/p3r68-cdx67/a1hgn-q3l9m.html
      -->
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="Content-Style-Type" content="text/css">
        <meta name="generator" content="Aspose.Words for .NET 17.1.0.0">
        <title>
        </title>
      </head>
      <body>
      <div>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:22pt; background-color:#ffffff">
				<span style="font-family:&#39;方正小标宋简体&#39;; color:#444444">
					会议室预约注意事项
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					学院会议室预约系统现进入试运行阶段，注意事项如下：
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					一、预约只针对学院
				</span>
          <span style="font-family:&#39;仿宋&#39;; color:#444444">
					教职工（账号：工号；默认密码：123456）
				</span>
          <span style="font-family:&#39;仿宋&#39;; color:#444444">
					，登陆后可自行修改密码，请老师妥善保管本人账号密码，学生可用导师
				</span>
          <span style="font-family:&#39;仿宋&#39;; color:#444444">
					账号密码辅助预约，
				</span>
          <span style="font-family:&#39;仿宋&#39;; color:#444444">
					院外人员暂不授权预约；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					二、目前纳入
				</span>
          <span style="font-family:&#39;仿宋&#39;; color:#444444">
					预约系统的会议室包括4号实验楼109、113、234，各会议室基本条件见系统内说明；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					三、会议室
          按10个时间段预约，分别对应课表第1-10节，可一次预约多个时段，>其中研究生课时段已经锁定；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					四、至少提前1天预约，管理员审核通过后（每日20:00前），预约人员去4号实验楼门卫处取相应房间钥匙，用后退还，做好登记；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					五、未经审核，禁止使用会议室；若预约后不使用该会议室，应及时取消，方便他人使用；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					六、如紧急情况使用已被预约的会议室，请与当前预约人协商；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					七、会议室使用后请预约老师督促与会人员将桌椅、设备等物品归位，收拾卫生并将垃圾倒掉，否则将暂停该账号预约权限；
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-indent:30pt; text-align:justify; font-size:15pt; background-color:#ffffff">
				<span style="font-family:&#39;仿宋&#39;; color:#444444">
					八、如遇特殊情况，可联系管理员王晓宁（手机号：18813123802）。
				</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
				<span style="font-family:&#39;仿宋&#39;">
					&nbsp;
				</span>
        </p>
      </div>
      </body>

      </html>    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="Visable = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      userInfo:{
        userId:'',
        role:'',
        username:'',
        userDepart:'',
      },

      Visable:true
    }
  },
  mounted() {
    this.userInfo.role = window.sessionStorage.getItem("role");
    this.userInfo.userId = window.sessionStorage.getItem("userId");
  }
}
</script>

<style scoped>
.background{
  width: 1440px;
  height: 100%;
}
</style>
