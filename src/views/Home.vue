<template>
  <div class="background">
    <el-container>
      <el-aside width="200px">
        <div style="height: 900px;background-color: #334154">
          <el-menu
              active-text-color="#1989FA"
              background-color="#334154"
              active-background-color="#334154"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="借教室系统">
                <el-menu-item index="1-1">教室信息查询</el-menu-item>
                <el-menu-item index="1-2">item one</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
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
  height: 900px;
}
</style>