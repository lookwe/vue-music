<template>
  <lazy-component @show="handler">
    <div id="album">
      <search-nva></search-nva>
      <div class="top-box">
        <div class="bim-box" :style='{"background-image": "url("+ (albumInfo.share_pic || defaultImg) +")"}'></div>
        <div class="bim-box-mask"></div>
        <el-row style="margin-top: 22px" :gutter="5">
          <el-col :span="9">
            <div class="album-img album-div">
              <img v-lazy="albumInfo.share_pic || defaultImg" width="100%">
            </div>
          </el-col>
          <el-col :span="15">
            <div class="album-info album-div">
              <h3 class="title">{{albumInfo.title}}</h3>
              <div class="album-content">
                <p class="author">
                  <span class="c-gray">歌手：</span>
                  {{albumInfo.author}}
                </p>
                <p class="language">
                  <span class="c-gray">语种：</span>
                  {{albumInfo.language}}
                </p>
                <p class="time">
                  <span class="c-gray">发行日期：</span>
                  {{albumInfo.publishtime}}
                  <i v-if="albumInfo.author" :class="[defaultIcon,'like']" @click="userClickLike"></i>
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="song-box">
        <div class="all-show" @click="getMusicIds">
           <i class="el-icon-service"></i>
           <p>全部播放<span class="all-play-size"> ({{albumInfo.songs_total}}首)</span></p>
            <i class="el-icon-share" @click="share"></i>
        </div>
        <div class="sing-list">
          <ul class="th-songlist"  >
            <li
              class="th-songlist-item url normal suspend-state"
              v-for="(item,index) in songlist"
              :key="index+'songList'"
              @click="handlerMusic(item.song_id)">
              <div class="left">
                <span class="icon-play-state"></span>
                <div class="info">
                  <div class="line1">
                    <span class="name">{{item.title}}</span>&nbsp;
                    <img v-lazy='"http://thyrsi.com/t6/675/1551429593x2890173891.png"' width="14px"/>
                  </div>
                  <span class="author">{{item.author}}</span>
                </div>
              </div>
              <div class="download iconfont icon-download" >
                <i class="el-icon-download"></i>
              </div>
            </li>
            <li class=".li-tip" v-if="songlist.length===0" >
              <span class="tip-text">暂无歌曲数据</span>
            </li>
          </ul>
        </div>
      </div>
      <my-footer></my-footer>
    </div>
  </lazy-component>
</template>

<script>
  import search_nva from '@/components/search_nav'
  import myFooter from '@/components/footer'
  import ref from '@/app/wilddog'
  export default {
    name:'album',
    inject:['getAllMusic'],
    data(){
      return {
        album_id:this.$route.params.album_id,
        songlist:[],
        albumInfo:{},
        defaultIcon:'el-icon-star-off',
        likeList:[],
        user:sessionStorage.user,
        defaultImg:require("@/assets/imgage/error.jpg")
      }
    },
    components: {
      'search-nva':search_nva,
      'my-footer':myFooter
    },
    methods: {
      share(e){
        e.stopPropagation()
        if (window.console) {
          console.groupCollapsed(`%cd=====(￣▽￣*)b顶 飞飞音乐馆`, 'color:#009a61; font-size: 23px; font-weight: 300');
          console.log('%chttp://feifei.ink\n-------------\nQQ交流群(一):950266367,  QQ交流群(二):147076513,  作者QQ:2726768601', 'color:#009a61');
          console.groupEnd();
        }
      },
      handler(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        setTimeout(()=>{
          loading.close();
        },300)
      },
      //播放所有
      getMusicIds(){
        let ids = this.songlist.map(item=>{return item.song_id})
        this.getAllMusic(ids,true)
      },
      handlerMusic(song_id){
        let ind=0
        this.songlist.find((item,index)=>{
          ind = index
          if( item.song_id === song_id)return true;
        });
        let ids  = this.songlist.slice(ind,this.songlist.length).map(item=>{return item.song_id })
        this.getAllMusic(ids,true)
      },

      getDate() {
        let url = `${this.musicapi}/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.album.getAlbumInfo&album_id=${this.album_id}`
        this.$axios.get(url).then(res =>{
          if(res.data.error_code !== 22001){
            this.songlist = res.data.songlist;
            this.albumInfo = {
              share_pic:res.data.share_pic,
              title: res.data.share_title,
              author:res.data.albumInfo.author,
              publishtime:res.data.albumInfo.publishtime,
              language:res.data.albumInfo.language,
              songs_total:res.data.albumInfo.songs_total
          }
         }
        }).catch(e=>{
          console.log(e);
        })
      },

      userClickLike(){
        if (this.judgeUserOnLine()){
          if(this.defaultIcon === 'el-icon-star-off'){
            this.setLike(this.user)
          }else {
            this.removeLike(this.user)
          }
        }else {
          this.$message({
            dangerouslyUseHTMLString: true,
            center: true,
            showClose: true,
            duration:'2000',
            message: '<span>没登录?</span> <a style="color:#2177C7;font-size: 1.5rem;" onclick="bye()" href="http://feifei.ink/#/login">去登陆吧(´･･)ﾉ(._.`)</a>'
          });
        }
      },
      userHasLike(){
        if (this.judgeUserOnLine()){
          ref.child(this.user + '/album').once('value').then(res=>{
            this.likeList = [...res.val() || []]
            //every 循环中如何出现false 则马上退出循环
            let flay =this.likeList.every(item=>{
              return item['album_id'] != this.album_id
            })
            this.defaultIcon = flay ? 'el-icon-star-off' : 'el-icon-star-on'
          })
        }
      },

      setLike(pathNmae){
        let params = {
            album_id:this.album_id,
            pic_small:this.albumInfo.share_pic,
            title:this.albumInfo.title,
            publishtime:this.albumInfo.publishtime,
          }
        this.likeList.unshift(params)
        ref.child(pathNmae+'/album').set(this.likeList,e=>{
           if (e == null){
             this.defaultIcon = 'el-icon-star-on'
           }
       })
      },
      removeLike(pathNmae){
        let params = this.likeList.filter(item=>{
            return item['album_id'] != this.album_id
        });

        ref.child(pathNmae+'/album').set(params,e=>{
          if (e == null){
            this.defaultIcon = 'el-icon-star-off'
          }
        })
      },
      judgeUserOnLine(){
        return this.user == undefined ? false : true
      },

    },
    created() {
      this.getDate();
      this.userHasLike()
    }
  }
</script>

<style scoped>
  .el-icon-share {
    right: 0;
  }
  .icon-download .el-icon-download{
    font-size: 2.2rem;float: left;margin-top: -10px;color: #ccc
  }
.top-box{
  width: 100%;
  height: 180px;
  margin-top: 44px;
  overflow:hidden;
  position: relative;
}
.bim-box{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(6px);
  background-repeat: no-repeat;
  overflow: hidden;
  background-size: cover;
}
.bim-box-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsla(0,0%,100%,.75);
  overflow: hidden;
}
.top-box .album-div{
  height: 120px;
}
.top-box .album-img{
  width: 88%;
  height: 100%;
  margin-left: 12%;
  border-radius: 1rem;
  overflow: hidden;
}

.top-box .album-info{
  margin-left: .6rem;
  padding-top: .3rem;
}
.top-box .album-info p{
  margin-top: .9rem;
}
.album-info .title{
    font-size: 1.8rem;
    line-height: 20px;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
.album-content{
  margin-top: 2rem;font-size: 1.35rem;position: relative;
}
.c-gray{
  color: #999;
}
.like{
    position: absolute;
    right: 1.2rem;
    bottom: 0;
    color: #F54545;
  }

.song-box{
  width:100%;
  margin: 0 auto;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 1px 8px -2px #3C3F41;
}
.all-show{
  width: 90%;
  height: 55px;
  margin: 0 auto;
  font-size: 1.8rem;
  line-height: 55px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.all-show .all-play-size{
  font-size: 1.3rem;color: #999
}
.all-show i{
    position: absolute;
    top: 1.3rem;
  }
.all-show p{
  margin-left: 2.5rem;
}
.sing-list{
  width: 90%;
  height: auto;
  margin: 0 auto;
}

/*列表*/
.poster i {
  box-sizing: content-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: right;
  padding: .2rem;
  height: 16px;
  font-size: 1.2rem;
  color: #fff;
  font-style: normal;
  background-image: linear-gradient(transparent,#000);
}
.th-songlist .th-songlist-item {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  text-align: left;
  min-height: 55px;
  padding: 7px 0;
  border-bottom: 1px solid #f2f2f2;
}

.th-songlist .th-songlist-item .left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 1 0%;
}

.th-songlist .th-songlist-item .info {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 0%;
  flex: 1 1 0%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
}
.th-songlist .th-songlist-item .info .line1 {
  min-height: 20px;
  position: relative;
}
  .info .line1 img{
    position: absolute;
    top: 2px;
  }
.th-songlist .th-songlist-item .info .name {
  max-width: 88%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  font-size: 15.5px;
  color: #333;
}
.th-songlist .th-songlist-item .info .author {
  font-size: 12px;
  color: #999;
}

</style>
