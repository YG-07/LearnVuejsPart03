
//导出App组件
export default {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮</button>
      <h2>{{name}}</h2>
    </div>
  `,
  data(){
    return{
      message:'Hello, Vue!',
      name:'vue'
    }
  },
  methods:{
    btnClick(){
      console.log('点击成功');
    }
  }

}