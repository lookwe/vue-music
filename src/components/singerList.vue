<template>
  <el-row>
    <el-col :span="8" v-for="(item,index) in singers" :key="index">
      <router-link tag="div" :to="{name:'artist',params:{singer_id:item.ting_uid}}" class="col_content">
        <div class="song-img">
          <img v-lazy="item.avatar_middle || 'error'" width="100%">
          <span class="info">{{item.name}} - {{item.country}}</span>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name:'singerList',
    data(){
      return {
        singers:[]
      }
    },
    props:{
      songTid:{
        type:String,
        default:'2517'
      }
    },
    created(){
      let SongUrl =this.musicapi + '/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.artist.recommendArtist&ting_uid='+this.songTid+'&num=6'
      this.$axios.get(SongUrl)
        .then(res => {
          this.singers = res.data.result.list;
        }).catch(error => {
        console.log(error);
      })
    }
  }
</script>

<style scoped>
.song-img .info{
  color: #555;
}
</style>
