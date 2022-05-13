<template>
  <div class="background" style="text-align: center">
    <el-space size="50">
      <el-card>
        <el-space direction="vertical">
          <p>按钮说明</p>
          <el-button type="primary" plain>未开始</el-button>
          <el-button type="primary">建设中</el-button>
          <el-button type="warning">待测试/调联</el-button>
          <el-button type="success">已完成</el-button>
          <p></p>
          <el-button type="info">------需带参进入部分------</el-button>
          <el-button type="info" plain>需带参进入(未开始)</el-button>
          <el-button type="warning" plain>需带参进入(待测试/调联)</el-button>
          <el-button type="success" plain>需带参进入(已完成)</el-button>
          <p></p>
        </el-space>
      </el-card>

      <el-card>
        <el-space direction="vertical">
          <p>父页面</p>
          <el-button type="primary" @click="$router.push('/Home')">首页</el-button>
          <el-button type="primary" @click="$router.push('/StuHome')">学生页面</el-button>
          <el-button type="primary" @click="$router.push('/TeacherHome')">教师页面</el-button>
          <el-button type="primary" @click="$router.push('/AdminHome')">管理员页面</el-button>
        </el-space>
      </el-card>

      <el-card>
        <el-space direction="vertical">
          <p>学生页面</p>
          <el-button type="primary" @click="$router.push('/')"></el-button>
          <p></p>

          <el-space direction="vertical">
            <p></p>
            <el-button type="primary" @click="$router.push('/')"></el-button>
          </el-space>
        </el-space>
      </el-card>

      <el-card>
        <el-space direction="vertical">
          <p>教师页面</p>
          <el-button type="primary" @click="$router.push('/')">个人信息/总览</el-button>

          <el-space direction="vertical">
            <p></p>
            <el-button type="primary" @click="$router.push('/')"></el-button>
          </el-space>

        </el-space>
      </el-card>

      <el-card>
        <el-space direction="vertical">
          <p>用户管理</p>
          <el-button type="primary" @click="$router.push('/Login')">登陆</el-button>
          <el-button type="primary" @click="$router.push('/Signup')" disabled>注册</el-button>
          <el-button type="primary" @click="$router.push('/UserManage')" disabled>用户管理(管理员)</el-button>
          <el-button type="primary" @click="$router.push('/AccLog')" disabled>日志</el-button>
        </el-space>
      </el-card>
    </el-space>
  </div>
</template>

<script>
export default {
  name: "RouterPage"
}
</script>

<style scoped>

</style>