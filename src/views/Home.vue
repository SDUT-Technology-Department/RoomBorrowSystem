<template>
  <div class="background">
    <el-container>
      <el-aside width="200px">
        <div style="height: 100%;background-color: #334154">
          <el-menu
              active-text-color="#1989FA"
              background-color="#334154"
              default-openeds="1"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              :router="true">
            <div style="height: 70px;width: 100%;padding-top: 20px">
<!--              <img src="../assets/img/logoW.png" style="height: 60%;width: 80%; margin-left: 20px;margin-top: 5px" alt="">-->
            </div>
            <el-menu-item index="/BorrowRoom">教室借用</el-menu-item>
            <el-menu-item index="/BorrowInfoList">教室借用记录查询</el-menu-item>
            <el-menu-item index="/UserManage">用户管理</el-menu-item>
            <el-menu-item index="/RoomTimeAndReasonManage">系统管理</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",

}
</script>

<style scoped>
.background{
  width: 1440px;
  height: 100%;
}
</style>
