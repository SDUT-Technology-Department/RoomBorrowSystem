<template>
  <div class="background">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    document.title = "计算机科学与技术学院借教室系统";
  },
  components: {

  }
}
</script>

<style>
.background{
  width: 1440px;
  height: 900px;
  display: flex;
  justify-content: center;
  min-width: 1440px;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
