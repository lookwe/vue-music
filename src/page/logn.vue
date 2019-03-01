<template>
  <div class="logon" ref="logonBox" :style="longBoxStyle" style='background-image: url("http://i2.bvimg.com/677841/f16d0eb56d6302e5.jpg");'>
     <i class="el-icon-arrow-left" @click="$router.go('-1')"></i>
     <div class="slogan"></div>
     <div class="form-box">
       <div class="form-input user-name">
           <input  type="text"   placeholder="默认用户名 1234" @focus="userName=true" @blur="nameFilter" v-model="formData.name">
           <i class="el-icon-error" v-show="userName" @click="inputClean('name')"></i>
       </div>
       <div class="form-input user-password">
           <input type="password" name="password" placeholder="默认密码 1234" @focus="userPassword=true" @blur="passwordFilter"  v-model="formData.password">
           <i class="el-icon-error" v-show="userPassword" @click="inputClean('password')"></i>
       </div>
       <div class="form-input input-submit" @click="ingressMethod">
           <span style="line-height:32px; ">登&nbsp;录</span>
       </div>
       <div class="forget-register">
         <p style="float: left">忘记密码？</p>
         <router-link tag="p" to="/register" style="float: right">新用户注册</router-link>
       </div>
     </div>
     <div class="service" >
       <p>登录即代表阅读并同意&nbsp;<span style="color: #E03229">服务条款</span></p>
    </div>
  </div>
</template>

<script>
  import ref from '@/app/wilddog'
  export default {
  name:'login',
  data(){
    return {
      userName:false,
      userPassword:false,
      winHeight:0,
      bcgImg:[
          'http://i2.bvimg.com/677841/f16d0eb56d6302e5.jpg',
          'http://i2.bvimg.com/677841/353706f6b0547971.jpg',
          //'http://i2.bvimg.com/677841/1223d9baaefffdb8.png',
           'http://i1.bvimg.com/677841/0188e34385a2ee4e.jpg'
      ],
      formData:{
        name:'',
        password:''
      },
      ingress:false
    }
  },
  methods:{
    showMsg(msg,type){
      this.$message({
        message: msg,
        type: type,
        center: true,
        showClose: true,
      });
    },
    tipsBottom(el,value){
      this.$el.querySelector(el).style.borderBottom=value;
    },
    nameFilter(){
      this.userName = false
      if(!/^.{3,12}$/.test(this.formData.name || '')){
        this.showMsg('请输入3~10位数用户名','warning')
        this.tipsBottom('.user-name',"1px solid #E03229")
        return false;
      }
      this.tipsBottom('.user-name',"1px solid #67C23A")

      return true
    },
    passwordFilter(){
      this.userPassword = false
      if(!/^.{4,10}$/.test(this.formData.password)){
        this.showMsg('请输入4~10位数密码','warning')
        this.tipsBottom('.user-password',"1px solid #E03229")
        return false;
      }
      this.tipsBottom('.user-password',"1px solid #67C23A")
      return true
    },
    ingressMethod(){
      this.ingress = this.nameFilter() && this.passwordFilter() ? true : false
      if (this.ingress){
        this.getLogin()
      }
    },

    getLogin(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let chideNode = ref.child(this.formData.name)
      chideNode.once('value').then(res =>{
        setTimeout(() => {
          loading.close();
          if (res.val() !== null && res.val()['password'] === this.formData.password){
            this.showMsg('登录成功','success');
            sessionStorage.setItem('user',res.val()['name']);
            let phone = res.val()['phone'];
            sessionStorage.setItem('phone',(phone.slice(0, 3) + '****' + phone.slice(6, 10)));
            this.$router.push({name:'user'});
          }else {
            this.formData.password = '';
            this.$message.error({
              message: '错了哦，密码或用户名不正确',
              center: true,
            });
          }
        },1000);
      }).catch(error=>{
        loading.close();
        console.warn(error)
      })
    },

    loopBackImg(){
      let logonBox = this.$refs.logonBox
      let i = 1
      setInterval(()=>{
        logonBox.style.backgroundImage = 'url('+this.bcgImg[i]+')';
        ++i;
        if (i===3){
            i = 0
        }
      },6500)
    },

    inputClean(type){
      if (type==='name'){
        this.formData.name = ''
      }else {
        this.formData.password = ''
      }
    }
  },
  computed:{
    longBoxStyle(){
      this.winHeight = window.innerHeight;
      return 'height:'+this.winHeight+'px;width:100%;'
    }
  },
  mounted(){
    this.loopBackImg()
    this.formData.name = sessionStorage.user
  }
 }
</script>


<style scoped>
.logon{
  position: relative;
  background-size: cover;
  background-position:center;
  color: #fff;
  overflow: hidden;
  width: 100%;
}
.slogan{
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-top: 5rem;
  background-color: dodgerblue;
  background: url(https://img.alicdn.com/tps/TB1POhqIFXXXXXbXFXXXXXXXXXX.png) no-repeat 50% 20px;
  /*display: inline-block;*/
  background-size: 200px;
}
  .form-box{
    width: 76%;
    height: 230px;
    margin: 0 auto;
    background-color:rgba(0,0,0,.35);
    overflow: hidden;
  }
  .forget-register{
    width: 84%;
    height: 20px;
    margin: 0 auto;
    margin-top: 10px;
  }
.forget-register p{
   color: #E03229;
  font-size: 1.34rem;
}
  .form-input{
    width: 84%;
    height: 32px;
    border-bottom: 1px solid #fff;
    margin: 0 auto;
    margin-top: 30px;
    position: relative;
  }
  .form-input i{
    position: absolute;
    top: .6rem;
    right: .65rem;
    font-size: 1.45rem;
  }
   .form-box .input-submit{
     border-bottom: none;
     background-color: #E03229;
     opacity: .8;
     border-radius:3px;
     text-align: center;
     font-size: 1.5rem;
     color: #fff;
   }

  .form-input input{
    width: 90%;
    color: #fff;
    font-size: 1.5rem;
  }
  .form-input input::-webkit-input-placeholder {
    color: #ccc;
}
  .service{
    width:60%;height: 20px;position: absolute;bottom: 3%;left: 50%;margin-left: -30%;text-align: center;font-family:"微软雅黑"
  }
  .service p{
    color: #fff;
  }

</style>
