<template>
  <div class="row_wrapper">
    <div class="row_content">
      <el-row>
        <el-col :span="8" v-for="(item,index) in todayData" :key="index">
          <router-link tag="div" :to="{name:'play',params:{song_id:item.song_id}}" class="col_content">
            <div class="song-img">
              <img v-lazy="item.pic_big" width="100%"/>
              <div class="info">
                <p class="title">{{item.album_title}}</p>
                <p class="author">{{item.author}}</p>
              </div>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name:'todayList',
    data(){return {todayData:[]}},
    props:{song_id:{type:String, default:''}},
    created(){
     let todayUrl = this.musicapi + '/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id=1&num=6'
      this.$axios.get(todayUrl)
        .then(res => {
          this.todayData = res.data.result.list;
        }).catch(error => {
         console.log(error);
      })
    }
  }
</script>

<style scoped>
.song-img{
  width: 100%;
  height: 13.5rem;
}
.song-img p{
  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
}
.info{
  width: 100%;height: 3rem;
}
  .info .title{
    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
  }
.info .title {
  color: #999;
}
</style>
