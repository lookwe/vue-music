<template>
  <!--歌曲列表-->
  <div class="th-tabpanel-item" >
    <div>
      <vue-data-loading
        :loading="loading"
        :completed="completed"
        :listens="service"
        :init-scroll="init_scroll"
        @pull-up="pullUp">
      <ul class="th-songlist"  >
        <li
         @click="handlerMusic(item.song_id)"
         class="th-songlist-item url normal suspend-state"
         v-for="(item,index) in song_list"
         :key="index+'songList'">
          <div :class="['poster',{'red':index <=2 }]">
            <div v-if="ranking">
              <img  v-lazy="item.pic_small || 'error'">
              <i>{{index+1}}</i>
            </div>
            <span v-else>{{item.rank}}</span>
          </div>
          <div class="left">
            <div class="icon-trend icon-trend-zero">
              <i  :class="item.rank_change|chongHandler"  style="font-size: 14px;color: #E03229;margin-left: -.2rem"></i>
            </div>
            <span class="icon-play-state"></span>
            <div class="info">
              <div class="line1">
                <span class="name">{{item.title}}</span>
                <img src='../assets/imgage/sq.png' width="14px"/>
              </div>
              <span class="author">{{item.author}}</span>
            </div>
          </div>
          <div class="download iconfont icon-download" >
            <i class="el-icon-download"  style="font-size: 2.2rem;float: left;margin-top: -10px;color: #ccc"></i>
          </div>
        </li>
        <li class=".li-tip" v-if="song_list.length===0">
          <span class="tip-text">暂无歌曲数据</span>
        </li>
      </ul>
      </vue-data-loading>
    </div>

    <div v-if="isTip">
      <router-link v-show="!showImp" tag="a" :to="{name:'songs',params:{'billboard_type':billboard_type}}" class="more-text">
        <span >查看该榜单</span>
      </router-link>
      <span v-show="showImp" class="more-text">
        <span >{{tips}}</span>
       <i class="el-icon-back"></i>
      </span>
    </div>
  </div>
</template>

<script>
import VueDataLoading from 'vue-data-loading'
export default {
  name:'musicList',
  inject:['getAllMusic'],
  data(){
    return {
      song_list:[],
      billboard:{},
      offset:0,
      loading:false,
      completed: false,
      songType:false,
      init_scroll:true,
      service:[],
      tips:'下拉继续看',
    }
  },
  methods:{
    //单击音乐App全局显示底部音乐
    handlerMusic(song_id){
      let ind=0
      this.song_list.find((item,index)=>{
        ind = index
        if( item.song_id === song_id)return true;
      });
      let ids  = this.song_list.slice(ind,this.song_list.length).map(item=>{return item.song_id })
      this.getAllMusic(ids,true)
    },
    pullUp(){
      if(this.isPullUp){
        this.offset += 12
        this.loadData();
      }
      this.init_scroll = false
    },

    loadData(){
      this.loading = true
      let MusicUrl;
      if(this.singerId === ''){
        this.songType = true
        MusicUrl = this.musicapi + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.billboard_type + '&size='+this.size+'&offset='+this.offset;
      }else {
        this.songType = false
        //是否查询专辑
        MusicUrl = this.musicapi + '/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid='+this.singerId+'&limits='+this.size+'&offset='+this.offset+'&use_cluster=2&order=0'
      }
      this.$axios.get(MusicUrl)
        .then(res => {
          //下拉加载时候，合并一起的数据
          this.loading = false
          if(res.data.error_code === 22000){

            this.arr = res.data.song_list || res.data.songlist;

            if(this.songType){
              this.$emit('getImgSrc',res.data.billboard.pic_s444)
              this.song_list = this.song_list.concat(res.data.song_list)
            }else {
              this.song_list = this.song_list.concat(res.data.songlist)
            }
          }else {
            this.tips = '到底了~~~'
            this.$el.querySelector('.el-icon-back').style.display='none'
          }
        }).catch(error => {
          console.warn(error);
      })
    }
  },
  filters:{
    //判断播放量是否上升或者下降
    chongHandler(chong){
      if(chong > 1){
          return 'el-icon-back'
      }else if (chong === '-1'){
          return 'el-icon-back down'
      }else {
          return 'el-icon-minus colo-b'
      }
    }
  },
  components: {
    VueDataLoading
  },
  props:{
      /*是否显示头像*/
    ranking:{
      type:Boolean,
      default:true
    },
    /*榜单分类*/
    billboard_type:{
      type:String,
      default:'1'
    },
    size:{
      type:String,
      default:'5'
    },
    /*歌手ID*/
    singerId:{
      type:String,
      default:''
    },
    /*是否提供下拉*/
    isPullUp:{
      type:Boolean,
      default:true
    },
    /*是否显示下拉看看*/
    showImp:{
      type:Boolean,
      default:true
    },
    /*是否使用父级数据渲染列表*/
    songList:{
      type:Array,
      default :function () {
        return []
      }
    },
    /*是否显示底部提示*/
    isTip:{
      type:Boolean,
      default:true
    }
  },
  created(){
    this.loadData()
    if(this.isPullUp){
      this.service.push('pull-up')
    }
  },
}
</script>

<style scoped>
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
.el-icon-back{
  font-size: 13.5px;transform:rotateZ(270deg)
}
.down{
  transform:rotateZ(270deg)!important;
}
  .collection-block{
    width: 100%;
    padding-bottom: 40px;
    margin-top: -10px;
    height: 310px;
  }
  .th-tabpanel-item {
    flex-shrink: 0;
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
  /* a标签 查看剩余该榜单*/
  .more-text {
    color: #999;
    display: block;
    margin-top: 9px;
    font-size: 1.2rem;
    text-align: center;
    height: 29px;
    line-height: 32px;
  }

  .th-songlist .th-songlist-item .poster {
    position: relative;
    width: 45px;
    margin-right: 8px;
    text-align: center;
    font-size: 19px;
    min-width: 32px;
    color: #999;
  }
  .th-songlist .th-songlist-item .poster.red{
    color: #c66
  }

  .th-songlist .th-songlist-item .left {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 0%;
    flex: 1 1 0%;
  }

  .th-songlist .th-songlist-item .icon-trend {
    width: 12px;
    height: 20px;
    margin-right: 10px;
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

  }
  .th-songlist-item .info .line1 img{
    margin-top: -1rem;
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
