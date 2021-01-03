<template>
  <div>
    <h2 class="title">这是“{{name}}”组件标题</h2>
    <p>这是cpn组件的内容，哈哈哈</p>
  </div>
</template>

<script>


  export default {
    name: "Cpn",
    data(){
      return{
        name:'Cpn名字'
      }
    }
  }
</script>

<style scoped>
  .title{
    font-size: 40px;
    color: gold;
  }
</style>