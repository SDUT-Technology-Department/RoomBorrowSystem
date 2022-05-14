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
            <div style="height: 50px;width: 100%;background-color: azure">
              此处放Logo
            </div>
            <el-menu-item index="/BorrowRoom" style="background-color: #222D3C">教室借用</el-menu-item>
            <el-menu-item index="/BorrowInfoList">教室借用记录查询</el-menu-item>
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