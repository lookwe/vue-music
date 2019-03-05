<template>
<div class="init">
  <keep-alive :include="['songSheet','songlists','singer']">
     <router-view @cutter="getCutter"></router-view>
  </keep-alive>
</div>
</template>
<script>
export default {
  name:'init',
  methods:{
    getCutter(val){
      this.cutter = val
    }
  },
  watch:{
    $route(to,from){
      if(from.name === 'login'){
        if(this.cutter === 'register' && from.name !== 'register'){
          this.$router.push({name:'user'})
          //失效
          delete this.cutter
        }
      }
    },
  },
}
</script>

<style>
  *{margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-text-size-adjust:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;font-family:Arial, "微软雅黑";}
  img{border:none;max-width:100%;vertical-align:middle;}
  body,p,form,input,button,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6{margin:0;padding:0;list-style:none;overflow-x:hidden;color: #333}
  h1,h2,h3,h4,h5,h6{font-size:100%;}
  input,textarea{-webkit-user-select:text;-ms-user-select:text;user-select:text;-webkit-appearance:none;font-size:1em;line-height:1.5em;}
  table{border-collapse:collapse;}
  input,select,textarea{outline:none;border:none;background:none;}
  a{outline:0;cursor:pointer;*star:expression(this.onbanner=this.blur());color: #333;text-decoration: none}
  a:link,a:active{text-decoration:none;}
  a:visited{text-decoration:none;}
  a:hover{color:#f00;text-decoration:none;}
  a{text-decoration:none;-webkit-touch-callout:none;}
  em,i{font-style:normal;}
  li,ol{list-style:none;}
  html{font-size:10px;}
  body{ margin:0 auto;max-width:640px; min-width:320px;color:#333;background:#F5F5F5;height:100%;}
  .el-icon-arrow-left{position: absolute;
    top: 15px;
    left: 12px;
    font-size: 2.9rem;
    color: #E03229;}
</style>
