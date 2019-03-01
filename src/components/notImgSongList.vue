<template>
  <div class="song_list">
    <ul class="th-songlist" >
      <li
        @click="reloadRouter(item.song_id)"
        v-for="(item,index) in result.list" :key="index">
        <div class="content">
          <div class="song_name album_name">
            <span>{{item.title}}</span>&nbsp;
          </div>
          <div class="txt" style="padding: 5px 0px">
            {{item.author}}
          </div>
        </div>
        <div class="icon_box ">
          <i class="el-icon-download"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'notImgSongList',
  inject:['reload'],
  data(){
    return {
      result:{
        list:[]
      }
    }
  },
  props:{
    song_id:{
      type:String,
      default:'1'
    },
    num:{
      type:Number,
      default:8
    }
  },
  methods:{
    reloadRouter(song_id){
      this.$router.push({name:'playMany',params:{song_id:song_id,currentTime:false}})
      //调用祖组件 刷新视图
      this.reload()
    },
    getData(){
      let MusicUrl = this.HOST + '/v2/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id='+this.song_id+'&num='+this.num
      this.$axios.get(MusicUrl)
        .then(res => {
          if(res.data.error_code === 22000){
            this.result = res.data.result
          }
        }).catch(error => {
        console.log(error);
      })
    }
  },
  created(){
    this.getData()
  },

}
</script>

<style scoped>
  .album_name {
    font-size: 16px;
  }
  .album_name > span{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .txt{
    font-size: 10.2px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .th-songlist{
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
  }
  .th-songlist li{
    padding: 5px 0px;
    width: 92%;
    margin:  0 auto;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content:center;
  }
  .th-songlist li .content{
    width: 85%;


  }
  .th-songlist li .content .song_name{
    display: flex;
    align-items:center;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .th-songlist li .content .song_name>span,i{
    padding-top: .4rem;
  }

  .th-songlist li .icon_box{
    width: 15%;
    line-height: 43px;
  }
  .icon_box .el-icon-download{
    font-size:2.2rem;float: right;margin-top: .3rem
  }
</style>
