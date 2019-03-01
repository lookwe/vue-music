<template>
  <!--音乐列表-->
  <div class="th-tabpanel-item" >
    <div>
        <ul class="th-songlist"  >
          <li
            class="th-songlist-item url normal suspend-state"
            v-for="(item,index) in likeSongs"
            :key="index"
            @click="handlerMusic(item.song_id)">
            <div :class="['poster',{'red':index <=2 }]">
              <div>
                <img v-lazy="item.pic_s500">
                <i>{{index+1}}</i>
              </div>
            </div>
            <div class="left">
              <div class="icon-trend icon-trend-zero">
                <i class="el-icon-minus"></i>
              </div>
              <span class="icon-play-state"></span>
              <div class="info">
                <div class="line1">
                  <span  class="name">{{item.title}}</span>
                  <i></i>
                </div>
                <span class="author">{{item.author}}</span>
              </div>
            </div>
            <div class="download iconfont icon-download" >
              <i class="el-icon-star-on"></i>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name:'userLikeSongs',
    inject:['getAllMusic'],
    methods:{
      handlerMusic(song_id){
        let ind = 0
        this.likeSongs.find((item,index)=>{
          ind = index
          if( item.song_id === song_id)return true;
        });
        let ids  = this.likeSongs.slice(ind,this.likeSongs.length).map(item=>{return item.song_id })
        this.getAllMusic(ids,true)
      },
    },
    props:{
      likeSongs:{
        type:Array,
        default:function() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .icon-download .el-icon-star-on{
    font-size: 2.2rem;float: left;margin-top: -10px;color: #F54545
  }
  .colo-b{
    color: #888!important;
  }
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
    transform:rotateZ(90deg)
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

  .th-songlist .th-songlist-item .icon-trend{
    width: 12px;
    height: 20px;
    margin-right: 10px;
  }
  .icon-trend .el-icon-minus{
    font-size: 14px;color: #FF1F37;margin-left: -.2rem
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
