<template>
  <div>
    <search-nva></search-nva>
     <div class="user_info">
       <div class="use_content">
         <div class="us_img">
           <img src="http://himg.bdimg.com/sys/portrait/item/5c8f3137362a2a2a2a2a2a383049d8.jpg" @click="showPopup">
         </div>
         <div class="user-name-box" v-if="isShow">
           <div class="name-phone">
             <p class="p-name">{{ userName }}</p>
             <p style="color: #F1F3F4;font-size: 1.2rem;"><i class="el-icon-mobile-phone"></i>{{phone}}</p>
           </div>
           <label @click="logout">注销</label>
         </div>
         <router-link v-else tag="span" to="/login" class="login-span">单击登录</router-link>
         <popup
           :popup="popup"
           @hidePopup="hidePopup"
         >
           <div class="button-tip">
             <ul>
               <li style="color: #409eff" @click="exit">切换账号</li>
               <li style="color: #ED263A;" @click="exit">退出</li>
             </ul>
             <div class="cancel">
               取消
             </div>
           </div>
         </popup>
       </div>
     </div>

     <div class="collection-block">
        <div class="block-padding" >
          <div class="title">
            <h3 style="height: 100%">我的收藏</h3>
          </div>
        </div>

        <div class="singer_nav" >
          <ul>
            <li v-for="(item,index) in titles"
               :key="index"
               :class="{'th-tabbar-item':true,'selected':index===select}"
               @click="handleSwitch(index)"
            >{{item}}</li>
          </ul>
        </div>

       <div class="switch-box">
         <div class="user-default" v-if="isNotUser">
           <p >请先 <router-link tag="span" to="/login" class="tip-span">登录</router-link> 后查看收藏吧✧*｡٩(ˊᗜˋ*)و✧*｡</p>
         </div>
         <div class="content" v-else>
           <div class="user-default" v-if="contentDefault">
             <p>敬请期待吧...开发小哥哥正拼命开发呢٩(๑❛ᴗ❛๑)۶</p>
           </div>
           <div v-else>
             <keep-alive v-if="notLike">
               <component v-bind:is="currentTabComponent"
                  :heartType="'el-icon-star-on color-red'"
                  :singerData="likeSinger"
                  :likeSongs="likeSong"
                  :fatherAlbums="likeAlbums"
                  :childGet="childGet"
               >
               </component>
             </keep-alive>
             <div class="user-default" v-else>
               <p>客官你还未收藏哦，快去 <router-link tag="span" class="tip-span" to="/index">首页</router-link> 逛逛吧٩(๑>◡<๑)۶ </p>
             </div>
           </div>
         </div>
       </div>
     </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import search_nva from '@/components/search_nav'
import myfooter from '@/components/footer'
import singerUlList from  '@/components/singerUlList'
import songLikes from '@/components/userLikeSongs'
import albumList from '@/components/albumList'
import popup from '@/components/popup'
import ref from '@/app/wilddog'
export default {
  name:'user',
  data(){
    return {
      titles:['歌手','歌曲','专辑','歌单'],
      select: 0,
      isShow:false,
      popup:{
        isShowPopup:false,
        topUp:false,
        down:false,
        height:'145px'
      },
      userName:sessionStorage.user,
      phone:sessionStorage.phone,
      currentTabComponent:singerUlList,
      likeSinger:[],
      likeSong:[],
      likeAlbums:[],
      isNotUser:true,
      isNotData:true,
      //是否启用默认显示
      contentDefault:false,
      //没有收藏
      notLike:false,
      childGet:true
    }
  },
  components:{
    'search-nva':search_nva,
    'my-footer':myfooter,
    popup,
    singerUlList:'singer-ul-list',
    songLikes:'song-list',
  },
  methods:{
    handleSwitch(index){
      this.select = index
      this.currentTabComponent = [singerUlList,songLikes,albumList,''][index]

      switch(index){
        case 0:
          this.getLikeSinger()
          break;
        case 1:
          this.getLikeSong();
          break;
        case 2:
          this.openAlbum();
          break;
        case 3:
          this.contentDefault = true
          break;
      }
    },
    showMsg(msg,type){
      this.$message({
        message: msg,
        type: type,
        center: true,
        showClose: true,
      });
    },
    getLikeSinger(){
      if (this.userName === undefined){
        this.isNotUser = true
      }else {
          this.contentDefault = false
        ref.child(this.userName+'/singers').once('value').then(res => {
          this.isNotUser = false
          this.likeSinger = res.val() || []
          this.notLike = this.likeSinger.length <= 0 ? false:true
        })
      }
    },
    openAlbum(){
      if (this.userName === undefined){
        this.isNotUser = true
      }else {
        this.contentDefault = false
        ref.child(this.userName+'/album').once('value').then(res=>{
          this.isNotUser = false
          this.likeAlbums = res.val() || []
          this.notLike = this.likeAlbums.length <= 0 ? false:true
        })
      }
    },
    getLikeSong(){
      if (this.userName === undefined){
        this.isNotUser = true
      }else {
        this.contentDefault = false
        ref.child(this.userName+'/songs').once('value').then(res => {
          this.isNotUser = false
          this.likeSong = res.val() || []
          this.notLike = this.likeSong.length <= 0 ? false:true
        })
      }
    },
    logout(){
      this.userName = sessionStorage.clear()
      this.isShow = false
      this.isNotUser = true
    },
    exit(){
      this.$router.push({path:'/login'})
    },
    showPopup(){
      this.popup.isShowPopup = true
      this.popup.down = false
      setTimeout(()=>{
        this.popup.topUp = true
      },150)
    },
    hidePopup(){
      this.popup.isShowPopup = false
    },
  },
  created(){
    this.isShow = this.userName === undefined ? false : true
    this.getLikeSinger()
  }
}
</script>

<style scoped>
  .tip-span{
    color: #E03229;font-size: 1.5rem
  }
  .el-icon-mobile-phone{
    font-size: 1.55rem;
  }
.login-span{
  padding-left: 5px;color: #FFFEFC;font-size: 1.6rem;
  line-height: 5px;
  position:absolute;
  top:2.5rem;
}
.user_info{
  width: 100%;
  height: 14rem;
  background-color:	#67B2F5	;
  overflow: hidden;
  border-bottom-left-radius: 12%;
  border-bottom-right-radius: 12%;
  box-shadow: 0px 0px 11px 0px #3C3F41;
}
.user_info .use_content{
  width: 90%;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-top: 5rem;
  line-height: 4.5rem;
  position: relative;
}
.use_content .us_img{
  width: 56px;
  height: 56px;
  border-radius: 28px;
  float: left;
  overflow: hidden;
  /*精灵图位置*/
 /* background-position: -184px -144px;*/
}
  .use_content .user-name-box{
    color: white;
  }
.use_content .user-name-box .name-phone{
    float: left;
    margin-left: 1.5rem;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    height: auto;
    width: 12rem;
    line-height: 21px;
    position: relative;
  }
.user-name-box .name-phone .el-icon-phone{
  font-size: 1.75rem;
  position: absolute;
  top: 27.9px;
  left: 2px;
}

.name-phone .p-name{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
  color: #fff;
  font-size: 1.6rem
}
.use_content .user-name-box label{
    float: right;

  }

/*功能列表*/
.collection-block{
  box-shadow: 1px 1px 8px -2px #3C3F41;
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: -2.8rem;
}
.collection-block .block-padding {
  border-radius: 10px;
}

.switch-box{
  width: 100%;
  height: auto;
  margin-top: -1.5rem;
}
.switch-box .user-default{
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 1.4rem;
}
.switch-box .content{
  width: 90%;
  margin: 0 auto;
  height: auto;
}


.collection-block .title{
   margin-bottom: 0;
}

/*单击头像模式框*/
.button-tip{
  height: 100%;
  width: 100%;
  background-color: #DADADA;
  position: relative;
  text-align: center;
  line-height: 45px;
}
.button-tip ul{
  background-color: #fff;
}
.button-tip ul li{
  border-bottom: 1px solid #DADADA;
  height: 45px;
  line-height: 45px;
}
.button-tip .cancel{
  width: 100%;
  height: 45px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
}

</style>
