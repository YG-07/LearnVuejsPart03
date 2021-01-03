<template>
  <div>
    <h2 class="title">这是App组件，{{message}}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{name}}</h2>
    <Cpn/>
  </div>
</template>

<script>

  import Cpn from './Cpn.vue'

  export default {
    name: "App",
    data(){
      return{
        message:'Hello, Vue!',
        name:'vue'
      }
    },
    components:{
      Cpn
    },
    methods:{
      btnClick(){
        console.log('点击成功');
      }
    }
  }
</script>

<style scoped>
  .title{
    font-size: 50px;
    color: cyan;
  }
  button{
    font-size: 25px;
    color: #f7f7f7;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background:green;
    outline: none;
  }
</style>