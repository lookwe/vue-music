<template>
  <div class="collection-block">
    <div class="block-padding">
      <!--title-->
      <div class="title" style="margin-bottom: 0;margin-top: 1.3rem" >
        <h3 >
          <router-link tag="a" :to="{name:'songs',params:{billboard_type:'2'}}"  class="">音乐榜单</router-link>
        </h3>
        <router-link tag="a" :to="{name:'songs',params:{billboard_type:'2'}}"  class="btn-more" >更多</router-link>
      </div>

      <!--top 切换-->
      <div class="songList" style="position:relative">
        <ul class="th-tabbar th-tabbar-theme-arrow split" >
          <li :class="{'th-tabbar-item':true,'select':titerLeft===0}" @click="titer(0,'Hot')"><div class="th-tabbar-item-text">热歌榜</div></li>
          <li :class="{'th-tabbar-item':true,'select':titerLeft===1}" @click="titer(1,'New')"><div  class="th-tabbar-item-text">新歌榜</div></li>
          <li :class="{'th-tabbar-item':true,'select':titerLeft===2}" @click="titer(2,'Classic')"><div  style="border-right: none" class="th-tabbar-item-text">经典老歌榜</div></li>
          <i
            :class="{'el-icon-caret-top':true,'titlerLeft-0':titerLeft===0,'titlerLeft-1':titerLeft===1,'titlerLeft-2':titerLeft===2}"
            style="font-size: 2.7rem;color: #E17A8A;position:absolute;top: 3rem;"></i>
        </ul>
        <div class="block-padding_list">
          <!--缓存-->
          <keep-alive>
            <router-view @get_music="getmusic"></router-view>
          </keep-alive>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
    export default {
        data(){
            return {
              titerLeft:0
            }
        },
        methods:{
          titer(val,url){
            this.titerLeft = val
            this.$router.push({name:url})
          },
          getmusic(obj){
            this.$emit('get_music',obj)
          },

        },
        watch:{
          $route(to,from){
            if(to === '/Hot'){
              this.titerLeft = 0
            }else if(to === '/New'){
              this.titerLeft = 1
            }else if(to === '/Classic'){
              this.titerLeft = 2
            }
          }
        },


    }
</script>

<style scoped>
  /*top 切换*/
  .th-tabbar{
    display: flex;
  }
  .titlerLeft-0{
    left: 13%;
    transition-duration: .4s;
  }
  .titlerLeft-1{
    left: 46.6%;
    transition-duration: .4s;
  }
  .titlerLeft-2{
    left: 80%;
    transition-duration: .4s;
  }

  .th-tabbar li.th-tabbar-item {
    padding: 1.7rem 0 1.2rem;
    font-size: 1.6rem;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 0%;
    flex: 1 1 0%;
    text-align: center;
    color: #999;
    position: relative;
    border-bottom: 1px solid #eee;
  }
  .th-tabbar .th-tabbar-item {
    position: relative;
    top: -.1rem;
    padding: .6rem 1rem;
  }

  .th-tabbar.split li .th-tabbar-item-text {
    width: 100%;
    height: 100%;
    border-right: 1px solid #eee;
  }
  .songList .block-padding_list{
     height: 346px;
     width:100%;

  }
  .select .th-tabbar-item-text{
    color: #E15C52;
  }

</style>
