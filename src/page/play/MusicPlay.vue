<template>
<div id="play_app">
  <div class="bg_img">
    <img class="bcg_img" v-lazy="imgObj.pic_huge"  width="100%" />

    <div class="row header">
      <router-link tag="div" to="/" class="merge-logo">
        <img src="//static1.qianqian.com/web/st/images/logo-taihe.1f4c6b966896d6dc.png" class="logo">
      </router-link>

      <div class="song_title">
        <div class="song_name">
          <img src="//static1.qianqian.com/web/st/images/icon-pinzhi.523ca93dc3f3c518.png">
          <span>{{playData.songinfo.title}}</span>
          <p>
            <span v-for="(item,index) in authors" @click="singerPage(item.author_id)">{{item.author}} </span>
          </p>
        </div>
      </div>
      <div class="song_search">
        <router-link tag="i"  to="/search" class="el-icon-search tu-i"></router-link>
      </div>
    </div>

    <div class="row cover_Box">
      <div class="song_play_img" @click="musicClick">
        <img width="100%" v-lazy="imgObj.pic_radio" :alt="playData.songinfo.title"/>
      </div>

      <!--歌词-->
      <div class="corer_lrc">
        <LRC :currentTime="currentTime" :TotalTime="TotalTime" :song_id="$route.params.song_id"></LRC>
      </div>
    </div>

    <div class="audio_play">
      <!-- 关注 and 下载 -->
      <div class="ion_tu">
        <i class="tu-i" :class="[icon,'ion-like']" @click="handlerCare"></i>
        <a :href="playData.bitrate.file_link" class="ion-download">
          <i class="el-icon-download tu-i"></i>
        </a>
      </div>
      <div class="th-progress-wrapper">
        <audio
          ref="player"
          :src="playData.bitrate.file_link"
          preload="auto"
          controls
          autoplay="autoplay"
        >
            您的浏览器不支持 audio 元素
        </audio>
      </div>
      <div class="hot_tu">
         <div class="title">
           <div class="but_bor">
            <h3>热门推荐</h3>
           </div>
         </div>
          <not-img-song-list
            :song_id="playData.songinfo.song_id"
          >
          </not-img-song-list>
      </div>

      <my-footer></my-footer>

    </div>
  </div>
</div>
</template>

<script>
import LRC from '@/components/LRC'
import notImgSongList from '../../components/notImgSongList'
import my_footer from '../../components/footer.vue'
import ref from '@/app/wilddog'
export default {
  name:'play',
  data(){
    return {
      playData: {
        bitrate:{
          file_link:''
        },
        songinfo:{
          title:'',
        }
      },
      currentTime:0,
      TotalTime:0,
      imgObj:{
        pic_radio:'',
        pic_huge:'',
        error: require('@/assets/imgage/load.jpg'),
        loading:require('../../assets/imgage/load.jpg')
      },
      authors:[],
      icon:'el-icon-star-off',
      likeSongs:[],
      user:sessionStorage.user
    }
  },
  methods: {
    musicClick(){
      let player = this.$refs.player
      if(!player.paused){
        player.pause()
        this.$el.querySelector('.song_play_img').style.animationPlayState = 'paused' //动画停止
      }else {
        player.play()
        this.$el.querySelector('.song_play_img').style.animationPlayState = 'running' //继续动画
      }
    },
    setLikeSong(userName){
      let params = {
        song_id:this.playData.songinfo.song_id,
        pic_s500:this.playData.songinfo.pic_radio,
        rank_change:this.playData.songinfo.charge,
        title:this.playData.songinfo.title,
        author:this.playData.songinfo.author
      }
      this.likeSongs.unshift(params)
      ref.child(userName+'/songs').set(this.likeSongs,e=>{
        if (e===null)this.icon = 'el-icon-star-on';
      })
    },

    removeLikeSong(userName){
      let params = this.likeSongs.filter(item=>{
           return item['song_id'] != this.$route.params.song_id
       })
      ref.child(userName+'/songs').set(params,e=>{
        if (e===null)this.icon = 'el-icon-star-off';
      })
    },

    //关注
    handlerCare(){
      if (this.judgeUserOnLine()){
        if(this.icon === 'el-icon-star-off'){
          this.setLikeSong(this.user)
        }else {
          this.removeLikeSong(this.user)
        }
      }else {
        this.$message({
          dangerouslyUseHTMLString: true,
          center: true,
          showClose: true,
          duration:'2000',
          message: '<span>没登录?</span> <a style="color:#2177C7;font-size: 1.5rem;" onclick="bye()" href="http://feifei.ink/logn">去登陆吧(´･･)ﾉ(._.`)</a>'
        });
      }

    },
    judgeUserOnLine(){
      return this.user == undefined ? false : true
    },

    //单击歌手名跳转页面
    singerPage(id){
      this.$router.push({name:'artist',params:{singer_id:id}})
    },
    //歌手集合
    getAuthor(str,authorIds){
      let arrAuthor = str.split(',')
      let arrauthorIds = authorIds.split(',')
      for(let i = 0; i<arrAuthor.length;i++){
        this.authors.push({'author':arrAuthor[i],'author_id':arrauthorIds[i]})
      }
    },

    //获得时间
    addEventListeners(){
      const shot = this
      shot.$refs.player.addEventListener('timeupdate', shot._currentTime)
      shot.$refs.player.addEventListener('canplay', shot._TotalTime)
    },
    //清除缓存区
    removeEventListeners() {
      const shot = this
      shot.$refs.player.removeEventListener('timeupdate', shot._currentTime)
      shot.$refs.player.removeEventListener('canplay', shot._TotalTime)
    },

    _currentTime(){
      let shot = this;
      let currentTime = shot.$refs.player.currentTime ;
      if (currentTime === undefined){
         currentTime = 0
      }

      this.$emit('setCurrentTime',currentTime)
      shot.currentTime = currentTime
    },
    _TotalTime(){
      let shot = this;
      shot.TotalTime = shot.$refs.player.duration
    },

    loadData(){
      let playUrl = this.HOST + '/v1/restserver/ting?method=baidu.ting.song.play&songid=' +this.$route.params.song_id
      this.$axios.get(playUrl)
        .then(res => {
          this.playData = res.data
          this.imgObj.pic_huge = res.data.songinfo.pic_huge === "" ? res.data.songinfo.pic_small : res.data.songinfo.pic_huge
          this.imgObj.pic_radio = res.data.songinfo.pic_radio
          this.getAuthor(this.playData.songinfo.author,this.playData.songinfo.all_artist_ting_uid);
        }).catch(error => {
          console.warn(error);
      })
    },

  },
  components:{
    LRC,
    'not-img-song-list':notImgSongList,
    'my-footer':my_footer
  },
  mounted(){
    let shot = this;
    let currentTime = this.$route.params.currentTime
    if(currentTime !== undefined){
      shot.$refs.player.currentTime = currentTime
    }
    this.addEventListeners()
  },
  //离开前 把当前正在播放的music传到外部
  beforeDestroy(){
    this.removeEventListeners()
    if(this.$route.params.currentTime!==false){
      let music = {
           src: this.playData.bitrate.file_link,
         title: this.playData.songinfo.title,
        artist: this.playData.songinfo.author,
           pic: this.playData.songinfo.pic_radio,
        songId: this.playData.songinfo.song_id,
         currentTime: this.currentTime + 0.00199
       }
      this.$emit('get_music',music)
    }
  },
  props:{
    music_currentTime:{
        type:Number,
        default:0
    }
  },
  created(){
    this.loadData()
    if (this.judgeUserOnLine()){
      ref.child(this.user + '/songs').once('value').then(res=>{
        this.likeSongs = [...res.val() || []]
        //every 循环中如何出现false 则马上退出循环
        let flay =this.likeSongs.every(item=>{
            return item['song_id'] != this.$route.params.song_id
        })
        this.icon = flay ? 'el-icon-star-off' : 'el-icon-star-on'
      })
    }
  }
}
</script>

<style scoped>
.row_wrapper{
  width: 100%;
}
.col_content{
  width: 92%;
  height: 13rem;
  max-height: 14rem;
  margin: 0 auto;
  margin-bottom: .5rem;
}

#play_app{
  position:relative;
  width: 100%;
  padding-bottom: 1rem;
  padding-top: .1rem;
}

#play_app .header{
  z-index: 999;
  position: absolute;
}
.row{
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
}
.merge-logo{
  padding-right: 0px;
  padding-left: 0px;
  width:7.3333%;
  height: 7.3333%;
  margin-top: 0px;
  margin-left: 1.3rem;
}
.merge-logo img{
  width: 100%;
}
.song_title{
  width:74%;
  height: 50px;
  margin-left: 1.5%;
  margin-right: 1.5%;
  text-align: center;
}
.song_title .song_name{
  width: 23.8rem;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.6rem;
}
.song_title .song_name img{
    width: 40px;
    height: 17px;
    position: relative;
    top: 1px;
  }

.song_title .song_name p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  font-size: 1.4rem;
}
.song_title .song_name p a{
  color: #999;
}

.song_search{
  width:7.5%;
  height: 28px;
  display: flex;
  align-items:center;
}
.tu-i{
  color: #E03229;
  font-size: 2.6rem;
}

.cover_Box{
  position: absolute;
  top: 68px;
  height: auto;
  display: flex;
  justify-content:center;
}
.cover_Box .song_play_img{
  width: 230px;
  height: 230px;
  margin-top: -10px;
  border-radius:50%;
  box-shadow:  2px 4px 14px 0px #3C3F41;
  overflow: hidden;
  z-index: 999;
  animation:rotating 40s linear infinite;
  }

  @keyframes rotating{
    from{transform:rotate(0)}
    to{transform:rotate(360deg)}
  }

.corer_lrc{
  position: absolute;
  top: 220px;
  left: 0;
  width: 100%;
  height: 142px;
  overflow: hidden;
  margin-top: 20px;
}

.audio_play{
  position: absolute;
  top: 438px;
  width: 100%;
}

.audio_play .ion_tu{
  width: 100%;
  height: 34px;
  background-color: #fff;
  padding: 5px 0;
}
.ion_tu .ion-like{
  float:left;
  margin-left: 2rem;
}
.ion_tu .ion-download{
  float:right;
  margin-right: 2rem;
}
.th-progress-wrapper{
  width: 100%;
  margin-top: 16.6px;
  height: 5rem;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
}
.th-progress-wrapper audio{
  width: 100%;
}

.hot_tu{
  height: auto;
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: 1px 1px 8px -2px #3C3F41;
}
.hot_tu .title{
  height: 50px;
  width: 92%;
  margin: 0 auto ;
  border-bottom: 1px solid #eee;
}
.but_bor{
  border-bottom: 1px solid #E03229;width: 77px
}
.hot_tu .title h3{
  line-height: 50px;
  font-size: 1.8rem;
}


.bg_img{
  width: 100%;
  height: 439px;
  position:relative;
  top: -1px;
  left: 0;
  z-index: 1;
}
.bg_img .bcg_img{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 438px;
  opacity: 0.08;
}
.bg_img::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  width: 100%;
  height: 4rem;
  background-image: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,1));
}

</style>
