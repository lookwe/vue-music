<template>
  <!--播放音乐插件-->
  <div :class="['On_line_music',{'up':musicShowL === true,'down':musicShowL === false}]">
    <i class="el-icon-circle-close" @click="closeMusic"></i>
    <div class="jump_song" @click="handleSongInfo"></div>
    <div class="music_auto">
      <a-player
        ref="player"
        style="width: 100%;height: 100%;margin-top: -4.5px; position: relative;bottom: -5px"
        v-if="isLoad"
        :music="music"
        :list="musicList"
        :listFolded="true"
        :theme='"#E03229"'
        :controls="true"
        :muted="muted"
        :listMaxHeight="'150px'"
        :repeat="'repeat-all'"
        :preload="'auto'"
      >
      </a-player>
    </div>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name:'footerMusic',
  components:{
    'a-player':Aplayer
  },
  methods:{
    closeMusic(){
      this.$emit('close_music',false)
    },
    handleSongInfo(){
      let currentTime = this.$refs.player.audio.currentTime
      let song_id = ''
      if(this.musicList.length > 0){
        let title =this.$el.querySelector('.aplayer-music .aplayer-title').innerHTML
        song_id = this.musicList.find(item=>{
          return item.title == title
        })['songId'];
      }else {
        song_id = this.music.songId
      }
      this.$router.push({name:'playMany',params:{song_id:song_id,currentTime:currentTime+0.0099}})
      this.closeMusic()
    }
  },
  //js 中的状态被改变时候触发
  updated(){
    if (this.isLoad === true){
      if (this.$refs.player !== undefined){
         this.$refs.player.audio.play()
         this.$refs.player.audio.currentTime = this.currentTime
      }
    }
  },
  props:{
    music:{
      type:Object,
      default:function () {
        return {}
      }
    },
    isLoad:{
      type:Boolean,
      default:false
    },
    musicList:{
      type:Array,
      default:function () {
        return []
      }
    },
    musicShowL:{
      type:Boolean,
      default:false
    },
    muted:{
      type:Boolean,
      default:false
    },
    currentTime:{
      type:Number,
      default:0
    }
  }
}
</script>

<style scoped>
  /*当前播放音乐*/
  .On_line_music{
    position: fixed;
    right: 0;
    bottom: 0;
    height: auto;
    overflow: hidden;
    width:100%;
    z-index: 999;
    background: hsla(0,0%,97%,.91);
    box-shadow: 1px 0px 11px -2px #3C3F41;
    border-top: 1px solid #eee;
    box-sizing:border-box;
  }

  .down{
    bottom: -70px!important;
    transition-duration:.5s;
  }

  .up{
    bottom: 0!important;
    transition-duration:.3s;
  }

  .On_line_music>i{
    position:absolute;
    top: .5rem;
    right: .5rem;
    color: #ccc;
    font-size: 1.9rem;
    z-index: 999;
  }
  .On_line_music .jump_song {
    position: absolute;
    width: 70%;
    height: 3.4rem;
    top: 0;
    left:50%;
    margin-left: -11rem;
    z-index: 999;

  }
  .music_auto{
    width: 100%;
    height: 100%;
    margin-left: -.5rem;

  }
</style>
