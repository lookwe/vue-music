<template>
  <!--专辑列表-->
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
            class="th-songlist-item url normal suspend-state"
            v-for="(item,index) in album_List"
            :key="index+'songList'"
            @click="albumInfo(item.album_id)"
          >
            <div class="poster">
              <div>
                <img  v-lazy="item.pic_small || 'error'">
                <i>{{index+1}}</i>
              </div>
            </div>
            <div class="left">
              <div class="icon-trend icon-trend-zero">
                <i  class="el-icon-minus"  style="font-size: 14px;color: #E03229;margin-left: -.2rem"></i>
              </div>
              <span class="icon-play-state"></span>
              <div class="info">
                <div class="line1">
                  <span  class="name">{{item.title}}</span>
                  <i class="iconfont icon-sq"  style="font-size: 23px;color: #E03229"></i>
                </div>
                <span class="author">{{item.publishtime}}</span>
              </div>
            </div>
            <div class="download iconfont icon-download" >
              <i class="el-icon-arrow-right"  style="font-size: 2.2rem;float: left;margin-top: -10px;color: #ccc"></i>
            </div>
          </li>

        <li class="li-tip" v-if="album_List.length===0">
          <span class="tip-text">暂时没有信息</span>
        </li>

        </ul>
      </vue-data-loading>
    </div>

    <div>
      <span v-show="album_List.length>0" class="more-text">
        <span >{{tips}}</span>
       <i class="el-icon-back"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import VueDataLoading from 'vue-data-loading'
  import ref from '@/app/wilddog'
  export default {
    name:'musicList',
    inject:['getAllMusic'],
    data(){
      return {
        album_List:[],
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
      //单击进入专辑
      albumInfo(id){
         this.$router.push({name:'album',params:{'album_id':id}})
      },

      pullUp(){
        if(this.isPu){
          this.offset += 12
          this.loadData();
        }
        this.init_scroll = false
      },

      loadData(){
        this.loading = true
        let MusicUrl = this.musicapi + `/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.artist.getAlbumList&tinguid=${this.singerId}&limits=${this.size}&offset=${this.offset}`

        this.$axios.get(MusicUrl)
          .then(res => {
            //下拉加载时候，合并一起的数据
            this.loading = false
            if(res.data.albumnums>0){
              this.album_List = this.album_List.concat(res.data.albumlist)
            }else {
              this.tips = '到底了~~~'
              this.$el.querySelector('.el-icon-back').style.display='none'
            }
          }).catch(error => {
           console.warn(error);
        })
      },
    },
    components: {
      VueDataLoading
    },
    props:{
      size:{
        type:String,
        default:'5'
      },
      singerId:{
        type:String,
        default:''
      },
      //是否下拉加载
      isPu:{
        type:Boolean,
        default:true
      },
      showImp:{
        type:Boolean,
        default:true
      },
      fatherAlbums:{
        type:Array,
        default:function () {
          return []
        }
      },
      childGet:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      fatherAlbums(newArr){
        this.album_List = newArr
      }
    },
    created(){
      if(this.isPu)this.service.push('pull-up');

      if(!this.childGet){
        this.loadData();
      }else {
        this.album_List = this.fatherAlbums
      }
    }

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
    font-size: 13.5px;
    transform:rotateZ(270deg)
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
