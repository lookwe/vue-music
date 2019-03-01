<template>
  <div class="songLrc">
    {{getKeys}}
     <p v-for="(item,key,index) in lrc"
      :key="index"
      :class="{'active': key < currentTime && key > currentTime - (arrayKey[index+1] - arrayKey[index]) , 'none':arrayKey[index+3] < currentTime  }"
     >{{item}}</p>
  </div>
</template>

<script>
  export default {
  name:'LRC',
  data(){
      return {
         lrc:{},
         arrayKey:[]
      }
  },
  props:{
     currentTime:{
       type:Number,
       default:null
     },
     TotalTime:{
       type:Number,
       default:null
     },
     song_id:{
       type:String,
       default:''
     }

   },
  computed:{
     getKeys(){
       for(let key in this.lrc){
           this.arrayKey.push(key)
       }
     }
  },
  created(){
    let LRCUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.lry&songid="+this.song_id
    this.$axios.get(LRCUrl)
      .then(res => {
        if(res.data.error_code === 22001){
          this.lrc = {'0':'暂无歌词'}
          return false
        }
        let lyrics = res.data.lrcContent.split("\n");
        if(lyrics[6].indexOf('[0') === -1){
          this.lrc = {'0':'暂无歌词'}
          return false
        }
        let lrcObj = {};
        for(let i = 0 ;i<lyrics.length;i++){
          let lyric = decodeURIComponent(lyrics[i]);
          let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          let timeRegExpArr = lyric.match(timeReg);
          if(!timeRegExpArr)continue;
          let clause = lyric.replace(timeReg,'');
          for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            lrcObj[time] = clause;
          }
        }
        this.lrc = lrcObj
      }).catch(function (error) {
         console.log(error);
      })
  }
  }
</script>

<style scoped>
.songLrc {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  overflow: scroll;
  text-align: center;

}
.songLrc p{
  line-height: 2;
  margin: 0 .2rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14.5px;
  color: #595959;
}

.songLrc .none{
  display:none;
}
.songLrc .active{
  color: #E03229!important;
  font-size: 16.5px!important;
  display: inline!important;
}
</style>
