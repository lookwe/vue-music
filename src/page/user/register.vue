<template>
<div id="register" :style="longBoxStyle">
  <div class="top-img">
    <img v-lazy="topImg">
    <i class="el-icon-arrow-left" @click="$router.go('-1')"></i>
  </div>
  <div class="form-box">
    <div class="form-input user-phone">
      <input  type="text"   placeholder="Enter user phone ..." @focus="userPhone=true" @blur="phoneCheck" v-model="formData.phone">
      <i class="el-icon-error" v-show="userPhone" @click="inputClean('phone')"></i>
    </div>

    <div class="form-input user-name">
      <input  type="text"   placeholder="Enter user name ..." @focus="userName=true" @blur="nameCheck" v-model="formData.name">
      <i class="el-icon-error" v-show="userName" @click="inputClean('name')"></i>
    </div>

    <div class="form-input user-password">
      <input type="password" name="password" placeholder="Enter user password ..." @focus="userPassword=true" @blur="passwordCheck"  v-model="formData.password">
      <i class="el-icon-error" v-show="userPassword" @click="inputClean('password')"></i>
    </div>

    <div class="form-input input-submit" @click="ingressMethod">
      <span class="register-span">一 键 注 册</span>
    </div>
    <div class="pro">
      注册帐号，代表你同意 《<span>飞飞音乐服务协议</span>》
    </div>

  </div>

  <div class="service" >
    <p>已有账号？&nbsp;<router-link tag="span" to="login" style="color: brown">马上去登录</router-link></p>
  </div>
</div>
</template>

<script>
import ref from '@/app/wilddog'
export default {
  name:'register',
  data(){
    return {
      topImg: require('@/assets/imgage/register-bg.jpg'),
      userName:false,
      userPassword:false,
      userPhone:false,
      formData:{
        phone:'',
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
        duration:1500
      });
    },
    tipsBottom(el,value){
      this.$el.querySelector(el).style.borderBottom=value;
    },

    inputClean(type){
      if (type==='name'){
        this.formData.name = ''
      }else if (type==='password'){
        this.formData.password = ''
      }else {
        this.formData.phone = ''
      }
    },

    phoneCheck(){
      this.userPhone=false
      if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(this.formData.phone))){
        this.showMsg('请输入正确手机格式','warning')
        this.tipsBottom('.user-phone',"1px solid #E03229")
        return false
      }
      this.tipsBottom('.user-phone',"1px solid #67C23A")
      return true
    },
    nameCheck(){
      this.userName=false
      if(!/^.{3,12}$/.test(this.formData.name)){
        this.showMsg('请输入3~12位数用户名','warning')
        this.tipsBottom('.user-name',"1px solid #E03229")
        return false;
      }
      this.tipsBottom('.user-name',"1px solid #67C23A")
      return true
    },
    passwordCheck(){
      this.userPassword=false
      if(!/^.{4,12}$/.test(this.formData.password)){
        this.showMsg('请输入4~12位数密码','warning')
        this.tipsBottom('.user-password',"1px solid #E03229")
        return false;
      }
      this.tipsBottom('.user-password',"1px solid #67C23A")
      return true
    },

    async userHas(){
      let flay = false
      await ref.child(this.formData.name).once('value').then(res =>{
        return res.val()
      }).then(data=>{
        if (data !== null){
          this.showMsg('用户名已存在','warning')
          this.tipsBottom('.user-name',"1px solid #E03229")
          flay = true
        }else {
          flay = false
        }
      });
      return await flay
    },

    ingressMethod(){
      this.ingress = this.phoneCheck() && this.nameCheck() && this.passwordCheck() ? true : false
      if (this.ingress){
        this.userHas().then(flay=>{
          if (!flay){
            this.addUser()
          }
        })
      }
    },

    addUser(){
      ref.child(this.formData.name+'/').set(
        this.formData,
        error => {
          if (error === null){
            this.showMsg(`注册成功,名称:${this.formData.name} 来试试登录吧`,'success')
            this.$router.push({path:'/login'})
          }else {
            this.showMsg('服务器暂时离家出走了...','warning')
          }
        }
      )
    }
  },
  beforeDestroy(){
    this.$emit('cutter','register')
  },
  computed:{
    longBoxStyle(){
      let  winHeight = 620
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
      {
        winHeight = document.documentElement.clientHeight;
      }
      return 'height:'+winHeight+'px;width:100%;'
    }
  }
}
</script>

<style scoped>
#register{
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}
.top-img{
  width: 100%;
  height: auto;
  position: relative;
}

.form-box{
  width: 90%;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
}
.form-input:nth-child(1){
  margin-top: 22px;
}
.form-input{
  width: 84%;
  height: 32px;
  border-bottom: 1px solid #ccc;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
}
.form-input i{
  position: absolute;
  top: .6rem;
  right: .65rem;
  font-size: 1.45rem;
  color: #999;
}
.form-input input{
  width: 90%;
  color: #444;
  font-size: 1.5rem;
}
/*input placeholder 样式*/
.form-input input::-webkit-input-placeholder {
  color: #ccc;
  font-size: 1.5rem;
}
.form-box .input-submit{
  border-bottom: none;
  background-color: #E03229;
  opacity: .8;
  border-radius:3px;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 25px!important;
}
.input-submit .register-span{
  line-height:32px;color: #fff
}
.form-box .pro{
  width: 84%;
  margin: 0 auto;
  color: #999;
  margin-top: 5px;
}
.form-box .pro span{
  text-decoration: underline;
  color: #E91F06;
}

.service{
  width: 100%;
  height: 30px;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  text-align: center;
}
.service p{
  color: #fff;
  font-family:"微软雅黑";
  line-height: 30px;


}

</style>
