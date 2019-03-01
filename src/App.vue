<template>
  <div id="app">
    <div class="Music-head" >
      <router-link tag="a" to="/hot">
        <div class="Music-head-img"></div>
      </router-link>
    </div>

    <!--@song_id="getId" 无头像列表插件传来的-->
    <keep-alive :include="['songSheet','songlists','singer']">
      <router-view
        @get_music="getMusic"
        @setCurrentTime="getCurrentTime"
        v-if="isRouterAlive">
      </router-view>
    </keep-alive>

    <div class="back-top" @click="returnTop" ref="back_top">
      <span class="bg-back2top2" ></span>
    </div>

    <footer_music class="abc"
      :music="music"
      :musicList="musicList"
      :isLoad="isLoad"
      :musicShowL="musicShowL"
      :muted="muted"
      :currentTime="currentTime"
      @close_music="closeMusic"
    >
    </footer_music>
  </div>
</template>

<script>
  import footerMusic from  './components/footerMusic'
  export default {
    name: 'App',
    //以依赖注入，给子组件孙组件调用
    provide (){
      return{
        reload:this.reload,
        getMusics:this.getMusics,
        getAllMusic:this.getAllMusic
      }
    },
    data(){
      return{
        isRouterAlive:true,
        music:{},
        //底部播放歌曲列表
        musicList:[],
        isLoad:false,
        musicShowL:false,
        //静音
        muted:false,
        currentTime:0,
        randomSong:[]
      }
    },
    components:{
      'footer_music':footerMusic
    },
    methods:{
      getMusic(obj){
        this.$nextTick(function () {
          if(obj != null){
            this.musicShowL = true
            this.isLoad = true
            this.music = obj
            this.muted = false

            if(obj.currentTime !== undefined){
              this.currentTime = obj.currentTime
            }else {
              this.currentTime = 0
            }
          }
        })
      },
      getCurrentTime (time){
        this.currentTime = time
      },
      closeMusic(flay){
        this.musicShowL = false
        setTimeout(()=>{
          this.isLoad = flay
        },50)
      },

      mapMusic(data){
        let music = {
          src: data.bitrate.file_link || data.bitrate.show_link,
          title: data.songinfo.title,
          artist: data.songinfo.author,
          pic: data.songinfo.pic_radio,
          songId:data.songinfo.song_id
        }
        return music
      },

      //当子组件调用这个方法事，让显示路由在所以组件执行完后在显示
      reload (){
        this.isRouterAlive = false
        //所有组件渲染完后执行
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      async getMusics(){
        let url = this.musicapi +  '/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.radio.getChannelSong&channelname=public_tuijian_suibiantingting&version=2.1'
        await this.$axios.get(url).then(res =>{
           if(res.data.error_code===22000){
             this.randomSong = res.data.result.songlist.splice(1,9).map((item)=>{
               return item.songid
             })
             this.getAllMusic(this.randomSong,true)
           }
         })
      },

      /*
      * 并发请求歌曲并转入播放组件
      * 参数 ： ['2415','23562','245421'....] , autoPlay选取第一项为首播
      * */
      getAllMusic(songs,autoPlay=false){
        if(songs.length>30)songs.splice(30,songs.length);
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });

        let promiseArr = songs.map(item=>{
          return this.$axios.get(this.musicapi +'/v1/restserver/ting?format=json&from=webapp_music&method=baidu.ting.song.playAAC&songid='+item)
        })

        this.$axios.all(promiseArr).then(this.$axios.spread((...args)=>{
          this.musicList = args.map(item=>{
            let music = this.mapMusic(item.data)
            return music
          })
          if (autoPlay){
            this.getMusic(this.musicList[0])
            loading.close();
          }
        }))
      },

      handleScroll (){
        //浏览器滚动条
        let app_scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //div 滚动条 = 浏览器滚动条
        if(app_scrollTop > 1100){
          //this.$refs.back_top.style.display = 'inline-block'
          this.$el.querySelector('.back-top').style.display = 'inline-block'
        }else {
          //this.$refs.back_top.style.display = 'none'
          this.$el.querySelector('.back-top').style.display = 'none'
        }
      },

      returnTop(){
        let u = navigator.userAgent;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        if (isAndroid) {
          this.android_scroll('0px', 300)
        }
        if (isIOS){
          this.ios_scroll()
        }
      },

      android_scroll(scrollTo, time) {
        let scrollFrom = parseInt(document.body.scrollTop),
          i = 0,
          runEvery = 5; // run every 5ms
        scrollTo = parseInt(scrollTo);
        time /= runEvery;

        let interval = setInterval(function () {
          i++;
          document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
          if (i >= time) {
            clearInterval(interval);
          }
        }, runEvery);
      },

      ios_scroll(){
        let time ;
        document.documentElement.scrollTop -= 90;
        if (document.documentElement.scrollTop > 0) {
          time = setTimeout(()=>this.ios_scroll(),14);
        }else {
          clearTimeout(time);
        }
      },

      isPc(){
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        let flag = true
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      }

    },
    watch:{
      $route(to,from){
        if(to.name === 'playMany' || to.name === 'play'){
          this.musicShowL = false
          this.muted = true
        }else {
          if (this.isLoad===true){
            this.musicShowL = true
            this.muted = false
          }
        }
      },
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
      if (this.isPc()){
        this.$notify({
          title: '温馨提示',
          message: '请使用手机端显示更好哦',
          duration: 8800,
          type: 'warning'
        });
      }
      false
    }

  }
</script>

<style>
.collection-block{
  background-color: #F5F5F5;
  padding-bottom: 1rem;
}
.block-padding{
  padding: 10px 17px;
  background-color: #fff;
}
.block-padding .title{
  display: flex;
  margin: 14px 0 18px;
}
.block-padding .title h3{
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 0%;
  flex: 1 1 0%;
  display: block;
  font-weight: 700;
  font-size: 2rem;
}
.block-padding .title .btn-more{
  font-size: 1.2rem;
  text-align: right;
  margin-top: .5rem;
  color: #333;
}
/*共同头*/
.Music-head-img{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 54px;
  background: url(./assets/banner/bj.jpg) center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  z-index: 100;
}
.Music-head{
  padding: 27px 17px;
  background-color: #ccc;
}
/*推荐切换*/
.singer_nav{
  width: 100%;
  height: 80px;
  background-color: #fff;
}
.singer_nav ul{
  width: 100%;
  height: 67%;
  display: flex;
  justify-content:space-around;
}
.singer_nav ul li{
  width: 12rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  border-bottom: 1px solid #eee;
  box-sizing:border-box;
}
.singer_nav ul  .th-tabbar-item{
  font-size: 16px;
  color: #999;
}
.singer_nav ul .selected{
  border-bottom: 1px solid #E03229;
  color: #E03229;
}
/*默认图标*/
i{
  font-size: 25px;
}
.Music-head-nav{
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  z-index: 998;
  width: 100%;
  height: 44px;
  background-color: #F3F3F3;
  box-shadow: 0px 1px 5px -2px #3C3F41;
}
.Music-head-nav .nav-left{
  float: left;
  margin-left: 4%;
}
.merge-logo{
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  background: url(//static1.qianqian.com/web/st/images/logo-taihe.1f4c6b966896d6dc.png) no-repeat 0 0;
  background-size: cover;
  margin-top: .7rem;
}
.Music-head-nav .nav-right {
  width: 76%;
  height: 100%;
  display:flex;
  float: right;
  justify-content:space-around;
}
.nav-right  .nva-item-content{
  display: inline-block;
  font-size: 1.6rem;
  color: #999;
  padding-top: 12px;
  text-align: right;
}

.back-top{
  position: fixed;
  right: 1.5rem;
  bottom: 120px;
  height: 39px;
  width: 39px;
  z-index: 999;
  opacity: .8;
  text-align: right;
  display: none;
}
.back-top span{
  display: inline-block;
  background: url(//static1.qianqian.com/web/st/images/icon-back2top2.af69f845890e1a53.png) no-repeat 0 0;
  background-size: 39px 39px;
  width: 39px;
  height: 39px;
}


.li-tip{
  text-align: center
}
.li-tip .tip-text{
  font-size: 14.5px;color: #999;
}
</style>
