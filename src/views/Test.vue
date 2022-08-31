<template>
  <!--主容器-->
  <div class="container">
    借教室系统升级维护中<br/>
    预计8.31 12：00前恢复使用
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      QueryForm: {
        startDate: '',
        endDate: '',

      },


    }
  },
  methods:{
    getInfo(){
      console.log(this.QueryForm)
      this.$http({
        method:'post',
        url:'/ND/check',
        data:this.QueryForm
      }).then(res =>{
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
</style>
